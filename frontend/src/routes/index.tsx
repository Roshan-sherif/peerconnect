import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import LandingPage from "../features/landing/LandingPage";
import DashboardPage from "../features/dashboard/DashboardPage";
import RoomPage from "../features/room/RoomPage";
import LoginPage from "../features/auth/LoginPage";
import SignupPage from "../features/auth/SignupPage";
import ForgotPasswordPage from "../features/auth/ForgotPasswordPage";
import ProfilePage from "../features/dashboard/ProfilePage";
import SettingsPage from "../features/dashboard/SettingsPage";
import AuthLayout from "../layouts/AuthLayout";

import DashboardLayout from "../layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
    ]
  },
  {
    path: "/room/:roomId",
    element: <RoomPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
