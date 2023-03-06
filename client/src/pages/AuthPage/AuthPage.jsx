import { createTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

export const AuthPage = () => {
  return (
    <Outlet />
  );
};

const theme = createTheme();
