import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, Snackbar } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContainer } from "../../common/AuthContainer";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/http.hook";

export default function SignUp() {
  const auth = useContext(AuthContext);
  
  const { loading, request, error, clearError } = useHttp();
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [isCreated, setIsCreated] = useState({
    state: null,
    message: "",
  });

  const handleSignUp = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      const formValues = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const data = await request("/api/auth/register", "POST", formValues, {
        "Content-Type": "application/json",
      });

      setOpen(false);
      setMessage(data.message);
      setIsCreated({ state: true, message: data.message });
    } catch (error) {}
  };

  const handleClose = () => {
    setOpen(false);
    clearError();
  };

  useEffect(() => {
    function close() {
      setOpen(false);
      clearError();
    }

    if (error) {
      setMessage(error);
      setOpen(true);

      setTimeout(close, 4000);
    }

    () => {
      clearTimeout(close);
    };
  }, [error, loading]);


  useEffect(() => {
    function close() {
      setIsCreated({ state: false, message: ''});
    }

    if (isCreated.state) {
      setTimeout(close, 4000);
    }

    () => {
      clearTimeout(close);
    };
  }, [error, isCreated.message]);

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
        <Typography>Sign up</Typography>
        <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
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
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}>
            Sign up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/login">Login</NavLink>
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
          {message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={isCreated.state}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {isCreated.message}
        </Alert>
      </Snackbar>
    </AuthContainer>
  );
}
