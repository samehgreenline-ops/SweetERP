import jwt from "jsonwebtoken";
import db from "../../db/database.js";

const JWT_SECRET = "SWEETERP_CORE_SECRET_KEY";


// Verify JWT Token

export function authenticate(req, res, next) {

  const authHeader = req.headers.authorization;


  if (!authHeader) {

    return res.status(401).json({
      error: "Authentication required",
    });

  }


  const token = authHeader.replace(
    "Bearer ",
    ""
  );


  try {

    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );


    const user = db.prepare(`

      SELECT

        users.id,
        users.username,
        users.company_id,
        users.role_id,
        roles.name AS role_name

      FROM users

      JOIN roles
        ON roles.id = users.role_id

      WHERE users.id = ?

    `).get(decoded.id);



    if (!user) {

      return res.status(401).json({
        error: "User not found",
      });

    }


    req.user = user;


    next();


  } catch (error) {


    return res.status(401).json({
      error: "Invalid token",
    });


  }

}





// Permission Check

export function requirePermission(permissionCode) {


  return (req, res, next) => {


    if (!req.user) {

      return res.status(401).json({
        error: "Authentication required",
      });

    }



    const permission = db.prepare(`

      SELECT permissions.code

      FROM permissions

      JOIN role_permissions

        ON role_permissions.permission_id = permissions.id

      WHERE role_permissions.role_id = ?

      AND permissions.code = ?

    `).get(

      req.user.role_id,

      permissionCode

    );



    if (!permission) {

      return res.status(403).json({

        error: "Permission denied",

        permission: permissionCode,

      });

    }



    next();


  };

}