import { nativeTheme as m, ipcMain as i, app as n, BrowserWindow as l, nativeImage as w } from "electron";
import { fileURLToPath as g } from "node:url";
import o from "node:path";
import d from "node:fs/promises";
m.themeSource = "light";
const p = o.dirname(g(import.meta.url));
i.handle("search-timetable", async (r, s) => {
  try {
    const t = await fetch(`https://timetable.magtu.ru/api/v2/search?q=${encodeURIComponent(s)}`);
    if (!t.ok)
      throw new Error(`Error fetching data: ${t.statusText}`);
    return await t.json();
  } catch (t) {
    return console.error("Main process search error:", t), [];
  }
});
i.handle("get-schedule", async (r, s, t) => {
  try {
    const c = await fetch(`https://timetable.magtu.ru/api/v2/${s === "group" ? "groups" : "teachers"}/${t}/schedule`);
    if (!c.ok)
      throw new Error(`Error fetching schedule: ${c.statusText}`);
    return await c.json();
  } catch (a) {
    throw console.error("Main process schedule fetch error:", a), a;
  }
});
i.handle("check-api-status", async () => {
  try {
    return (await fetch("https://timetable.magtu.ru/api/v2/search?q=test")).ok;
  } catch {
    return !1;
  }
});
i.handle("save-offline-schedule", async (r, s) => {
  try {
    const t = n.getPath("userData"), a = o.join(t, "offline-schedule.json");
    return await d.writeFile(a, JSON.stringify(s)), !0;
  } catch (t) {
    throw console.error("Failed to save offline schedule:", t), t;
  }
});
i.handle("get-offline-schedule", async () => {
  try {
    const r = n.getPath("userData"), s = o.join(r, "offline-schedule.json"), t = await d.readFile(s, "utf-8");
    return JSON.parse(t);
  } catch {
    return null;
  }
});
process.env.APP_ROOT = o.join(p, "..");
const h = process.env.VITE_DEV_SERVER_URL, T = o.join(process.env.APP_ROOT, "dist-electron"), f = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = h ? o.join(process.env.APP_ROOT, "public") : f;
let e;
function u() {
  if (e = new l({
    show: !1,
    // Don't show immediately
    icon: o.join(process.env.VITE_PUBLIC, "Icon_app.png"),
    width: 1450,
    height: 900,
    minWidth: 1450,
    minHeight: 900,
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 10, y: 10 },
    transparent: !0,
    webPreferences: {
      preload: o.join(p, "preload.mjs")
    }
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), e.once("ready-to-show", () => {
    e == null || e.show();
  }), h ? e.loadURL(h) : e.loadFile(o.join(f, "index.html")), process.platform === "darwin") {
    const r = o.join(process.env.VITE_PUBLIC, "Icon_app.png"), s = w.createFromPath(r);
    n.dock.setIcon(s.resize({ width: 128, height: 128 }));
  }
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), e = null);
});
n.on("activate", () => {
  l.getAllWindows().length === 0 && u();
});
const P = n.requestSingleInstanceLock();
P ? (n.on("second-instance", () => {
  e && (e.isMinimized() && e.restore(), e.focus());
}), n.whenReady().then(() => {
  u();
})) : n.quit();
export {
  T as MAIN_DIST,
  f as RENDERER_DIST,
  h as VITE_DEV_SERVER_URL
};
