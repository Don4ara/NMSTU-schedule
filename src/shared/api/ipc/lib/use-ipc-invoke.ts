import { useCallback } from 'react';

/**
 * Hook for invoking IPC channels (Request-Response)
 * Returns a typed invoke function
 */
export const useIpcInvoke = <TResponse = unknown, TArgs extends unknown[] = unknown[]>() => {
    return useCallback(async (channel: string, ...args: TArgs): Promise<TResponse> => {
        try {
            return await window.ipcRenderer.invoke(channel, ...args) as TResponse;
        } catch (error) {
            console.error(`IPC Invoke failed for channel "${channel}":`, error);
            throw error;
        }
    }, []);
};

// Also export a standalone function for non-component usage (e.g. stores)
export const ipcInvoke = async <TResponse = unknown>(channel: string, ...args: unknown[]): Promise<TResponse> => {
    return window.ipcRenderer.invoke(channel, ...args) as TResponse;
};
