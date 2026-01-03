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

        // Слушаем события изменения размера окна для синхронизации состояния
        // при использовании нативных средств (F11, кнопки окна и т.д.)
        const handleResize = async () => {
            if (window.ipcRenderer) {
                const fullscreen = await window.ipcRenderer.invoke('is-fullscreen');
                setIsFullscreen(fullscreen);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
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
