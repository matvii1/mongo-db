import { Grid, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LinkCard } from "../components/LinkCard";
import { Loader } from "../components/Loader";
import { AuthContext } from "../context/authContext";
import { useHttp } from "../hooks/http.hook";

export const DetailPage = () => {
  const [link, setLink] = useState(null);
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);
  const { detailId } = useParams();

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/detail/${detailId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });

      console.log({ fetched });

      setLink(fetched);
    } catch (error) {}
  }, [token, request, detailId]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  console.log(link);

  if (loading) {
    return <Loader />;
  }

  return (
    <Grid container alignItems="center" maxWidth="70%" m="3rem auto">
      <Typography variant="h3" sx={{ alignSelf: "flex-start" }}>Link info</Typography>
      {!loading && link && <LinkCard link={link} />}
    </Grid>
  );
};
