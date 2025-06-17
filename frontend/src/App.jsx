import AppLayout from "./layouts/AppLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./components/diary/Diary";
import ProductForm from "./components/diary/ProductForm";
import PrivateRoute from "./components/private/PrivateRoute";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setAuthToken } from "./utils/axiosConfig";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import { lazy, Suspense } from "react";

function App() {
  // const Register = lazy(() => import("./pages/Register"));
  // const Login = lazy(() => import("./pages/Login"));
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* private */}
          <Route
            path="/diary"
            element={
              <PrivateRoute>
                <Diary />
              </PrivateRoute>
            }
          />
          <Route
            path="/diary/add"
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
