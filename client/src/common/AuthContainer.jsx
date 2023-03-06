import { Grid } from "@mui/material";

export const AuthContainer = ({ children }) => {
  return (
    <Grid
      container
      style={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}>
      {children}
    </Grid>
  );
};
