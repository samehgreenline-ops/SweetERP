import { Router } from "express";
import db from "../db/database.js";

const router = Router();


// Login
router.post("/login", (req, res) => {

  const {
    username,
    password,
  } = req.body;


  if (!username || !password) {

    return res.status(400).json({
      error: "Username and password are required",
    });

  }


  const user = db.prepare(`
    SELECT
      users.id,
      users.username,
      users.password_hash,
      users.full_name,
      users.email,
      users.active,
      companies.name AS company_name,
      roles.name AS role_name
    FROM users
    JOIN companies
      ON companies.id = users.company_id
    JOIN roles
      ON roles.id = users.role_id
    WHERE users.username = ?
  `).get(username);


  if (!user) {

    return res.status(401).json({
      error: "Invalid username or password",
    });

  }


  if (!user.active) {

    return res.status(403).json({
      error: "User is inactive",
    });

  }


  if (user.password_hash !== password) {

    return res.status(401).json({
      error: "Invalid username or password",
    });

  }


  const permissions = db.prepare(`
    SELECT
      permissions.code
    FROM permissions
    JOIN role_permissions
      ON role_permissions.permission_id = permissions.id
    JOIN users
      ON users.role_id = role_permissions.role_id
    WHERE users.id = ?
    ORDER BY permissions.code
  `).all(user.id);


  delete user.password_hash;


  res.json({

    user,

    permissions: permissions.map(
      (item) => item.code
    ),

  });

});


// Logout
router.post("/logout", (req, res) => {

  res.json({
    success: true,
  });

});


// Current User
router.get("/me", (req, res) => {

  res.status(501).json({
    message: "Not implemented yet",
  });

});


export { router as authRouter };