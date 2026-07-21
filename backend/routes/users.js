import { Router } from "express";
import db from "../db/database.js";

import {
  authenticate,
  requirePermission,
} from "../core/security/authMiddleware.js";


const router = Router();


// Get all users

router.get(
  "/",
  authenticate,
  requirePermission("users.manage"),
  (req, res) => {

    const users = db.prepare(`
      SELECT 
        users.id,
        users.username,
        users.full_name,
        users.email,
        users.active,
        users.created_at,
        companies.name AS company_name,
        roles.name AS role_name
      FROM users
      JOIN companies 
        ON companies.id = users.company_id
      JOIN roles 
        ON roles.id = users.role_id
      ORDER BY users.id DESC
    `).all();

    res.json(users);

  }
);



// Create user

router.post(
  "/",
  authenticate,
  requirePermission("users.manage"),
  (req, res) => {


    const {
      company_id,
      role_id,
      username,
      password_hash,
      full_name,
      email
    } = req.body;



    if (
      !company_id ||
      !role_id ||
      !username ||
      !password_hash ||
      !full_name
    ) {

      return res.status(400).json({
        error: "Missing required fields"
      });

    }



    const result = db.prepare(`
      INSERT INTO users
      (
        company_id,
        role_id,
        username,
        password_hash,
        full_name,
        email
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      company_id,
      role_id,
      username,
      password_hash,
      full_name,
      email || ""
    );



    const user = db.prepare(`
      SELECT *
      FROM users
      WHERE id = ?
    `).get(result.lastInsertRowid);



    res.json(user);


  }
);




// Get user permissions

router.get(
  "/:id/permissions",
  authenticate,
  requirePermission("users.manage"),
  (req, res) => {


    const permissions = db.prepare(`
      SELECT
        permissions.code,
        permissions.name,
        permissions.module
      FROM permissions
      JOIN role_permissions
        ON role_permissions.permission_id = permissions.id
      JOIN users
        ON users.role_id = role_permissions.role_id
      WHERE users.id = ?
    `).all(req.params.id);



    res.json(permissions);


  }
);



export { router as usersRouter };