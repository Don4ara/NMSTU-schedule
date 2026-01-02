import { nativeTheme as m, ipcMain as i, app as o, BrowserWindow as l, nativeImage as w } from "electron";
import { fileURLToPath as g } from "node:url";
import n from "node:path";
import d from "node:fs/promises";
m.themeSource = "light";
const p = n.dirname(g(import.meta.url));
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
    const t = o.getPath("userData"), a = n.join(t, "offline-schedule.json");
    return await d.writeFile(a, JSON.stringify(s)), !0;
  } catch (t) {
    throw console.error("Failed to save offline schedule:", t), t;
  }
});
i.handle("get-offline-schedule", async () => {
  try {
    const r = o.getPath("userData"), s = n.join(r, "offline-schedule.json"), t = await d.readFile(s, "utf-8");
    return JSON.parse(t);
  } catch {
    return null;
  }
});
process.env.APP_ROOT = n.join(p, "..");
const h = process.env.VITE_DEV_SERVER_URL, T = n.join(process.env.APP_ROOT, "dist-electron"), u = n.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = h ? n.join(process.env.APP_ROOT, "public") : u;
let e;
function f() {
  if (e = new l({
    show: !1,
    // Don't show immediately
    icon: n.join(process.env.VITE_PUBLIC, "Icon_app.png"),
    width: 1450,
    height: 900,
    minWidth: 1450,
    minHeight: 900,
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 10, y: 10 },
    transparent: !0,
    webPreferences: {
      preload: n.join(p, "preload.mjs")
    }
  }), e.setMenu(null), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), e.once("ready-to-show", () => {
    e == null || e.show();
  }), h ? e.loadURL(h) : e.loadFile(n.join(u, "index.html")), process.platform === "darwin") {
    const r = n.join(process.env.VITE_PUBLIC, "Icon_app.png"), s = w.createFromPath(r);
    o.dock.setIcon(s.resize({ width: 128, height: 128 }));
  }
}
o.on("window-all-closed", () => {
  process.platform !== "darwin" && (o.quit(), e = null);
});
o.on("activate", () => {
  l.getAllWindows().length === 0 && f();
});
const P = o.requestSingleInstanceLock();
P ? (o.on("second-instance", () => {
  e && (e.isMinimized() && e.restore(), e.focus());
}), o.whenReady().then(() => {
  f();
})) : o.quit();
export {
  T as MAIN_DIST,
  u as RENDERER_DIST,
  h as VITE_DEV_SERVER_URL
};
