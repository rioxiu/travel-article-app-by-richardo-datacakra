import React, { FormEvent, Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/reducer/authLoginReducer";

type DashboardComponentProps = {
  children: React.ReactNode;
};

const DashboardComponent = ({ children }: DashboardComponentProps) => {
  useEffect(() => {});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e: FormEvent) => {
    e.preventDefault();
    dispatch(logout());
    Swal.fire({
      title: "Success",
      text: "You have successfully logged out",
      icon: "success",
      confirmButtonText: "Cool",
    }).then(() => {
      navigate("/signin");
    });
  };
  return (
    <Fragment>
      <div className="flex flex-col min-h-screen phone:text-xs">
        <nav className="p-8 phone:flex-1 flex justify-between bg-[#3282B8] w-auto rounded-md">
          <h1 className="text-white items-center flex">Travel Fellas</h1>
          <ul className="flex phone:text-xs justify-center items-center text-xl">
            <li className="mr-4">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="mr-4">
              <Link to="/categories">Category</Link>
            </li>
            <li className="mr-4">
              <Link to="/article">Article</Link>
            </li>
          </ul>
          <div className="flex flex-row space-x-4 items-center">
            <h2 className="text-center text-xl text-gray-700"></h2>
            <a
              className="cursor-pointer btn btn-error"
              href="/signin"
              onClick={handleLogout}
            >
              Logout
            </a>
          </div>
        </nav>
        <div className="flex-grow my-4 justify-center">{children}</div>
        <footer>
          <p className="text-center bg-[#0B192C] text-white p-4">
            &copy; 2024 Travel Fellas. All rights reserved.
          </p>
        </footer>
      </div>
    </Fragment>
  );
};

export default DashboardComponent;
