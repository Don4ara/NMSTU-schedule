import * as React from "react"
import { SearchIcon, Loader2 } from "lucide-react"
import { Input } from "@/shared/components/ui/input"
import { SearchResult, searchTimetable } from "@/shared/api/timetable"
import { useSchedule } from "@/app/provider/schedule-provider"
import { cn } from "@/shared/lib/utils"
import { useQuery } from '@tanstack/react-query';

interface SearchProps {
    onSelectResult?: (result: SearchResult) => void;
    className?: string;
    placeholder?: string;
}

export function Search({ onSelectResult, className, placeholder }: SearchProps) {
    const { setSelectedEntity } = useSchedule()
    const [query, setQuery] = React.useState("")
    const [debouncedQuery, setDebouncedQuery] = React.useState("")
    const [showResults, setShowResults] = React.useState(false)

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query)
        }, 300)
        return () => clearTimeout(timer)
    }, [query])

    const { data: results = [], isLoading } = useQuery({
        queryKey: ['search', debouncedQuery],
        queryFn: () => searchTimetable(debouncedQuery),
        enabled: debouncedQuery.length > 0,
        staleTime: 1000 * 60, // Cache results for a minute
    });

    React.useEffect(() => {
        if (results.length > 0 && query.length > 0) {
            setShowResults(true)
        } else {
            setShowResults(false) // Hide if no results or query cleared
        }
    }, [results, query]);

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
                        setTimeout(() => setShowResults(false), 200)
                    }}
                />
                {isLoading && (
                    <Loader2 className="absolute right-2 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
                )}
            </div>
            {showResults && results.length > 0 && (
                <div className="absolute top-full z-50 mt-1 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
                    <div className="max-h-[300px] overflow-y-auto p-1">
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
