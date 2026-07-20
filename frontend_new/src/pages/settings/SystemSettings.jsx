import { useEffect, useState } from "react";

import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  MenuItem,
} from "@mui/material";


function SystemSettings() {


  const [settings, setSettings] = useState([]);


  useEffect(() => {

    loadSettings();

  }, []);



  function loadSettings() {

    fetch("/api/settings")

      .then((res) => res.json())

      .then((data) => {

        setSettings(data);

      });

  }




  function handleChange(key, value) {

    setSettings(

      settings.map((item)=>{

        if(item.setting_key === key){

          return {

            ...item,

            value,

          };

        }


        return item;

      })

    );

  }




  function saveSetting(item) {


    fetch(`/api/settings/${item.setting_key}`, {

      method:"PUT",

      headers:{

        "Content-Type":"application/json",

      },

      body:JSON.stringify({

        value:item.value,

      }),

    })

    .then((res)=>res.json())

    .then(()=>{

      alert("تم حفظ الإعداد");

    });


  }




  function renderField(item){


    if(item.setting_key === "default_currency") {


      return (

        <TextField

          select

          label={item.description}

          value={item.value}

          onChange={(e)=>
            handleChange(
              item.setting_key,
              e.target.value
            )
          }

        >

          <MenuItem value="EGP">
            EGP
          </MenuItem>


          <MenuItem value="SAR">
            SAR
          </MenuItem>


          <MenuItem value="USD">
            USD
          </MenuItem>


        </TextField>

      );

    }



    return (

      <TextField

        label={item.description}

        value={item.value || ""}

        onChange={(e)=>
          handleChange(
            item.setting_key,
            e.target.value
          )
        }

      />

    );


  }





  return (

    <Paper sx={{p:4}}>


      <Typography

        variant="h5"

        sx={{mb:3}}

      >

        إعدادات النظام

      </Typography>



      <Divider sx={{mb:3}} />



      <Box

        sx={{

          display:"grid",

          gap:2,

          maxWidth:600,

        }}

      >


        {

          settings.map((item)=>(


            <Box key={item.id}>


              {renderField(item)}


              <Button

                sx={{mt:1}}

                variant="contained"

                onClick={()=>
                  saveSetting(item)
                }

              >

                حفظ

              </Button>


            </Box>


          ))

        }


      </Box>


    </Paper>

  );

}



export default SystemSettings;