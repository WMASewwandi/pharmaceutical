export const API_BASE_URL = "https://localhost:44352/api/";

export const apiUrl = (path = "") => {
  if (!path) return API_BASE_URL;
  return new URL(path, API_BASE_URL).toString();
};

