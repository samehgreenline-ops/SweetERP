import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

import { useAuth } from "../../context/AuthContext.jsx";


function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();


  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");



  async function handleLogin(e) {

    e.preventDefault();


    setError("");


    try {

      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username,
            password,
          }),

        }
      );


      const data = await response.json();



      if (!response.ok) {

        throw new Error(
          data.error || "Login failed"
        );

      }


      login(data);


      navigate("/");


    } catch (err) {

      setError(
        err.message
      );

    }

  }



  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >

      <Paper
        sx={{
          width: 350,
          p: 4,
        }}
      >

        <Typography
          variant="h5"
          sx={{
            mb: 3,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          SweetERP Login
        </Typography>


        <form onSubmit={handleLogin}>

          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            sx={{
              mb: 2,
            }}
          />


          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            sx={{
              mb: 2,
            }}
          />


          {error && (

            <Typography
              color="error"
              sx={{
                mb: 2,
              }}
            >
              {error}
            </Typography>

          )}


          <Button
            fullWidth
            variant="contained"
            type="submit"
          >
            Login
          </Button>


        </form>


      </Paper>


    </Box>

  );

}


export default Login;