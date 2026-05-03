import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { RouteShell } from "../components/RouteShell";
import AuthLayout from "../layout/AuthLayout";
import { PublicRoute } from "./PublicRoute";
import MainLayout from "../layout/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";

const RemoteLogin = React.lazy(() => import("authRemote/login"));
const RemotePatientModule = React.lazy(
    () => import("patientRemote/patientModule")
);
const RemoteDashboard = React.lazy(() =>
    import("dashboardRemote/dashboardModule")
);

const RemoteAnalytics = React.lazy(() =>
    import("analyticsRemote/analyticsModule")
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
                    <RouteShell loadingMessage="Loading sign in…">
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
                    <RouteShell loadingMessage="Loading analytics…">
                        <RemoteAnalytics />
                    </RouteShell>
                )
            },
            {
                path: "home",
                element: (
                    <RouteShell loadingMessage="Loading dashboard…">
                        <RemoteDashboard />
                    </RouteShell>
                )
            },
            {
                path: "patient-record",
                element: (
                    <RouteShell loadingMessage="Loading patient records…">
                        <RemotePatientModule />
                    </RouteShell>
                )
            }
        ]
    }
])