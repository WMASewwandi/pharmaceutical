import { apiUrl } from "../apiConfig";

export async function fetchCategoriesWithCounts(signal) {
  const response = await fetch(apiUrl("Items/GetCategoriesWithItemCount"), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to load categories (${response.status})`);
  }

  const payload = await response.json();
  if (!payload || payload.statusCode !== 200) {
    throw new Error(payload?.message || "Unexpected categories response");
  }

  return payload.result || [];
}
