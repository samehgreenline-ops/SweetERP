import express from "express";

import manifestLoader from "../core/modules/ManifestLoader.js";
import manifestRegistry from "../core/modules/ManifestRegistry.js";


const router = express.Router();


// Load installed module manifests once

if (
  manifestRegistry.getAll().length === 0
) {

  manifestLoader.loadAll();

}



// Get ERP Core modules information

router.get("/modules", (req, res) => {


  res.json({

    modules:
      manifestRegistry.getAll(),


    menus:
      manifestRegistry.getMenus(),


    permissions:
      manifestRegistry.getPermissions()

  });


});


export default router;