export const isValidHttpUrl = async (urlString: string) => {
  let url;

  try {
    url = new URL(urlString);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

export const getDataAfterHyphen = (inputString: string): string => {
  // Find the index of the first hyphen
  const hyphenIndex: number = inputString.indexOf("-");

  // Check if a hyphen is found
  if (hyphenIndex !== -1) {
    // Return the substring after the hyphen
    return inputString.slice(hyphenIndex + 1);
  } else {
    // Return the original string if no hyphen is found
    return inputString;
  }
};

export const ensureHttpProtocol = (url: string): string => {
  // Check if the URL starts with "http://" or "https://"
  if (!url?.startsWith("http://") && !url?.startsWith("https://")) {
    // If not, add "http://"
    return "http://" + url;
  }

  // If the URL already has a valid protocol, return it as is
  return url;
};
