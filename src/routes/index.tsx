import {
  NotFoundRoute,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router';

import { AppLayout, AuthLayout } from '@/components/layout';
import { SignInRoute } from './sign-in';
import { SignUpRoute } from './sign-up';
import { DashboardRoute } from './dashboard';
import { DocumentsRoute } from './documents';
import { FeedbackRoute } from './feedback';
import { QuestionsRoute } from './questions';
import { SettingsRoute } from './settings';

const rootRoute = createRootRoute();

// Auth layout and routes
const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'auth-layout',
  component: () => <AuthLayout />,
});

const signInRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/sign-in',
  component: () => <SignInRoute />,
});

const signUpRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/sign-up',
  component: () => <SignUpRoute />,
});

// App layout and routes
const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app-layout',
  component: () => <AppLayout />,
});

const indexRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({
      to: dashboardRoute.to,
    });
  },
});

type DashboardSearch = {
  action?: string;
};

export const dashboardRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/dashboard',
  component: () => <DashboardRoute />,
  validateSearch: (search: Record<string, unknown>): DashboardSearch => {
    return {
      action: search.action as string,
    };
  },
});

const settingsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/settings',
  component: () => <SettingsRoute />,
});

const feedbackRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/feedback',
  component: () => <FeedbackRoute />,
});

const questionsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/questions',
  component: () => <QuestionsRoute />,
});

const documentsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/documents',
  component: () => <DocumentsRoute />,
});

const routeTree = rootRoute.addChildren([
  // @ts-ignore
  indexRoute,
  authRoute.addChildren([signInRoute, signUpRoute]),
  appRoute.addChildren([
    dashboardRoute,
    documentsRoute,
    questionsRoute,
    settingsRoute,
    feedbackRoute,
  ]),
]);

function NotFound() {
  return <h3>404 - Not Found</h3>;
}

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
  defaultNotFoundComponent: NotFound,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
