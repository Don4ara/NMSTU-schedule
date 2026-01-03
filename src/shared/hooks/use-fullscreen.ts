import { useState, useEffect } from 'react';

export function useFullscreen() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        // Проверяем начальное состояние
        const checkFullscreen = async () => {
            if (window.ipcRenderer) {
                const fullscreen = await window.ipcRenderer.invoke('is-fullscreen');
                setIsFullscreen(fullscreen);
            }
        };

        checkFullscreen();
    }, []);

    const toggleFullscreen = async () => {
        if (window.ipcRenderer) {
            const newState = await window.ipcRenderer.invoke('toggle-fullscreen');
            setIsFullscreen(newState);
        }
    };

    return {
        isFullscreen,
        toggleFullscreen,
    };
}
