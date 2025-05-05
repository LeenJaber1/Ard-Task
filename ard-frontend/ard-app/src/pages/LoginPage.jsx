import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { lightPalette } from "../theme/palette/LightPalette";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const theme = lightPalette;

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateForm = () => {
    if (!email || !password) {
      setError("Username and password are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const url = `http://localhost:8080/auth/login?email=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(password)}`;
      await axios.post(url, null, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      });
      navigate("/dashboard", {
        state: { email: email },
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to login, check your credentials"
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
      minHeight: "100vh",
      padding: 2,
      backgroundColor: theme.background.default,
      color: theme.text.primary,
      position: "relative", 
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

    <Box
      sx={{
        width: 400,
        padding: 4,
        borderRadius: 3,
        backgroundColor: theme.background.paper,
        boxShadow: 4,
        position: "relative",
        zIndex: 2, 
      }}
    >
        <Typography variant="h5" textAlign="center" mb={2}>
          Login
        </Typography>

        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={handleEmailChange}
            margin="normal"
            variant="outlined"
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
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            margin="normal"
            variant="outlined"
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
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
          <Box mt={2}>
            <Typography variant="body2">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                style={{
                  color: "#216e62",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Sign Up
              </span>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default LoginPage;
