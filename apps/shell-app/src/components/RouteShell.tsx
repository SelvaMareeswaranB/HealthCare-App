import { Suspense, type ReactNode } from "react";
import { AppErrorBoundary } from "./AppErrorBoundary";
import { PageLoader } from "./PageLoader";

type RouteShellProps = {
  children: ReactNode;
  loadingMessage?: string;
};

export function RouteShell({ children, loadingMessage }: RouteShellProps) {
  return (
    <AppErrorBoundary>
      <Suspense fallback={<PageLoader message={loadingMessage} />}>
        {children}
      </Suspense>
    </AppErrorBoundary>
  );
}
