interface LockEntry {
  acquiredAt: number;
  timeoutMs: number;
}

const locks = new Map<string, LockEntry>();

function acquireLock(key: string, timeoutMs: number): boolean {
  const existing = locks.get(key);
  if (existing) {
    const elapsed = Date.now() - existing.acquiredAt;
    if (elapsed < existing.timeoutMs) {
      return false;
    }
    console.warn(`[CronLock] Stale lock released: ${key} (held ${(elapsed / 1000).toFixed(1)}s)`);
  }
  locks.set(key, { acquiredAt: Date.now(), timeoutMs });
  return true;
}

function releaseLock(key: string): void {
  locks.delete(key);
}

export async function withLock<T>(
  key: string,
  fn: () => Promise<T>,
  timeoutMs = 15 * 60 * 1000
): Promise<T | null> {
  if (!acquireLock(key, timeoutMs)) {
    console.warn(`[CronLock] Skipping — already running: ${key}`);
    return null;
  }
  const start = Date.now();
  try {
    return await fn();
  } finally {
    releaseLock(key);
    console.log(`[CronLock] Released: ${key} (${((Date.now() - start) / 1000).toFixed(1)}s)`);
  }
}
