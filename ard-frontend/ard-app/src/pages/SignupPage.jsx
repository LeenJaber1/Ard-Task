import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { lightPalette } from "../theme/palette/LightPalette";

const SignUp = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = lightPalette;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (
      !formData.displayName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8080/user/signup",
        {
          name: formData.displayName,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setSuccess("Account created successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: 2,
        backgroundColor: theme.background.default,
        color: theme.text.primary,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "35%",
          backgroundColor: theme.background.paper,
          borderTopLeftRadius: "50% 20%",
          borderTopRightRadius: "50% 20%",
        }}
      />
      <Paper
        elevation={3}
        sx={{
          zIndex: 2,
          width: "400px",
          padding: "25px",
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "500", marginBottom: "20px" }}
        >
          Create Account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Display Name"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            sx={{
              input: {
                color: theme.text.primary,
                backgroundColor: theme.background.paper,
              },
              label: {
                color: theme.text.primary,
              },
            }}
          />


          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{
              input: {
                color: theme.text.primary,
                backgroundColor: theme.background.paper,
              },
              label: {
                color: theme.text.primary,
              },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={{
              ".MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            sx={{
              input: {
                color: theme.text.primary,
                backgroundColor: theme.background.paper,
              },
              label: {
                color: theme.text.primary,
              },
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: theme.button?.background || theme.primary.main,
              color: theme.button?.text || "#fff",
              "&:hover": {
                backgroundColor: theme.button?.hover || theme.primary.dark,
              },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign up"}
          </Button>

          <Box mt={2}>
            <Typography variant="body2">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                style={{
                  color: "#216e62",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Log In
              </span>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUp;
