/**
 * Returns the given value if it is an http(s) URL, so it is safe to render as
 * a link. Returns null otherwise.
 */
export function toWebLink(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }
  try {
    const { protocol } = new URL(value);
    return protocol === "https:" || protocol === "http:" ? value : null;
  } catch {
    return null;
  }
}
