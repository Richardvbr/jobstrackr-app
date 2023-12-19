import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import * as Routes from "@/routes";
import { Providers } from "@/providers";
import { AppLayout, AuthLayout } from "./components/layout";
import "@/styles/index.scss";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-up",
        element: <Routes.SignUp />,
      },
      {
        path: "/sign-in",
        element: <Routes.SignIn />,
      },
    ],
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Routes.Dashboard />,
      },
      {
        path: "/dashboard",
        element: <Routes.Dashboard />,
      },
      {
        path: "/applications",
        element: <Routes.Applications />,
      },
      {
        path: "/documents",
        element: <Routes.Documents />,
      },
      {
        path: "/tips",
        element: <Routes.Tips />,
      },
      {
        path: "/feedback",
        element: <Routes.Feedback />,
      },
      {
        path: "/account",
        element: <Routes.Account />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);
