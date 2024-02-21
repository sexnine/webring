import { Hono } from "hono";
import { defaultUrl, sites } from "./config";
import { getUrl } from "./lib";

const app = new Hono();

app.get("/", (c) => {
  const headerString = "sexnine webring\n---------------\n\n";

  const siteListString = Object.entries(sites)
    .map(([id, url]) => `${id.padStart(2, " ")} | ${url}`)
    .join("\n");

  return c.text(headerString + siteListString);
});

app.get("/r", (c) => {
  const siteIds = Object.keys(sites);
  const randomId = siteIds[Math.floor(Math.random() * siteIds.length)];

  return c.redirect(sites[randomId], 302);
});

app.get("/:id", (c) => {
  const { id } = c.req.param();

  if (id in sites) {
    return c.redirect(sites[id], 302);
  }

  console.error(`Invalid id: ${id}`);
  return c.redirect(defaultUrl, 302);
});

app.get("/:id/n", (c) => {
  return c.redirect(getUrl(c.req.param("id"), 1), 302);
});

app.get("/:id/p", (c) => {
  return c.redirect(getUrl(c.req.param("id"), -1), 302);
});

export default app;
