import { Router } from "express";
import jwt from "jsonwebtoken";
import db from "../db/database.js";

const router = Router();

const JWT_SECRET = "SWEETERP_CORE_SECRET_KEY";


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
      users.company_id,
      companies.name AS company_name,
      roles.id AS role_id,
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

    WHERE role_permissions.role_id = ?

    ORDER BY permissions.code

  `).all(user.role_id);



  const token = jwt.sign(

    {
      id: user.id,
      username: user.username,
      company_id: user.company_id,
      role_id: user.role_id,
    },

    JWT_SECRET,

    {
      expiresIn: "8h",
    }

  );



  delete user.password_hash;



  res.json({

    token,

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