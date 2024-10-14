// ProtectedRoute.tsx
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Cookies from "js-cookie";
import { setUser } from "../redux/reducer/authLoginReducer";
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  console.log({ isLoading, isLogin });

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return isLogin ? <>{element}</> : <Navigate to="/signin" replace />;
  }
};

export default ProtectedRoute;
