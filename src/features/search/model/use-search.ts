import { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { searchTimetable } from "@/shared/api/timetable";

export const useSearch = () => {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    const { data: results = [], isLoading } = useQuery({
        queryKey: ['search', debouncedQuery],
        queryFn: () => searchTimetable(debouncedQuery),
        enabled: debouncedQuery.length > 0,
        staleTime: 1000 * 60, // Cache results for a minute
    });

    useEffect(() => {
        if (results.length > 0 && query.length > 0) {
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    }, [results, query]);

    return {
        query,
        setQuery,
        results,
        isLoading,
        showResults,
        setShowResults
    };
};
