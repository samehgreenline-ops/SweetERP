import { Router } from "express";
import db from "../db/database.js";

const router = Router();


// Get all system settings

router.get("/", (req,res)=>{

  const settings = db.prepare(`
    SELECT *
    FROM system_settings
    ORDER BY id
  `).all();


  res.json(settings);

});




// Get single setting

router.get("/:key",(req,res)=>{


  const setting = db.prepare(`
    SELECT *
    FROM system_settings
    WHERE setting_key = ?
  `).get(
    req.params.key
  );


  if(!setting){

    return res.status(404).json({
      error:"Setting not found"
    });

  }


  res.json(setting);


});





// Update single setting

router.put("/:key",(req,res)=>{


  const {
    value
  } = req.body;



  db.prepare(`
    UPDATE system_settings
    SET value = ?
    WHERE setting_key = ?
  `).run(
    value,
    req.params.key
  );



  const setting = db.prepare(`
    SELECT *
    FROM system_settings
    WHERE setting_key = ?
  `).get(
    req.params.key
  );



  res.json(setting);


});






// Update multiple settings

router.put("/",(req,res)=>{


  const settings = req.body;


  const update = db.prepare(`

    UPDATE system_settings

    SET value = ?

    WHERE setting_key = ?

  `);



  const transaction = db.transaction(()=>{


    settings.forEach(item=>{


      update.run(

        item.value,

        item.setting_key

      );


    });


  });



  transaction();



  const result = db.prepare(`

    SELECT *

    FROM system_settings

    ORDER BY id

  `).all();



  res.json(result);


});



export { router as settingsRouter };