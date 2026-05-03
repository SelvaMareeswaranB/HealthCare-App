# 🏥 HealthCare-App

A healthcare management platform built using a **Micro Frontend Architecture** with multiple independent applications and shared packages.

---

# 🔐 Login Credentials

Use the following demo credentials to access the application:

- **Email:** satanselva@gmail.com  
- **Password:** SelvaSelva

---

# 📂 Project Structure

```bash
RAGAI_TASKS/
│
├── apps/                           # Independent Micro Frontend Apps
│   │
│   ├── analytics-app/              # Analytics & reports module
│   ├── auth-app/                   # Authentication & login module
│   ├── dashboard-app/              # Main dashboard module
│   ├── patient-app/                # Patient management module
│   └── shell-app/                  # Main container app (host application)
│
├── packages/                       # Shared reusable packages
│   │
│   ├── auth/                       # Shared authentication utilities
│   ├── mock-data/                  # Dummy/mock API data
│   ├── store/                      # Global state management
│   ├── theme/                      # Shared theme & styling
│   ├── ui/                         # Reusable UI components
│   └── utils/                      # Common helper functions
│
├── package.json                    # Root dependencies
├── pnpm-workspace.yaml             # PNPM workspace configuration
├── turbo.json                      # TurboRepo configuration
└── README.md
```

---

# 🏗️ Architecture Explanation

The project follows a **Micro Frontend Architecture**.

## apps/

Each folder inside `apps/` works as an independent frontend application.

### `shell-app`
- Main host application
- Loads all other micro frontend apps
- Handles routing and navigation

### `auth-app`
- Handles login and authentication
- User session management
- Protected routes

### `patient-app`
- Manages patient details
- Displays patient records and status

### `dashboard-app`
- Main dashboard UI
- Overview cards and monitoring system

### `analytics-app`
- Displays charts, reports, and healthcare analytics

---

# 📦 Shared Packages

The `packages/` folder contains reusable shared modules.

### `ui`
Reusable components like:
- Buttons
- Input
- 
### `theme`
Shared design system and styling configuration.

### `store`
Global state management shared across applications.

### `auth`
Common authentication logic and utilities.

### `utils`
Helper functions used across apps.

### `mock-data`
Contains dummy data for testing and development.

---

# 🔔 Notification Feature

The application includes a real-time notification system for patient monitoring.

## Notification Flow

```text
Stable → Moderate → Serious → Critical
```

If the patient status changes to **Critical**:

- Emergency notification is triggered instantly
- Doctors and admins receive alerts
- Notification appears inside the application
- Push notifications or toast alerts can be displayed
- Helps doctors respond quickly to emergency situations

---

# 🚨 Critical Patient Alert Flow

```text
Patient Status Updated
        ↓
System Detects "Critical"
        ↓
Notification Service Triggered
        ↓
Doctors/Admins Receive Alert
        ↓
Emergency Action Initiated
```

# 🌐 Application URLs

## Main Shell Application

- Shell App: https://health-care-app-shell-app.vercel.app/

---

# 🔗 Remote Micro Frontend URLs

```env
VITE_AUTH_REMOTE_URL=https://health-care-app-auth-app.vercel.app/assets/remoteEntry.js

VITE_PATIENT_REMOTE_URL=https://health-care-app-patient-app.vercel.app/assets/remoteEntry.js

VITE_DASHBOARD_REMOTE_URL=https://health-care-app-dashboard-app.vercel.app/assets/remoteEntry.js

VITE_ANALYTICS_REMOTE_URL=https://health-care-app-analytics-app.vercel.app/assets/remoteEntry.js
```

---

# 🏥 Individual Application URLs

## Auth App
https://health-care-app-auth-app.vercel.app/

## Patient App
https://health-care-app-patient-app.vercel.app/

## Dashboard App
https://health-care-app-dashboard-app.vercel.app/

## Analytics App
https://health-care-app-analytics-app.vercel.app/

---

# 🧩 Micro Frontend Integration

The project uses **Module Federation** with a **Shell App** architecture.

- `shell-app` acts as the host application.
- Other apps are loaded dynamically as remote micro frontends.
- Each app is independently deployed on Vercel.
- Remote applications are connected using `remoteEntry.js`.

This architecture enables:
- Independent deployments
- Scalable frontend development
- Shared UI/components
- Faster team collaboration
- Better maintainability

---

# ⚡ Technologies Used

- React.js
- Vite
- Module Federation
- TurboRepo
- PNPM Workspace
- Material UI / Tailwind CSS
- Firebase Notifications
- React Query
- Zustand / Redux

- 

---
