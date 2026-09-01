import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, PanelLeft, Plus, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/shared/lib/utils'
import { useIsWindows } from '@/shared/lib/use-is-windows'
import { VIEW_ICON, VIEW_LABEL, DEFAULT_VIEW } from '@/shared/config'
import { requestToggleSidebar } from '@/shared/lib/ui-events'

function ChromeBtn({ children, ...rest }: React.ComponentProps<'button'>) {
    return (
        <button
            type="button"
            className="app-no-drag flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground disabled:opacity-40 disabled:hover:bg-transparent"
            {...rest}
        >
            {children}
        </button>
    )
}

/**
 * Полоса вкладок на всю ширину окна, над сайдбаром. Вкладка = открытая
 * страница; навигация из сайдбара ведёт активную вкладку за собой.
 * Спейсер слева повторяет ширину сайдбара, вкладки равняются по краю контента.
 */
export function TabBar({ sidebarOpen }: { sidebarOpen: boolean }) {
    const navigate = useNavigate()
    const isWindows = useIsWindows()
    const view = useLocation().pathname
    const [tabs, setTabs] = useState<string[]>([VIEW_LABEL[view] ? view : DEFAULT_VIEW])
    const [active, setActive] = useState(0)
    // navigate() идёт через startTransition, так что смена active коммитится
    // раньше смены URL — ref держит актуальный индекс, чтобы эффект ниже не
    // переписал только что открытую вкладку старой страницей
    const activeRef = useRef(0)
    const activate = (i: number) => {
        activeRef.current = i
        setActive(i)
    }

    // навигация из сайдбара ведёт активную вкладку за собой
    useEffect(() => {
        if (!VIEW_LABEL[view]) return
        const a = activeRef.current
        setTabs((ts) => (ts[a] === view ? ts : ts.map((t, i) => (i === a ? view : t))))
    }, [view])

    const open = (i: number) => {
        activate(i)
        navigate(tabs[i])
    }
    const add = () => {
        setTabs((ts) => [...ts, DEFAULT_VIEW])
        activate(tabs.length)
        navigate(DEFAULT_VIEW)
    }
    const close = (i: number) => {
        // последняя вкладка не исчезает — сбрасывается на главную
        if (tabs.length === 1) {
            setTabs([DEFAULT_VIEW])
            activate(0)
            navigate(DEFAULT_VIEW)
            return
        }
        const next = tabs.filter((_, x) => x !== i)
        const nextActive = i < active ? active - 1 : Math.min(active, next.length - 1)
        setTabs(next)
        activate(nextActive)
        if (i === active) navigate(next[nextActive])
    }

    return (
        <div className="app-drag flex h-10 shrink-0 items-center bg-sidebar pr-3">
            <div
                data-slot="tabbar-spacer"
                className={cn(
                    'flex h-full min-w-fit shrink-0 items-center justify-end gap-0.5 pr-2 transition-[width] duration-200 ease-linear',
                    // на macOS слева системные кнопки окна, на Windows их там нет
                    isWindows ? 'pl-2' : 'pl-[76px]',
                    sidebarOpen ? 'w-[var(--sidebar-width,16rem)]' : 'w-2',
                )}
            >
                <ChromeBtn title="Свернуть сайдбар" onClick={requestToggleSidebar}>
                    <PanelLeft size={15} />
                </ChromeBtn>
                <ChromeBtn title="Назад" onClick={() => navigate(-1)}>
                    <ChevronLeft size={16} />
                </ChromeBtn>
                <ChromeBtn title="Вперёд" onClick={() => navigate(1)}>
                    <ChevronRight size={16} />
                </ChromeBtn>
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden">
                {tabs.map((t, i) => {
                    const Icon = VIEW_ICON[t]
                    const on = i === active
                    return (
                        <div
                            key={i}
                            onClick={() => open(i)}
                            onAuxClick={(e) => { if (e.button === 1) close(i) }}
                            className={cn(
                                // pr-7 — место под кнопку закрытия: она абсолютная, иначе подпись
                                // прыгала бы на ширину крестика при каждом наведении
                                'app-no-drag group relative flex h-7 min-w-0 max-w-64 flex-1 basis-52 cursor-default items-center gap-1.5 rounded-lg pr-7 pl-2.5 text-[12.5px] transition-colors',
                                on
                                    ? 'bg-tab-active text-foreground'
                                    : 'bg-tab-inactive text-muted-foreground hover:bg-tab-active hover:text-foreground',
                            )}
                        >
                            {Icon && <Icon size={14} className="shrink-0" />}
                            <span className="truncate">{VIEW_LABEL[t]}</span>
                            <button
                                onClick={(e) => { e.stopPropagation(); close(i) }}
                                title="Закрыть вкладку"
                                className="absolute top-1/2 right-1 flex size-5 -translate-y-1/2 items-center justify-center rounded text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-accent hover:text-foreground"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    )
                })}
                <button
                    onClick={add}
                    title="Новая вкладка"
                    className="app-no-drag flex size-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent"
                >
                    <Plus size={15} />
                </button>
            </div>
        </div>
    )
}
