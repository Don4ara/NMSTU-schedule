import { SearchIcon, Loader2 } from "lucide-react"
import { Input } from "@/shared/components/ui/input"
import { SearchResult } from "@/shared/api/timetable"
import { useSchedule } from "@/app/provider/schedule-provider"
import { cn } from "@/shared/lib/utils"
import { useSearch } from "../model/use-search"

interface SearchProps {
    onSelectResult?: (result: SearchResult) => void;
    className?: string;
    placeholder?: string;
    variant?: 'overlay' | 'static';
}

export function Search({ onSelectResult, className, placeholder, variant = 'overlay' }: SearchProps) {
    const { setSelectedEntity } = useSchedule()
    const { query, setQuery, results, isLoading, showResults, setShowResults } = useSearch()

    const handleSelect = (result: SearchResult) => {
        if (onSelectResult) {
            onSelectResult(result);
        } else {
            setSelectedEntity(result);
        }
        setShowResults(false);
        setQuery('');
    };

    return (
        <div className={cn("relative", className)}>
            <div className="relative">
                <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder={placeholder || "Search group or teacher..."}
                    className="pl-8"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        if (results.length > 0) setShowResults(true)
                    }}
                    onBlur={() => {
                        // Delay hiding to allow click event on result
                        // Only hide on blur if we are in overlay mode
                        if (variant === 'overlay') {
                            setTimeout(() => setShowResults(false), 200)
                        }
                    }}
                />
                {isLoading && (
                    <Loader2 className="absolute right-2 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
                )}
            </div>
            {showResults && results.length > 0 && (
                <div className={cn(
                    "z-50 mt-1 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
                    variant === 'overlay' ? "absolute top-full" : "relative"
                )}>
                    <div className={cn("overflow-y-auto p-1", variant === 'overlay' ? "max-h-[300px]" : "max-h-[60vh]")}>
                        {results.map((result) => (
                            <div
                                key={`${result.type}-${result.id}`}
                                className={cn(
                                    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                                )}
                                onClick={() => handleSelect(result)}
                            >
                                <span className="font-medium">{result.name}</span>
                                <span className="ml-auto text-xs text-muted-foreground capitalize">
                                    {result.type === 'group' ? 'Группа' : 'Преп.'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

