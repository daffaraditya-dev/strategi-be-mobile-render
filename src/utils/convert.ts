type AnyObject = { [key: string]: any };

export const toCamelCase = <T>(data: T): T => {
  if (Array.isArray(data)) {
    return data.map((item) => toCamelCase(item)) as T;
  } else if (data !== null && typeof data === "object") {
    return Object.keys(data).reduce((acc, key) => {
      const camelKey = key.replace(/_([a-z0-9])/gi, (_, letter) =>
        letter.toUpperCase()
      );
      acc[camelKey] = toCamelCase((data as AnyObject)[key]);
      return acc;
    }, {} as AnyObject) as T;
  }
  return data;
};
