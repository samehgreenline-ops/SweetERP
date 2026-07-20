import { useEffect, useState } from "react";

import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Divider,
  Grid,
  Alert,
} from "@mui/material";


function CompanySettings() {


  const [company, setCompany] = useState(null);
  const [message, setMessage] = useState("");

  const companyId = 1;



  useEffect(() => {

    fetch(`/api/companies/${companyId}`)
      .then((res) => res.json())
      .then((data) => {

        setCompany(data);

      })
      .catch(() => {

        setMessage("حدث خطأ أثناء تحميل بيانات الشركة");

      });


  }, []);




  function handleChange(e) {

    setCompany({

      ...company,

      [e.target.name]: e.target.value,

    });

  }




  function saveCompany() {


    fetch(`/api/companies/${companyId}`, {

      method: "PUT",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify(company),

    })

    .then((res) => res.json())

    .then((data)=>{

      setCompany(data);

      setMessage("تم حفظ إعدادات الشركة بنجاح");

    });


  }




  if (!company) {

    return (

      <Typography>

        جاري تحميل إعدادات الشركة...

      </Typography>

    );

  }




  return (

    <Paper sx={{p:4}}>


      <Typography variant="h5" sx={{mb:2}}>

        إعدادات الشركة

      </Typography>


      <Divider sx={{mb:3}} />



      {message && (

        <Alert sx={{mb:3}} severity="success">

          {message}

        </Alert>

      )}



      <Grid container spacing={2}>


        <Grid item xs={12} md={6}>

          <TextField

            fullWidth

            label="اسم الشركة"

            name="name"

            value={company.name || ""}

            onChange={handleChange}

          />

        </Grid>



        <Grid item xs={12} md={6}>

          <TextField

            fullWidth

            label="نوع النشاط"

            name="business_type"

            value={company.business_type || ""}

            onChange={handleChange}

          />

        </Grid>




        <Grid item xs={12} md={6}>

          <TextField

            fullWidth

            select

            label="العملة"

            name="currency"

            value={company.currency || "EGP"}

            onChange={handleChange}

          >

            <MenuItem value="EGP">
              جنيه مصري
            </MenuItem>

            <MenuItem value="SAR">
              ريال سعودي
            </MenuItem>

            <MenuItem value="USD">
              دولار
            </MenuItem>

          </TextField>

        </Grid>



        <Grid item xs={12} md={6}>

          <TextField

            fullWidth

            label="الهاتف"

            name="phone"

            value={company.phone || ""}

            onChange={handleChange}

          />

        </Grid>




        <Grid item xs={12}>

          <TextField

            fullWidth

            label="العنوان"

            name="address"

            value={company.address || ""}

            onChange={handleChange}

          />

        </Grid>




        <Grid item xs={12} md={6}>

          <TextField

            fullWidth

            label="رابط الشعار"

            name="logo"

            value={company.logo || ""}

            onChange={handleChange}

          />

        </Grid>




        <Grid item xs={12} md={6}>

          <TextField

            fullWidth

            label="الخلفية"

            name="background"

            value={company.background || ""}

            onChange={handleChange}

          />

        </Grid>




        <Grid item xs={12} md={6}>

          <TextField

            fullWidth

            label="النمط"

            name="theme"

            value={company.theme || "default"}

            onChange={handleChange}

          />

        </Grid>



      </Grid>




      <Button

        sx={{mt:4}}

        variant="contained"

        onClick={saveCompany}

      >

        حفظ إعدادات الشركة

      </Button>



    </Paper>

  );

}



export default CompanySettings;