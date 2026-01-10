import { app, BrowserWindow, ipcMain, nativeTheme, nativeImage } from 'electron'
import axios from 'axios';
import axiosRetry from 'axios-retry';

// Configure Axios Retry
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNABORTED';
  }
});

// Force light theme for window controls visibility
nativeTheme.themeSource = 'light'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs/promises'

// ... (other imports/constants)

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ... (constants)

// IPC Handler for Timetable Search
ipcMain.handle('search-timetable', async (_event, query) => {
  try {
    const response = await axios.get(`https://timetable.magtu.ru/api/v2/search`, {
      params: { q: query },
      timeout: 10000
    });
    return response.data;
  } catch (error) {
    console.error("Main process search error:", error);
    return [];
  }
})

ipcMain.handle('get-schedule', async (_event, type: 'group' | 'teacher', id: string) => {
  try {
    const endpoint = type === 'group' ? 'groups' : 'teachers';
    const response = await axios.get(`https://timetable.magtu.ru/api/v2/${endpoint}/${id}/schedule`, {
      timeout: 15000
    });
    return response.data;
  } catch (error) {
    console.error("Main process schedule fetch error:", error);
    throw error;
  }
})

ipcMain.handle('check-api-status', async () => {
  try {
    await axios.get('https://timetable.magtu.ru/api/v2/search?q=test', { timeout: 5000 });
    return true;
  } catch (error) {
    return false;
  }
})

// Offline Schedule Handlers

ipcMain.handle('save-offline-schedule', async (_event, data) => {
  try {
    const userDataPath = app.getPath('userData');
    const filePath = path.join(userDataPath, 'offline-schedule.json');
    await fs.writeFile(filePath, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save offline schedule:', error);
    throw error;
  }
})

ipcMain.handle('get-offline-schedule', async () => {
  try {
    const userDataPath = app.getPath('userData');
    const filePath = path.join(userDataPath, 'offline-schedule.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // If file doesn't exist or is invalid, return null
    return null;
  }
})

// Fullscreen toggle handler
ipcMain.handle('toggle-fullscreen', async () => {
  if (win && !win.isDestroyed()) {
    const isFullScreen = win.isFullScreen();
    win.setFullScreen(!isFullScreen);
    return !isFullScreen;
  }
  return false;
})

ipcMain.handle('is-fullscreen', async () => {
  return (win && !win.isDestroyed()) ? win.isFullScreen() : false;
})

// ... (rest of the file)

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null



function createWindow() {
  win = new BrowserWindow({
    show: false, // Don't show immediately
    icon: path.join(process.env.VITE_PUBLIC, 'Icon_app.png'),
    width: 1450,
    height: 900,
    minWidth: 1450,
    minHeight: 900,
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 10, y: 10 },
    transparent: true,
    backgroundColor: '#00000000', // Прозрачный фон, но темный при необходимости
    webPreferences: {
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.mjs'),
      devTools: !!VITE_DEV_SERVER_URL, // DevTools только в dev режиме
    },
  })

  // Remove the menu bar (File, Edit, etc.) on Windows/Linux
  win.setMenu(null)

  // Отключаем DevTools в production
  if (!VITE_DEV_SERVER_URL) {
    // Блокируем открытие DevTools
    win.webContents.on('devtools-opened', () => {
      win?.webContents.closeDevTools()
    })
  }

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    if (win && !win.isDestroyed()) {
      win.webContents.send('main-process-message', (new Date).toLocaleString())
    }
  })

  // Wait for the main window to be ready before showing it
  win.once('ready-to-show', () => {
    win?.show()
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('before-quit', () => {
  // Graceful shutdown of any spawned processes (if added later)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    if (win && !win.isDestroyed()) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })

  app.whenReady().then(() => {
    // Set branding
    if (process.platform === 'darwin') {
      try {
        const iconPath = path.join(process.env.VITE_PUBLIC, 'Icon_app.png');
        const image = nativeImage.createFromPath(iconPath);
        app.dock.setIcon(image);
        // app.setName is often read-only in packaged apps (Info.plist source of truth)
        // app.setName('NMSTU-Shedule'); 
      } catch (e) {
        console.error("Failed to set dock icon:", e);
      }
    }

    createWindow()
  })
}
