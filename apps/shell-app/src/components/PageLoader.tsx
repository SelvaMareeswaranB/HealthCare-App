type PageLoaderProps = {
  message?: string;
};

export function PageLoader({ message = "Loading…" }: PageLoaderProps) {
  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-3 px-4 py-16"
      role="status"
      aria-live="polite"
      aria-busy
    >
      <div
        className="size-8 animate-spin rounded-full border-2 border-[var(--color-app-border)] border-t-[var(--color-app-primary)]"
        aria-hidden
      />
      <p className="text-sm text-[var(--color-app-text-muted)]">{message}</p>
    </div>
  );
}
