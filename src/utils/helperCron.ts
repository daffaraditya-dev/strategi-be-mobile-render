export { withLock } from '@/utils/cronLock';

export async function runProduksiLocked(
  moda: string,
  isEvent = false,
  fn: () => Promise<void>
): Promise<void> {
  const { withLock } = await import('@/utils/cronLock');
  const key = `produksi:${moda}-${isEvent ? "event" : "normal"}`;
  await withLock(key, fn);
}
