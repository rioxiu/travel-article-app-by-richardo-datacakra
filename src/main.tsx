import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import "./index.css";
import { router } from "./routes/index.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store/index.ts";
import AuthProvider from "./middleware/auth.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
