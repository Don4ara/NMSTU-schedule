import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Search } from "./search";
import { SearchResult } from "@/shared/api/timetable";

interface ScheduleSearchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (result: SearchResult) => void;
    title?: string;
}

export const ScheduleSearchDialog = ({ open, onOpenChange, onSelect, title = "Поиск расписания" }: ScheduleSearchDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-visible bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <DialogHeader className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <DialogTitle className="text-base font-medium text-slate-700 dark:text-slate-200">
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <div className="p-4">
                    <Search
                        className="w-full"
                        placeholder="Начните вводить название группы или фамилию..."
                        onSelectResult={(result) => {
                            onSelect(result);
                            onOpenChange(false);
                        }}
                        variant="overlay"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};
