import { createUrl } from "../repositories/url.repository";

export async function shortenUrl(originalUrl: string) {
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(originalUrl);
  } catch {
    throw new Error("Invalid URL");
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error("Only HTTP and HTTPS URLs are allowed");
  }

  return createUrl(parsedUrl.toString());
}
