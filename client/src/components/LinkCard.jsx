import styled from "@emotion/styled";
import { Grid, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";

export const LinkCard = ({ link }) => {
  const StyledCard = styled(Grid)(() => ({
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  }))

  const StyledLink = styled(Link)(() => ({

  }))

  return (
    <Box sx={{ display: "flex", margin: "3rem auto 0 0" }}>
      <Grid container sx={{ flexDirection: "column", gap: "1.2rem" }}>
        <StyledCard item>
          <Typography>Your link:</Typography>
          <StyledLink target="_blank" href={link.to} rel="noopener noreferrer">{link.to}</StyledLink>
        </StyledCard>
        <StyledCard item>
          <Typography>Link from:</Typography>
          <StyledLink target="_blank" href={link.from}  rel="">{link.from}</StyledLink>
        </StyledCard>
        <StyledCard item>
          <Typography>Visits:</Typography>
          <StyledLink target="_blank" rel="noopener noreferrer">{link.clicks || 0}</StyledLink>
        </StyledCard>
        <StyledCard item>
          <Typography>Date:</Typography>
          <StyledLink target="_blank" rel="noopener noreferrer">{new Date(link.date).toLocaleDateString()}</StyledLink>
        </StyledCard>
      </Grid>
    </Box>
  );
};
