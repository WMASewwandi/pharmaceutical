import { apiUrl } from "../apiConfig";

const CONTACT_ENDPOINT = apiUrl("Contact/CreateContact");

export async function createContact(payload, signal) {
  const body = {
    name: payload?.name ?? "",
    email: payload?.email ?? "",
    phoneNumber: payload?.phoneNumber ?? "",
    company: payload?.company ?? "",
    package: payload?.package ?? "",
    description: payload?.description ?? "",
    isRead: payload?.isRead ?? false,
    isFeedback: payload?.isFeedback ?? false,
  };

  const response = await fetch(CONTACT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    signal,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage =
      data?.message ||
      data?.error ||
      `Failed to submit contact form (${response.status})`;
    throw new Error(errorMessage);
  }

  return data;
}


