import { useEffect, useState } from 'react';
import { Minus, Square, X, Copy } from 'lucide-react';

export function WindowControls() {
    const [isWindows, setIsWindows] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        // Check if running on Windows
        window.ipcRenderer.invoke('is-windows').then((result) => {
            setIsWindows(result as boolean);
        });

        // Check initial maximized state
        window.ipcRenderer.invoke('is-maximized').then((result) => {
            setIsMaximized(result as boolean);
        });
    }, []);

    // Don't render on macOS (uses native traffic lights)
    if (!isWindows) return null;

    const handleMinimize = () => {
        window.ipcRenderer.invoke('window-minimize');
    };

    const handleMaximize = async () => {
        const result = await window.ipcRenderer.invoke('window-maximize');
        setIsMaximized(result as boolean);
    };

    const handleClose = () => {
        window.ipcRenderer.invoke('window-close');
    };

    return (
        <div className="fixed top-0 right-0 z-[9999] flex h-10 items-center">
            {/* Minimize button */}
            <button
                onClick={handleMinimize}
                className="flex h-10 w-12 items-center justify-center transition-colors hover:bg-white/10"
                title="Свернуть"
            >
                <Minus className="h-4 w-4 text-white/70" />
            </button>

            {/* Maximize/Restore button */}
            <button
                onClick={handleMaximize}
                className="flex h-10 w-12 items-center justify-center transition-colors hover:bg-white/10"
                title={isMaximized ? 'Восстановить' : 'Развернуть'}
            >
                {isMaximized ? (
                    <Copy className="h-3.5 w-3.5 text-white/70 rotate-90" />
                ) : (
                    <Square className="h-3.5 w-3.5 text-white/70" />
                )}
            </button>

            {/* Close button */}
            <button
                onClick={handleClose}
                className="flex h-8 w-12 items-center justify-center transition-colors hover:bg-red-500"
                title="Закрыть"
            >
                <X className="h-4 w-4 text-white/70" />
            </button>
        </div>
    );
}
