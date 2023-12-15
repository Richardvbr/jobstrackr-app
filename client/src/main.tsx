// Vendors
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Routes
import * as Routes from "@/routes";
import { Providers } from "@/providers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Routes.DashboardPage />,
  },
  {
    path: "/sign-up",
    element: <Routes.SignUpPage />,
  },
  {
    path: "/sin-in",
    element: <Routes.SignInPage />,
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
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);
