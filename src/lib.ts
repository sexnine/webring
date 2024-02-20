import { defaultUrl, sites } from "./config";

export const getUrl = (id: string, delta: number) => {
  const ids = Object.keys(sites);
  const indexOfId = ids.indexOf(id);

  if (indexOfId === -1) {
    console.error(`Invalid id: ${id}`);
    return defaultUrl;
  }

  const nextId = ids[(indexOfId + delta + ids.length) % ids.length];

  return sites[nextId];
};
