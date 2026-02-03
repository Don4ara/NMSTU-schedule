/// <reference types="vite/client" />

declare const __APP_VERSION__: string;

interface Window {
    ipcRenderer: {
        send(channel: string, ...args: unknown[]): void;
        on(channel: string, listener: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void): void;
        off(channel: string, ...args: unknown[]): void;
        invoke(channel: string, ...args: unknown[]): Promise<unknown>;
    };
}
