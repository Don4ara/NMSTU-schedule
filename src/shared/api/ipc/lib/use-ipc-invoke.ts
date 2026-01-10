import { useCallback } from 'react';

/**
 * Hook for invoking IPC channels (Request-Response)
 * Returns a typed invoke function
 */
export const useIpcInvoke = <TResponse = any, TArgs extends any[] = any[]>() => {
    return useCallback(async (channel: string, ...args: TArgs): Promise<TResponse> => {
        try {
            return await window.ipcRenderer.invoke(channel, ...args);
        } catch (error) {
            console.error(`IPC Invoke failed for channel "${channel}":`, error);
            throw error;
        }
    }, []);
};

// Also export a standalone function for non-component usage (e.g. stores)
export const ipcInvoke = async <TResponse = any>(channel: string, ...args: any[]): Promise<TResponse> => {
    return window.ipcRenderer.invoke(channel, ...args);
};
