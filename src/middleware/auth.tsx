// ProtectedRoute.tsx
import React, { Fragment, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import Cookies from "js-cookie";
import { getUserAction, setUser } from "../redux/reducer/authLoginReducer";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();

  //   const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  return <Fragment>{children}</Fragment>;
};

export default AuthProvider;
