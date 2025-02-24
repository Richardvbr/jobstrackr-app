import { createBrowserRouter, redirect } from 'react-router-dom';

import { AppLayout, AuthLayout } from '@/components/shared/layout';
import { SignInRoute } from './sign-in';
import { SignUpRoute } from './sign-up';
import { DashboardRoute } from './dashboard';
import { DocumentsRoute } from './documents';
import { CompareRoute } from './compare';
import { FeedbackRoute } from './feedback';
import { QuestionsRoute } from './questions';
import { SettingsRoute } from './settings';

export const router = createBrowserRouter([
  {
    path: '/',
    loader: () => {
      return redirect('/dashboard');
    },
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignInRoute />,
      },
      {
        path: '/sign-up',
        element: <SignUpRoute />,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardRoute />,
      },
      {
        path: '/documents',
        element: <DocumentsRoute />,
      },
      {
        path: '/compare',
        element: <CompareRoute />,
      },
      {
        path: '/questions',
        element: <QuestionsRoute />,
      },
      {
        path: 'questions/:applicationId',
        element: <QuestionsRoute />,
      },
      {
        path: '/settings',
        element: <SettingsRoute />,
      },
      {
        path: '/feedback',
        element: <FeedbackRoute />,
      },
    ],
  },
]);
