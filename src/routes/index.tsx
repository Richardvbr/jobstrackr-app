import {
  NotFoundRoute,
  RootRoute,
  Route,
  Router,
  redirect,
} from "@tanstack/react-router";

import { AppLayout, AuthLayout } from "@/components/layout";
import { SignInRoute } from "./sign-in";
import { SignUpRoute } from "./sign-up";
import { DashboardRoute } from "./dashboard";
import { DocumentsRoute } from "./documents";
import { FeedbackRoute } from "./feedback";
import { QuestionsRoute } from "./questions";
import { SettingsRoute } from "./settings";

const rootRoute = new RootRoute();

const authRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "auth-layout",
  component: () => <AuthLayout />,
});

const signInRoute = new Route({
  getParentRoute: () => authRoute,
  path: "/sign-in",
  component: () => <SignInRoute />,
});

const signUpRoute = new Route({
  getParentRoute: () => authRoute,
  path: "/sign-up",
  component: () => <SignUpRoute />,
});

 const appRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "app-layout",
  component: () => <AppLayout />,
});

const indexRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({
      to: dashboardRoute.to,
      
    })
  }
});

 const dashboardRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/dashboard",
  component: () => <DashboardRoute />,
});

 const settingsRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/settings",
  component: () => <SettingsRoute />,
});

 const feedbackRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/feedback",
  component: () => <FeedbackRoute />,
});

 const questionsRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/questions",
  component: () => <QuestionsRoute />,
});

 const documentsRoute = new Route({
  getParentRoute: () => appRoute,
  path: "/documents",
  component: () => <DocumentsRoute />,
});


const routeTree = rootRoute.addChildren([
  // @ts-expect-error
  indexRoute,
  authRoute.addChildren([signInRoute, signUpRoute]),
  appRoute.addChildren([dashboardRoute, documentsRoute, questionsRoute, settingsRoute, feedbackRoute]),
]);

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFound,
});

function NotFound() {
  return (
    <div className='p-2'>
      <h3>404 - Not Found</h3>
    </div>
  );
}

export const router = new Router({
  routeTree,
  notFoundRoute,
  defaultPreload: "intent",
  defaultStaleTime: 5000,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

