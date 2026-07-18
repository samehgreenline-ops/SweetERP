import { Router } from "express";
import db from "../db/database.js";

const router = Router();


// Get roles
router.get("/", (req, res) => {

  const roles = db.prepare(`
    SELECT
      roles.id,
      roles.name,
      roles.description,
      roles.active,
      companies.name AS company_name
    FROM roles
    JOIN companies
      ON companies.id = roles.company_id
    ORDER BY roles.id
  `).all();

  res.json(roles);

});



// Create role
router.post("/", (req, res) => {

  const {
    company_id,
    name,
    description
  } = req.body;


  if (!company_id || !name) {

    return res.status(400).json({
      error: "Missing required fields"
    });

  }


  const result = db.prepare(`
    INSERT INTO roles
    (
      company_id,
      name,
      description
    )
    VALUES (?, ?, ?)
  `).run(
    company_id,
    name,
    description || ""
  );


  res.json({
    id: result.lastInsertRowid,
    company_id,
    name,
    description: description || ""
  });

});




// Get role permissions
router.get("/:id/permissions", (req, res) => {

  const permissions = db.prepare(`
    SELECT
      permissions.id,
      permissions.code,
      permissions.name,
      permissions.module
    FROM permissions
    JOIN role_permissions
      ON role_permissions.permission_id = permissions.id
    WHERE role_permissions.role_id = ?
    ORDER BY permissions.id
  `).all(req.params.id);


  res.json(permissions);

});




// Save role permissions
router.post("/:id/permissions", (req, res) => {

  const roleId = req.params.id;

  const {
    permissions
  } = req.body;


  if (!Array.isArray(permissions)) {

    return res.status(400).json({
      error: "Permissions must be an array"
    });

  }


  const remove = db.prepare(`
    DELETE FROM role_permissions
    WHERE role_id = ?
  `);


  const insert = db.prepare(`
    INSERT INTO role_permissions
    (
      role_id,
      permission_id
    )
    VALUES (?, ?)
  `);


  const transaction = db.transaction(() => {

    remove.run(roleId);


    for (const permissionId of permissions) {

      insert.run(
        roleId,
        permissionId
      );

    }

  });


  transaction();


  res.json({
    success: true
  });

});




// Give Owner all permissions automatically
const owners = db.prepare(`
  SELECT id
  FROM roles
  WHERE name = 'Owner'
`).all();


const allPermissions = db.prepare(`
  SELECT id
  FROM permissions
`).all();


const checkPermission = db.prepare(`
  SELECT id
  FROM role_permissions
  WHERE role_id = ?
  AND permission_id = ?
`);


const addPermission = db.prepare(`
  INSERT INTO role_permissions
  (
    role_id,
    permission_id
  )
  VALUES (?, ?)
`);


for (const owner of owners) {

  for (const permission of allPermissions) {

    const exists = checkPermission.get(
      owner.id,
      permission.id
    );


    if (!exists) {

      addPermission.run(
        owner.id,
        permission.id
      );

    }

  }

}


export { router as rolesRouter };