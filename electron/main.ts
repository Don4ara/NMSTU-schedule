import { app, BrowserWindow } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
let splashWin: BrowserWindow | null

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
      contextIsolation: true,
    }
  })

  // Load the splash screen file
  if (VITE_DEV_SERVER_URL) {
    // In dev, we can just load from public folder served by Vite or file directly.
    // However, since splash.html is static in public, we can map it.
    // Or we can load it as a file:
    splashWin.loadFile(path.join(process.env.VITE_PUBLIC, 'splash.html'))
  } else {
    // In prod, it is copied to dist
    splashWin.loadFile(path.join(RENDERER_DIST, 'splash.html'))
  }

  splashWin.on('closed', () => {
    splashWin = null
  })
}

function createWindow() {
  win = new BrowserWindow({
    show: false, // Don't show immediately
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 15, y: 10 },
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  // Wait for the main window to be ready before showing it and closing splash
  win.once('ready-to-show', () => {
    if (splashWin) {
      // Wait a bit to show off splash
      setTimeout(() => {
        if (splashWin) {
          splashWin.close()
          splashWin = null
        }
        // Show main window ONLY after splash is closed
        win?.show()
      }, 1500)
    } else {
      win?.show()
    }
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
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })

  app.whenReady().then(() => {
    createSplashWindow()
    createWindow()
  })
}
