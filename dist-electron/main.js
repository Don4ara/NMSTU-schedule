import { nativeTheme as m, ipcMain as a, app as o, BrowserWindow as h, nativeImage as w } from "electron";
import { fileURLToPath as g } from "node:url";
import r from "node:path";
import d from "node:fs/promises";
m.themeSource = "light";
const u = r.dirname(g(import.meta.url));
a.handle("search-timetable", async (t, s) => {
  try {
    const n = await fetch(`https://timetable.magtu.ru/api/v2/search?q=${encodeURIComponent(s)}`);
    if (!n.ok)
      throw new Error(`Error fetching data: ${n.statusText}`);
    return await n.json();
  } catch (n) {
    return console.error("Main process search error:", n), [];
  }
});
a.handle("get-schedule", async (t, s, n) => {
  try {
    const c = await fetch(`https://timetable.magtu.ru/api/v2/${s === "group" ? "groups" : "teachers"}/${n}/schedule`);
    if (!c.ok)
      throw new Error(`Error fetching schedule: ${c.statusText}`);
    return await c.json();
  } catch (i) {
    throw console.error("Main process schedule fetch error:", i), i;
  }
});
a.handle("check-api-status", async () => {
  try {
    return (await fetch("https://timetable.magtu.ru/api/v2/search?q=test")).ok;
  } catch {
    return !1;
  }
});
a.handle("save-offline-schedule", async (t, s) => {
  try {
    const n = o.getPath("userData"), i = r.join(n, "offline-schedule.json");
    return await d.writeFile(i, JSON.stringify(s)), !0;
  } catch (n) {
    throw console.error("Failed to save offline schedule:", n), n;
  }
});
a.handle("get-offline-schedule", async () => {
  try {
    const t = o.getPath("userData"), s = r.join(t, "offline-schedule.json"), n = await d.readFile(s, "utf-8");
    return JSON.parse(n);
  } catch {
    return null;
  }
});
a.handle("toggle-fullscreen", async () => {
  if (e) {
    const t = e.isFullScreen();
    return e.setFullScreen(!t), !t;
  }
  return !1;
});
a.handle("is-fullscreen", async () => e ? e.isFullScreen() : !1);
process.env.APP_ROOT = r.join(u, "..");
const l = process.env.VITE_DEV_SERVER_URL, R = r.join(process.env.APP_ROOT, "dist-electron"), p = r.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = l ? r.join(process.env.APP_ROOT, "public") : p;
let e;
function f() {
  e = new h({
    show: !1,
    // Don't show immediately
    icon: r.join(process.env.VITE_PUBLIC, "Icon_app.png"),
    width: 1450,
    height: 900,
    minWidth: 1450,
    minHeight: 900,
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 10, y: 10 },
    transparent: !0,
    webPreferences: {
      preload: r.join(u, "preload.mjs")
    }
  }), e.setMenu(null), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), e.once("ready-to-show", () => {
    e == null || e.show();
  }), l ? e.loadURL(l) : e.loadFile(r.join(p, "index.html"));
}
o.on("window-all-closed", () => {
  process.platform !== "darwin" && (o.quit(), e = null);
});
o.on("activate", () => {
  h.getAllWindows().length === 0 && f();
});
const P = o.requestSingleInstanceLock();
P ? (o.on("second-instance", () => {
  e && (e.isMinimized() && e.restore(), e.focus());
}), o.whenReady().then(() => {
  if (process.platform === "darwin")
    try {
      const t = r.join(process.env.VITE_PUBLIC, "Icon_app.png"), s = w.createFromPath(t);
      o.dock.setIcon(s);
    } catch (t) {
      console.error("Failed to set dock icon:", t);
    }
  f();
})) : o.quit();
export {
  R as MAIN_DIST,
  p as RENDERER_DIST,
  l as VITE_DEV_SERVER_URL
};
