import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  TextField
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import { useHttp } from "../hooks/http.hook";


export const CreatePage = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { token } = useContext(AuthContext)
  const { request } = useHttp();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (query.length > 0) {
      try {
        const data = await request(
          "/api/link/generate",
          "POST", 
          { from: query },
          {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        );

        navigate(`/detail/${data.link._id}`)
      } catch (error) {
        console.error("err");
      } finally {
        setQuery("");
      }
    }
  };

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "90vh",
      }}>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl
          sx={{ gap: "20px", display: "flex", flexDirection: "row" }}>
          <InputLabel htmlFor="link"></InputLabel>
          <TextField
            id="link"
            autoComplete="off"
            label="Put your link here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ width: "400px" }}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Get url
          </Button>
        </FormControl>
      </Box>
    </Grid>
  );
};
