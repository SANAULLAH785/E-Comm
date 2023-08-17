import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


const roles = [
  {
    value: "seller",
    label: "Seller",
  },
  {
    value: "purchaser",
    label: "Purchaser",
  },
  {
    value: "admin",
    label: "Admin",
  },
];

const AdminAuth = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seller");
  const [name, setName] = useState("");
  // const [navigate, setNavigate] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        let signupEndpoint;

        if (role === "seller") {
          signupEndpoint = "http://localhost:4000/seller/signup";
        } else if (role === "purchaser") {
          signupEndpoint = "http://localhost:4000/purchaser/signup";
        } else if (role === "admin") {
          signupEndpoint = "http://localhost:4000/admin/signup";
        }

        const response = await axios.post(signupEndpoint, {
          email,
          password,
          name, // Include the name in the request payload
        });

        if (response.status === 201) {
            toast.success("Signup Successful");
            // Handle successful signup, e.g., show a success message or redirect
          } else if (response.status === 400) {
            toast.error(response.data.error);
            console.log('first',response.data.error);
            // Handle validation errors or other bad requests
          } else {
            toast.error("An error occurred. Please try again later.");
            // Handle other status codes
          }
      } else {
        let loginEndpoint;

        if (role === "seller") {
          loginEndpoint = "http://localhost:4000/seller/signin";
        } else if (role === "purchaser") {
          loginEndpoint = "http://localhost:4000/purchaser/signin";
        } else if (role === "admin") {
          loginEndpoint = "http://localhost:4000/admin/signin";
        }

        const response = await axios.post(loginEndpoint, {
          email,
          password,
        });

        if (response.status === 200) {
          toast.success("Login Successful");
          const token = response.data;
          localStorage.setItem("adminToken", token);
          console.log(token);
          if (token && role==="seller") {
            navigate("/seller/dashboard");
          }
          else if(token && role==="purchaser") {
            navigate("/");
        }
        } else{
          navigate('/');
        }
      }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            const errorMessage = error.response.data;
            // console.log('first', error.response.data);
            console.log(errorMessage);
            toast.error(errorMessage);
          } else if (error.response && error.response.status === 401) {
            const errorMessage = error.response.data;
            // Handle unauthorized access
            toast.error(errorMessage);
          } else {
            console.error("An error occurred:", error);
            toast.error("An error occurred. Please try again later.");
          }
    
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 3, mt: 10 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {isSignup ? "Sign Up" : "Log In"}
        </Typography>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          )}
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Select Role</FormLabel>
            <RadioGroup
              row
              aria-label="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((roleOption) => (
                <FormControlLabel
                  key={roleOption.value}
                  value={roleOption.value}
                  control={<Radio />}
                  label={roleOption.label}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" fullWidth>
              {isSignup ? "Sign Up" : "Log In"}
            </Button>
          </Box>
        </form>
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            <Button onClick={() => setIsSignup(!isSignup)}>
              {isSignup
                ? "Already have an account? Log In"
                : "Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminAuth;
