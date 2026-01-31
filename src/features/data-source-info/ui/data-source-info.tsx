import { Info } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/components/ui/popover";

export const DataSourceInfo = () => {
    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <Popover>
                <PopoverTrigger asChild>
                    <button className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-sm cursor-pointer">
                        <Info size={16} />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 mr-6 mb-2">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Источник данных</h4>
                        <p className="text-sm text-muted-foreground">
                            Актуальная версия расписания доступна на портале университета:
                        </p>
                        <a
                            href="https://newlms.magtu.ru/course/view.php?id=26619"
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-medium text-primary hover:underline block break-all"
                        >
                            Перейти к источнику
                        </a>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};
