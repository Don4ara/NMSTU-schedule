import { useEffect, useRef } from 'react';

/**
 * Hook for listening to IPC channel events
 * @param channel - IPC channel name
 * @param listener - Callback function
 */
export const useIpcListener = <T = unknown>(
    channel: string,
    listener: (event: Electron.IpcRendererEvent, data: T) => void
) => {
    const savedListener = useRef(listener);

    useEffect(() => {
        savedListener.current = listener;
    }, [listener]);

    useEffect(() => {
        const eventHandler = (event: Electron.IpcRendererEvent, ...args: unknown[]) => {
            savedListener.current(event, args[0] as T);
        };

        window.ipcRenderer.on(channel, eventHandler);

        return () => {
            window.ipcRenderer.off(channel, eventHandler);
        };
    }, [channel]);
};
