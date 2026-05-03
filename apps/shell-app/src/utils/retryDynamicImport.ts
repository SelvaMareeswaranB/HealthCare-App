/**
 * Retries flaky cross-origin dynamic imports (module federation remotes).
 * Transient TLS/DNS/CDN or browser connection limits often fail once then succeed.
 */
export async function retryDynamicImport<T>(
  loader: () => Promise<T>,
  options?: { retries?: number; baseDelayMs?: number }
): Promise<T> {
  const retries = options?.retries ?? 5;
  const baseDelayMs = options?.baseDelayMs ?? 300;
  let last: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await loader();
    } catch (e) {
      last = e;
      if (attempt === retries) break;
      await new Promise((r) =>
        setTimeout(r, baseDelayMs * 2 ** attempt)
      );
    }
  }
  throw last;
}
