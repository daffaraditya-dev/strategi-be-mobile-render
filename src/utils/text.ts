export function containsAlphabetic(str: string) {
  return /[a-zA-Z]/.test(str);
}

export function containUnicode(str: string) {
  // Match any character outside the basic Unicode range
  const unicodeRegex = /^[\x00-\x7F ’]+$/;
  return unicodeRegex.test(str);
}

export const capitalizeWords = (str: string): string => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
