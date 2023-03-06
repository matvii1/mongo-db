import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import SignIn from "./pages/AuthPage/SignIn";
import SignUp from "./pages/AuthPage/SignUp";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DetailPage";
import { LinkPage } from "./pages/LinkPage";

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/links" element={<LinkPage />} />
          <Route path="/home" element={<Navigate to="/create" />} />
          <Route path="/" element={<Navigate to="/create" />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/detail/:detailId" element={<DetailPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    );
  }

  return (
    <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
