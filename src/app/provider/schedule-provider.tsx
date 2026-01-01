import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { SearchResult, checkApiHealth } from '@/shared/api/timetable';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type ViewMode = 'schedule' | 'calendar' | 'dashboard' | 'comparison';

interface ScheduleContextType {
    // ... existing interface ...
    selectedEntity: SearchResult | null;
    setSelectedEntity: (entity: SearchResult | null) => void;
    recentEntities: SearchResult[];
    clearHistory: () => void;
    isApiOnline: boolean | null;
    setApiOnlineState: (status: boolean) => void;
    // New Calendar features
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    trackedEntity: SearchResult | null;
    setTrackedEntity: (entity: SearchResult | null) => void;
    comparisonEntity: SearchResult | null;
    setComparisonEntity: (entity: SearchResult | null) => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

const STORAGE_KEY = 'schedule_recent_history';
const TRACKED_ENTITY_KEY = 'calendar_tracked_entity';
const COMPARISON_ENTITY_KEY = 'schedule_comparison_entity';
const VIEW_MODE_KEY = 'app_view_mode';

export const ScheduleProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();
    const [selectedEntity, setSelectedEntityState] = useState<SearchResult | null>(() => {
        // Initialize from tracked entity if available
        const saved = localStorage.getItem(TRACKED_ENTITY_KEY);
        return saved ? JSON.parse(saved) : null;
    });
    const [recentEntities, setRecentEntities] = useState<SearchResult[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });
    const [isApiOnline, setIsApiOnline] = useState<boolean | null>(null);

    // New state
    const [viewMode, setViewModeState] = useState<ViewMode>(() => {
        return (localStorage.getItem(VIEW_MODE_KEY) as ViewMode) || 'dashboard';
    });
    const [trackedEntity, setTrackedEntityState] = useState<SearchResult | null>(() => {
        const saved = localStorage.getItem(TRACKED_ENTITY_KEY);
        return saved ? JSON.parse(saved) : null;
    });
    const [comparisonEntity, setComparisonEntityState] = useState<SearchResult | null>(() => {
        const saved = localStorage.getItem(COMPARISON_ENTITY_KEY);
        return saved ? JSON.parse(saved) : null;
    });

    // Initial load and auto-check via React Query
    const { data: status } = useQuery({
        queryKey: ['api-status'],
        queryFn: checkApiHealth,
        refetchInterval: 60000,
        initialData: null
    });

    useEffect(() => {
        setIsApiOnline(status);
    }, [status]);

    // Handle Online/Offline events
    useEffect(() => {
        const handleOnline = () => {
            console.log("App is online! Refreshing data...");
            setIsApiOnline(true);
            // Invalidate queries to trigger refetch
            queryClient.invalidateQueries({ queryKey: ['api-status'] });
            queryClient.invalidateQueries({ queryKey: ['schedule'] });
        };

        const handleOffline = () => {
            console.log("App is offline.");
            setIsApiOnline(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [queryClient]);

    const setApiOnlineState = (status: boolean) => {
        setIsApiOnline(status);
    }

    const setViewMode = (mode: ViewMode) => {
        setViewModeState(mode);
        localStorage.setItem(VIEW_MODE_KEY, mode);
    }

    const setTrackedEntity = (entity: SearchResult | null) => {
        setTrackedEntityState(entity);
        if (entity) {
            localStorage.setItem(TRACKED_ENTITY_KEY, JSON.stringify(entity));
        } else {
            localStorage.removeItem(TRACKED_ENTITY_KEY);
        }
    }

    const setComparisonEntity = (entity: SearchResult | null) => {
        setComparisonEntityState(entity);
        if (entity) {
            localStorage.setItem(COMPARISON_ENTITY_KEY, JSON.stringify(entity));
        } else {
            localStorage.removeItem(COMPARISON_ENTITY_KEY);
        }
    }


    const setSelectedEntity = (entity: SearchResult | null) => {
        setSelectedEntityState(entity);

        if (entity) {
            setRecentEntities(prev => {
                // Remove existing if present to move to top
                const filtered = prev.filter(item => !(item.id === entity.id && item.type === entity.type));
                const newHistory = [entity, ...filtered].slice(0, 10); // Keep last 10

                localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
                return newHistory;
            });
        }
    };

    const clearHistory = () => {
        setRecentEntities([]);
        localStorage.removeItem(STORAGE_KEY);
    }

    const contextValue = useMemo(() => ({
        selectedEntity,
        setSelectedEntity,
        recentEntities,
        clearHistory,
        isApiOnline,
        setApiOnlineState,
        viewMode,
        setViewMode,
        trackedEntity,
        setTrackedEntity,
        comparisonEntity,
        setComparisonEntity
    }), [
        selectedEntity,
        recentEntities,
        isApiOnline,
        viewMode,
        trackedEntity,
        comparisonEntity
    ]);

    return (
        <ScheduleContext.Provider value={contextValue}>
            {children}
        </ScheduleContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSchedule = () => {
    const context = useContext(ScheduleContext);
    if (!context) {
        throw new Error('useSchedule must be used within a ScheduleProvider');
    }
    return context;
};
