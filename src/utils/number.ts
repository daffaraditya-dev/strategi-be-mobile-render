export const parseNumber = (value: string | undefined): number => {
  const parsed = Number(value);
  return isNaN(parsed) ? 0 : parsed;
};
