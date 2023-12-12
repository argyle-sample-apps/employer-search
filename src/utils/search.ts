import Fuse from "fuse.js";
import fallbackItemsRaw from "./fallback.json";

const fallbackItems = fallbackItemsRaw.map((item) => ({
  id: item.toLowerCase().split(" ").join("-"),
  name: item,
}));

const options = {
  keys: ["name"],
  threshold: 0.15,
};

export const fuse = new Fuse(fallbackItems, options);

export function hasMatchIn(array: any, item: any) {
  const hasMatchingId = array.some((s: any) => s.id === item.id);
  const hasMatchingName = array.some(
    (s: any) => s.name?.toLowerCase() === item.name?.toLowerCase()
  );

  if (hasMatchingId || hasMatchingName) {
    return true;
  }

  return false;
}
