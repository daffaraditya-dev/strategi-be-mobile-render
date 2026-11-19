export const pMap = async <T, U>(
  collection: T[],
  mapper: (item: T, index: number) => Promise<U>,
  { concurrency = Infinity } = {}
): Promise<U[]> => {
  const results: U[] = [];
  const running: Promise<any>[] = [];
  let index = 0;

  for (const item of collection) {
    const promise = (async () => {
      const result = await mapper(item, index);
      results[index] = result;
    })();

    running.push(promise);
    index++;

    if (running.length >= concurrency) {
      await Promise.race(running);
      running.splice(0, 1);
    }
  }

  await Promise.all(running);
  return results;
};
