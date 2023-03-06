import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, Snackbar, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContainer } from "../../common/AuthContainer";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/http.hook";

export default function SignIn() {
  const auth = useContext(AuthContext);

  const { loading, request, error, clearError } = useHttp();
  const [open, setOpen] = useState(false);

  const handleSignIn = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      const formValues = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const data = await request("/api/auth/login", "POST", formValues, {
        "Content-Type": "application/json",
      });

      auth.login(data.token, data.userId);

      setOpen(false);
      setMessage(data.message);
      setIsCreated({ state: true, message: data.message });
    } catch (error) {}
  };

  useEffect(() => {
    function close() {
      setOpen(false);
      clearError();
    }

    if (error) {
      setOpen(true);

      setTimeout(close, 4000);
    }

    () => {
      clearTimeout(close);
    };
  }, [error, loading]);

  const handleClose = () => {
    setOpen(false);
    clearError();
  };

  return (
    <AuthContainer component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography>Sign in</Typography>
        <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            type="email"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/signup">Sign Up</NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Snackbar
        open={open}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </AuthContainer>
  );
}
