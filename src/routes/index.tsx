import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "../App";
import Page404 from "../components/404";
import Register from "../pages/register";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import AddArticlePage from "../pages/article/create-article";
import ArticlePages from "../pages/article";
import DetailArticlePages from "../pages/article/[id]";
import SuperAdmin from "../pages/category";
import ProtectedRoute from "../middleware/Protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/signin" />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/dashboard",
    // element: <Dashboard />,
    element: <Dashboard />,
  },

  {
    path: "/article",
    element: <ProtectedRoute element={<ArticlePages />} />,
    children: [],
  },
  {
    path: "/article/:id",
    element: <DetailArticlePages />,
  },
  {
    path: "create-article",
    element: <AddArticlePage />,
  },

  {
    path: "/categories",
    element: <SuperAdmin />,
  },
]);
