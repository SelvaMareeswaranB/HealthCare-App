import React, { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
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
                    <Suspense fallback={<div>Loading Remote Login...</div>}>
                        <PublicRoute><RemoteLogin />
                        </PublicRoute>


                    </Suspense>

                ),

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
                    <Suspense fallback={<div>Loading Analytics...</div>}>
                        <RemoteAnalytics />
                    </Suspense>
                )
            },
            {
                path: "home",
                element: (
                    <Suspense fallback={<div>Loading Dashboard...</div>}>
                        <RemoteDashboard />
                    </Suspense>
                )
            },
            {
                path: "patient-record",
                element: (
                    <Suspense fallback={<div>Loading Patient Module...</div>}>
                        <RemotePatientModule />
                    </Suspense>
                )
            }
        ]
    }
])