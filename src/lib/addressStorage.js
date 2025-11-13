const STORAGE_KEY = "checkoutAddresses";

const readStore = () => {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return parsed;
    }
    return {};
  } catch (error) {
    console.warn("Failed to parse checkout addresses from storage:", error);
    return {};
  }
};

const writeStore = (data) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("Failed to write checkout addresses to storage:", error);
  }
};

export const loadAddresses = (userKey) => {
  if (!userKey) return [];
  const store = readStore();
  return Array.isArray(store[userKey]) ? store[userKey] : [];
};

export const saveAddress = (userKey, address) => {
  if (!userKey) return [];
  const store = readStore();
  const existing = Array.isArray(store[userKey]) ? store[userKey] : [];
  const updated = [...existing, address];
  store[userKey] = updated;
  writeStore(store);
  return updated;
};

export const replaceAddresses = (userKey, addresses) => {
  if (!userKey) return [];
  const store = readStore();
  store[userKey] = addresses;
  writeStore(store);
  return addresses;
};

