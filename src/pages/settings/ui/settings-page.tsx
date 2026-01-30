import { useTheme } from "@/app/provider/theme-provider";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";
import { Moon, Sun, Github, Bug, Trash2 } from "lucide-react";

export const SettingsPage = () => {
    const { theme, setTheme } = useTheme();

    const themes = [
        { value: "light", label: "Светлая", icon: Sun },
        { value: "dark", label: "Темная", icon: Moon },
    ] as const;

    return (
        <div className="flex-1 h-full bg-background p-6 overflow-y-auto">
            <div className="max-w-xl mx-auto space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Настройки</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Основные параметры приложения
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {/* Appearance */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="space-y-3"
                    >
                        <Label className="text-base font-medium">Тема</Label>
                        <div className="flex gap-2 p-1 bg-secondary/30 rounded-lg w-fit">
                            {themes.map((t) => {
                                const isActive = theme === t.value;
                                const Icon = t.icon;
                                return (
                                    <button
                                        key={t.value}
                                        onClick={() => setTheme(t.value)}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                                            isActive
                                                ? "bg-background text-foreground shadow-sm"
                                                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                                        )}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{t.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>

                    <Separator />

                    {/* About */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h2 className="text-base font-medium">О приложении</h2>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-secondary/50 p-2 flex items-center justify-center shrink-0">
                                <img src="/Icon_app.png" alt="App Icon" className="w-full h-full object-contain" />
                            </div>
                            <div className="space-y-1">
                                <div className="font-medium text-sm">NMSTU Schedule</div>
                                <div className="text-xs text-muted-foreground flex gap-2">
                                    <span>v1.6.0</span>
                                    <span>•</span>
                                    <span>Stable</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <a
                                href="https://github.com/Don4ara/NMSTU-schedule"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors bg-secondary/30 px-3 py-2 rounded-md hover:bg-secondary/50"
                            >
                                <Github className="w-3.5 h-3.5" />
                                GitHub
                            </a>
                            <a
                                href="https://github.com/Don4ara/NMSTU-schedule/issues"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors bg-secondary/30 px-3 py-2 rounded-md hover:bg-secondary/50"
                            >
                                <Bug className="w-3.5 h-3.5" />
                                Сообщить о баге
                            </a>
                        </div>
                    </motion.div>

                    <Separator />

                    {/* Danger Zone */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="space-y-4"
                    >
                        <h2 className="text-base font-medium text-destructive">Опасная зона</h2>

                        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 space-y-4">
                            <div className="space-y-1">
                                <h3 className="font-medium text-sm">Сброс кеша и данных</h3>
                                <p className="text-xs text-muted-foreground">
                                    Это действие удалит все сохраненные данные, включая настройки и историю поиска.
                                    Приложение будет перезагружено.
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    if (confirm("Вы уверены, что хотите сбросить все данные? Это действие необратимо.")) {
                                        localStorage.clear();
                                        window.location.reload();
                                    }
                                }}
                                className="inline-flex items-center gap-2 text-xs font-medium text-destructive-foreground bg-destructive hover:bg-destructive/90 transition-colors px-4 py-2 rounded-md transition-all shadow-sm"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                Сбросить данные
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
