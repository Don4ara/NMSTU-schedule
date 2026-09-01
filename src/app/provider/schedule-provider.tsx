import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { SearchResult, checkApiHealth } from '@/shared/api/timetable';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface ScheduleContextType {
    // ... existing interface ...
    selectedEntity: SearchResult | null;
    setSelectedEntity: (entity: SearchResult | null) => void;
    recentEntities: SearchResult[];
    clearHistory: () => void;
    isApiOnline: boolean | null;
    setApiOnlineState: (status: boolean) => void;
    // New Calendar features
    trackedEntity: SearchResult | null;
    setTrackedEntity: (entity: SearchResult | null) => void;
    comparisonEntity: SearchResult | null;
    setComparisonEntity: (entity: SearchResult | null) => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

// localStorage может содержать мусор (ручная правка, оборванная запись).
// Без guard'а JSON.parse кидает прямо в инициализаторе useState — это падение
// первого рендера, до любого error boundary, то есть белый экран.
const readJson = <T,>(key: string, fallback: T): T => {
    try {
        const saved = localStorage.getItem(key);
        return saved ? (JSON.parse(saved) as T) : fallback;
    } catch {
        localStorage.removeItem(key);
        return fallback;
    }
};

const STORAGE_KEY = 'schedule_recent_history';
const TRACKED_ENTITY_KEY = 'calendar_tracked_entity';
const COMPARISON_ENTITY_KEY = 'schedule_comparison_entity';


export const ScheduleProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();
    const [selectedEntity, setSelectedEntityState] = useState<SearchResult | null>(
        // Initialize from tracked entity if available
        () => readJson<SearchResult | null>(TRACKED_ENTITY_KEY, null)
    );
    const [recentEntities, setRecentEntities] = useState<SearchResult[]>(
        () => readJson<SearchResult[]>(STORAGE_KEY, [])
    );
    const [isApiOnline, setIsApiOnline] = useState<boolean | null>(null);

    const [trackedEntity, setTrackedEntityState] = useState<SearchResult | null>(
        () => readJson<SearchResult | null>(TRACKED_ENTITY_KEY, null)
    );
    const [comparisonEntity, setComparisonEntityState] = useState<SearchResult | null>(
        () => readJson<SearchResult | null>(COMPARISON_ENTITY_KEY, null)
    );

    const { data: status } = useQuery({
        queryKey: ['api-status'],
        queryFn: checkApiHealth,
        refetchInterval: 60000,
        initialData: null
    });

    useEffect(() => {
        setIsApiOnline(status);
    }, [status]);

    useEffect(() => {
        const handleOnline = () => {
            console.log("App is online! Refreshing data...");
            setIsApiOnline(true);
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
                return [entity, ...filtered].slice(0, 10); // Keep last 10
            });
        }
    };

    const clearHistory = () => {
        setRecentEntities([]);
    }

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(recentEntities));
    }, [recentEntities]);

    const contextValue = useMemo(() => ({
        selectedEntity,
        setSelectedEntity,
        recentEntities,
        clearHistory,
        isApiOnline,
        setApiOnlineState,
        trackedEntity,
        setTrackedEntity,
        comparisonEntity,
        setComparisonEntity
    }), [
        selectedEntity,
        recentEntities,
        isApiOnline,
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
