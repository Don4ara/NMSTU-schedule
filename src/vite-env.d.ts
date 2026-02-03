/// <reference types="vite/client" />

declare const __APP_VERSION__: string;

interface Window {
    ipcRenderer: {
        send(channel: string, ...args: any[]): void;
        on(channel: string, listener: (event: any, ...args: any[]) => void): void;
        off(channel: string, ...args: any[]): void;
        invoke(channel: string, ...args: any[]): Promise<any>;
    };
}
