import { nativeTheme, ipcMain, app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
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
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
let splashWin;
function createSplashWindow() {
  splashWin = new BrowserWindow({
    width: 400,
    height: 400,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    movable: false,
    center: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  if (VITE_DEV_SERVER_URL) {
    splashWin.loadFile(path.join(process.env.VITE_PUBLIC, "splash.html"));
  } else {
    splashWin.loadFile(path.join(RENDERER_DIST, "splash.html"));
  }
  splashWin.on("closed", () => {
    splashWin = null;
  });
}
function createWindow() {
  win = new BrowserWindow({
    show: false,
    // Don't show immediately
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    width: 1400,
    height: 900,
    minWidth: 1400,
    minHeight: 900,
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 10, y: 10 },
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  win.once("ready-to-show", () => {
    if (splashWin) {
      setTimeout(() => {
        if (splashWin) {
          splashWin.close();
          splashWin = null;
        }
        win == null ? void 0 : win.show();
      }, 1500);
    } else {
      win == null ? void 0 : win.show();
    }
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
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });
  app.whenReady().then(() => {
    createSplashWindow();
    createWindow();
  });
}
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
