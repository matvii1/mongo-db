import { useEffect, useState } from "react";
import { Loader } from "./components/Loader";
import { AuthContext } from "./context/authContext";
import { useAuth } from "./hooks/auth.hook";
import { useRoutes } from "./routes";

export function App() {
  const { login, logout, userId, token, ready } = useAuth();

  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />
  }

  return (
    <>
      <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
        {routes}
      </AuthContext.Provider>
    </>
  );
}
