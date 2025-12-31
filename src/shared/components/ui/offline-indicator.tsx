import { WifiOff } from 'lucide-react';

export const OfflineIndicator = () => {
    return (
        <div className="bg-orange-500 text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium shadow-sm w-full absolute top-0 z-50 animate-in slide-in-from-top duration-300">
            <WifiOff size={16} />
            <span>Нет подключения к интернету. Работаем в автономном режиме.</span>
        </div>
    );
};
