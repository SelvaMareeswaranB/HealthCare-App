import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("[AppErrorBoundary]", error, info.componentStack);
  }

  handleReset = (): void => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div className="flex w-full flex-col items-center justify-center gap-4 px-4 py-16 text-center">
          <h1 className="text-lg font-semibold text-[var(--color-app-text)]">
            Something went wrong
          </h1>
          <p className="max-w-md text-sm text-[var(--color-app-text-muted)]">
            {this.state.error.message || "An unexpected error occurred."}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={this.handleReset}
              className="rounded-lg border border-[var(--color-app-border)] bg-[var(--color-app-surface-2)] px-4 py-2 text-sm font-medium text-[var(--color-app-text)] transition hover:bg-[var(--color-app-surface)]"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-lg bg-[var(--color-app-primary)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
