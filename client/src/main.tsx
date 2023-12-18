// Vendors
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Routes
import * as Routes from "@/routes";
import { Providers } from "@/providers";

const router = createBrowserRouter([
  {
    path: "/sign-up",
    element: <Routes.SignUpPage />,
  },
  {
    path: "/sign-in",
    element: <Routes.SignInPage />,
  },
  {
    path: "/",
    element: <Routes.PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <Routes.DashboardPage />,
      },
      {
        path: "/dashboard",
        element: <Routes.DashboardPage />,
      },
      {
        path: "/applications",
        element: <Routes.ApplicationsPage />,
      },
      {
        path: "/documents",
        element: <Routes.DocumentsPage />,
      },
      {
        path: "/tips",
        element: <Routes.TipsPage />,
      },
      {
        path: "/feedback",
        element: <Routes.FeedbackPage />,
      },
      {
        path: "/account",
        element: <Routes.AccountPage />,
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
