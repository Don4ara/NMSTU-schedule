import { useEffect, useRef } from 'react';

// Use strict type if available, otherwise fallback to any context
// Assuming 'electron' types are available globally or we rely on window casting for now to avoid conflicts

/**
 * Hook for listening to IPC channel events
 * @param channel - IPC channel name
 * @param listener - Callback function
 */
export const useIpcListener = <T = any>(
    channel: string,
    listener: (event: any, data: T) => void
) => {
    const savedListener = useRef(listener);

    useEffect(() => {
        savedListener.current = listener;
    }, [listener]);

    useEffect(() => {
        const eventHandler = (event: any, ...args: any[]) => {
            // Assuming the main process sends (event, data)
            // If it sends multiple args, we might need to adjust typing or spread
            savedListener.current(event, args[0]);
        };

        window.ipcRenderer.on(channel, eventHandler);

        return () => {
            window.ipcRenderer.off(channel, eventHandler);
        };
    }, [channel]);
};
