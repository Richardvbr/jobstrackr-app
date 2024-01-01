import { createBrowserRouter } from "react-router-dom";

import { AppLayout, AuthLayout } from "@/components/layout";
import { DashboardRoute } from "./dashboard";
import { DocumentsRoute } from "./documents";
import { FeedbackRoute } from "./feedback";
import { QuestionsRoute } from "./questions";
import { SettingsRoute } from "./settings";
import { SignInRoute } from "./sign-in";
import { SignUpRoute } from "./sign-up";
// import { TipsRoute } from "./tips";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-up",
        element: <SignUpRoute />,
      },
      {
        path: "/sign-in",
        element: <SignInRoute />,
      },
    ],
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <DashboardRoute />,
      },
      {
        path: "/dashboard",
        element: <DashboardRoute />,
      },
      {
        path: "/questions",
        element: <QuestionsRoute />,
      },
      {
        path: "/documents",
        element: <DocumentsRoute />,
      },
      //   {
      //     path: "/tips",
      //     element: <TipsRoute />,
      //  },
      {
        path: "/settings",
        element: <SettingsRoute />,
      },
      {
        path: "/feedback",
        element: <FeedbackRoute />,
      },
    ],
  },
]);
