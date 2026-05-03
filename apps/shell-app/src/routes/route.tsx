import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { RouteShell } from "../components/RouteShell";
import AuthLayout from "../layout/AuthLayout";
import { PublicRoute } from "./PublicRoute";
import MainLayout from "../layout/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { retryDynamicImport } from "../utils/retryDynamicImport";

const RemoteLogin = React.lazy(() =>
  retryDynamicImport(() => import("authRemote/login"))
);
const RemotePatientModule = React.lazy(() =>
  retryDynamicImport(() => import("patientRemote/patientModule"))
);
const RemoteDashboard = React.lazy(() =>
  retryDynamicImport(() => import("dashboardRemote/dashboardModule"))
);

const RemoteAnalytics = React.lazy(() =>
  retryDynamicImport(() => import("analyticsRemote/analyticsModule"))
);




export const router = createBrowserRouter([
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="login" replace />
            },
            {
                path: "login",
                element: (
                    <RouteShell key="auth-login" loadingMessage="Loading sign in…">
                        <PublicRoute>
                            <RemoteLogin />
                        </PublicRoute>
                    </RouteShell>
                )
            },
            {
                path: "signup",
                element: <p>Signup Page</p>
            }
        ]
    }, {
        path: "/",
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="home" replace />
            },
            {
                path: "analytics",
                element: (
                    <RouteShell key="route-analytics" loadingMessage="Loading analytics…">
                        <RemoteAnalytics />
                    </RouteShell>
                )
            },
            {
                path: "home",
                element: (
                    <RouteShell key="route-home" loadingMessage="Loading dashboard…">
                        <RemoteDashboard />
                    </RouteShell>
                )
            },
            {
                path: "patient-record",
                element: (
                    <RouteShell key="route-patient-record" loadingMessage="Loading patient records…">
                        <RemotePatientModule />
                    </RouteShell>
                )
            }
        ]
    }
])