export const API_BASE_URL = "https://opusmarketplace.clovesis.com/api/";

export const apiUrl = (path = "") => {
  if (!path) return API_BASE_URL;
  return new URL(path, API_BASE_URL).toString();
};

