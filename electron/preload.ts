import { ipcRenderer, contextBridge } from 'electron'

// `on` регистрирует обёртку вокруг listener, поэтому `off` с исходной функцией
// ничего не снимал (ipcRenderer сравнивает по ссылке). Держим соответствие
// listener -> wrapper, чтобы отписка работала.
type Wrapped = (event: Electron.IpcRendererEvent, ...args: unknown[]) => void
const wrappers = new Map<string, Map<(...args: unknown[]) => void, Wrapped>>()

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    const wrapped: Wrapped = (event, ...rest) => listener(event, ...rest)
    let perChannel = wrappers.get(channel)
    if (!perChannel) {
      perChannel = new Map()
      wrappers.set(channel, perChannel)
    }
    perChannel.set(listener as (...a: unknown[]) => void, wrapped)
    return ipcRenderer.on(channel, wrapped)
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, listener] = args
    const perChannel = wrappers.get(channel)
    const wrapped = perChannel?.get(listener as (...a: unknown[]) => void)
    if (!wrapped) return ipcRenderer
    perChannel!.delete(listener as (...a: unknown[]) => void)
    if (perChannel!.size === 0) wrappers.delete(channel)
    return ipcRenderer.off(channel, wrapped)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})
