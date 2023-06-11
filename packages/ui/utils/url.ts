export const removeProtocolFromUrl = (url: string): string =>
  url.replace(/^[a-z]+:\/\//i, "");
