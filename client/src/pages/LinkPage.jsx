import { useCallback, useContext, useEffect, useState } from "react";
import { LinksList } from "../components/LinksList";
import { Loader } from "../components/Loader";
import { AuthContext } from "../context/authContext";
import { useHttp } from "../hooks/http.hook";

export const LinkPage = () => {
  const [links, setLinks] = useState();
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link/detail', "GET", null, {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      })

      setLinks(fetched);
    } catch (error) {
      
    }
  }, []);
   
  useEffect(() => {
    fetchLinks();
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && !!links && <LinksList links={links} />}
    </>
  );
};
