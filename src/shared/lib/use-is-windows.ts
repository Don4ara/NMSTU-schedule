import { useEffect, useState } from 'react';

/** На macOS слева в полосе висят системные кнопки окна — под них нужен отступ. */
export const useIsWindows = () => {
    const [isWindows, setIsWindows] = useState(false);

    useEffect(() => {
        let alive = true;
        window.ipcRenderer?.invoke('is-windows').then((result) => {
            if (alive) setIsWindows(result as boolean);
        });
        return () => { alive = false; };
    }, []);

    return isWindows;
};
