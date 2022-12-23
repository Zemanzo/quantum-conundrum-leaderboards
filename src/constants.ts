const isDev = process.env.NODE_ENV === "development";

export const API_ROOT_URL = isDev
  ? "http://localhost:3005"
  : window.location.origin; // Development
