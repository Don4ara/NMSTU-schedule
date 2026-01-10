import { Sun, Moon } from "lucide-react"
import { SidebarMenuButton } from "@/shared/components/ui/sidebar"
import { useTheme } from "@/app/provider/theme-provider"

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <SidebarMenuButton
            onClick={toggleTheme}
            tooltip={theme === "dark" ? "Светлая тема" : "Темная тема"}
        >
            {theme === "dark" ? <Sun /> : <Moon />}
            <span>{theme === "dark" ? "Светлая тема" : "Темная тема"}</span>
        </SidebarMenuButton>
    );
}
