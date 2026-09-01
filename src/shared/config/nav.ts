import { Calendar, CalendarRange, GitCompare, LayoutDashboard, Settings, type LucideIcon } from "lucide-react"

/** Разделы в сайдбаре и во вкладках. Раньше список жил копией в app-sidebar. */
export const NAV_ITEMS: { path: string; title: string; icon: LucideIcon }[] = [
    { path: "/", title: "Главная", icon: LayoutDashboard },
    { path: "/schedule", title: "Расписание", icon: CalendarRange },
    { path: "/calendar", title: "Календарь", icon: Calendar },
    { path: "/comparison", title: "Сравнение", icon: GitCompare },
]

/** Подписи всех маршрутов, включая те, которых нет в сайдбаре. */
export const VIEW_LABEL: Record<string, string> = {
    ...Object.fromEntries(NAV_ITEMS.map((i) => [i.path, i.title])),
    "/settings": "Настройки",
}

export const VIEW_ICON: Record<string, LucideIcon> = {
    ...Object.fromEntries(NAV_ITEMS.map((i) => [i.path, i.icon])),
    "/settings": Settings,
}

export const DEFAULT_VIEW = "/"
