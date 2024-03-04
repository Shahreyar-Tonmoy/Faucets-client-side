/* eslint-disable react/no-unescaped-entities */
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

import InstagramIcon from "@mui/icons-material/Instagram";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
// TODO remove, this demo shouldn't need to reset the theme.

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
const Navigate = useNavigate()
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = new FormData(event.currentTarget);

      // Hash the password using bcryptjs directly on the client side

      const response = await axios.post("https://job-task-server-side-gules.vercel.app/auth/signup", {
        useremail: data.get("email"),
        username: data.get("username"),

        password: data.get("password"),
      });

      if(response.data){
        Navigate('/login')
      }

    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#EEF2FE" }}>
      <Container
        sx={{ padding: "50px", py: "75px", width: "550px" }}
        component="main"
        maxWidth="md"
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 30px",
            borderRadius: "6px",
            backgroundColor: "white",
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", fontSize: "30px" }}
            component="h1"
            variant="h5"
          >
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >

<TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Your Name"
              name="username"
              autoComplete="email"
              variant="standard"
            />


            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              variant="standard"
            />


            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#9B1FE9",
                color: "white",
                ":hover": {
                  backgroundColor: "#9B1FE9",
                },
              }}
            >
              Sign Up
            </Button>

            <Link
              to={"/login"}
              variant="body2"
              style={{ textDecoration: "none" }}
            >
              <p
                style={{ fontSize: "13px" }}
                className="text-center fw-semibold  text-black"
              >
                Already have an account?{" "}
                <span style={{ color: "#9B1FED" }}>Login</span>
              </p>
            </Link>

            <p className="text-center ">or</p>

            <div className="d-flex gap-3 mb-2 justify-content-center">
              <GoogleIcon style={{ cursor: "pointer" }}></GoogleIcon>
              <FacebookIcon style={{ cursor: "pointer" }}></FacebookIcon>
              <InstagramIcon style={{ cursor: "pointer" }}></InstagramIcon>
            </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
