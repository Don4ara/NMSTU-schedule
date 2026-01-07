import { nativeTheme, ipcMain, app, BrowserWindow, nativeImage } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";
nativeTheme.themeSource = "light";
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
ipcMain.handle("search-timetable", async (_event, query) => {
  try {
    const response = await fetch(`https://timetable.magtu.ru/api/v2/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Main process search error:", error);
    return [];
  }
});
ipcMain.handle("get-schedule", async (_event, type, id) => {
  try {
    const endpoint = type === "group" ? "groups" : "teachers";
    const response = await fetch(`https://timetable.magtu.ru/api/v2/${endpoint}/${id}/schedule`);
    if (!response.ok) {
      throw new Error(`Error fetching schedule: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Main process schedule fetch error:", error);
    throw error;
  }
});
ipcMain.handle("check-api-status", async () => {
  try {
    const response = await fetch("https://timetable.magtu.ru/api/v2/search?q=test");
    return response.ok;
  } catch (error) {
    return false;
  }
});
ipcMain.handle("save-offline-schedule", async (_event, data) => {
  try {
    const userDataPath = app.getPath("userData");
    const filePath = path.join(userDataPath, "offline-schedule.json");
    await fs.writeFile(filePath, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Failed to save offline schedule:", error);
    throw error;
  }
});
ipcMain.handle("get-offline-schedule", async () => {
  try {
    const userDataPath = app.getPath("userData");
    const filePath = path.join(userDataPath, "offline-schedule.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    return null;
  }
});
ipcMain.handle("toggle-fullscreen", async () => {
  if (win && !win.isDestroyed()) {
    const isFullScreen = win.isFullScreen();
    win.setFullScreen(!isFullScreen);
    return !isFullScreen;
  }
  return false;
});
ipcMain.handle("is-fullscreen", async () => {
  return win && !win.isDestroyed() ? win.isFullScreen() : false;
});
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    show: false,
    // Don't show immediately
    icon: path.join(process.env.VITE_PUBLIC, "Icon_app.png"),
    width: 1450,
    height: 900,
    minWidth: 1450,
    minHeight: 900,
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 10, y: 10 },
    transparent: true,
    backgroundColor: "#00000000",
    // Прозрачный фон, но темный при необходимости
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs"),
      devTools: !!VITE_DEV_SERVER_URL
      // DevTools только в dev режиме
    }
  });
  win.setMenu(null);
  if (!VITE_DEV_SERVER_URL) {
    win.webContents.on("devtools-opened", () => {
      win == null ? void 0 : win.webContents.closeDevTools();
    });
  }
  win.webContents.on("did-finish-load", () => {
    if (win && !win.isDestroyed()) {
      win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
    }
  });
  win.once("ready-to-show", () => {
    win == null ? void 0 : win.show();
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (win && !win.isDestroyed()) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });
  app.whenReady().then(() => {
    if (process.platform === "darwin") {
      try {
        const iconPath = path.join(process.env.VITE_PUBLIC, "Icon_app.png");
        const image = nativeImage.createFromPath(iconPath);
        app.dock.setIcon(image);
      } catch (e) {
        console.error("Failed to set dock icon:", e);
      }
    }
    createWindow();
  });
}
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
