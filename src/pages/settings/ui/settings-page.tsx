import { useTheme } from "@/app/provider/theme-provider";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/shared/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import { Moon, Sun, Github, Bug, Trash2, RefreshCw, Download, Rocket, AlertCircle, CheckCircle } from "lucide-react";

export const SettingsPage = () => {
    const { theme, setTheme } = useTheme();

    interface UpdateStatus {
        status: 'idle' | 'checking' | 'available' | 'downloading' | 'downloaded' | 'not-available' | 'dev' | 'error';
        error?: string;
        progress?: { percent: number };
    }

    const [updateStatus, setUpdateStatus] = useState<UpdateStatus>({ status: 'idle' });

    useEffect(() => {
        const handleStatus = (_: Electron.IpcRendererEvent, ...args: unknown[]) => {
            const data = args[0] as UpdateStatus;
            setUpdateStatus(data);
        };
        window.ipcRenderer?.on('update-status', handleStatus);
    }, []);

    const checkForUpdates = () => {
        setUpdateStatus({ status: 'checking' });
        window.ipcRenderer?.invoke('check-for-updates').then((res) => {
            const result = res as { status?: string } | undefined;
            if (result?.status === 'dev') setUpdateStatus({ status: 'dev' });
        }).catch(() => {
            setUpdateStatus({ status: 'error', error: 'Ошибка проверки' });
        });
    };

    const downloadUpdate = () => window.ipcRenderer?.invoke('download-update');
    const quitAndInstall = () => window.ipcRenderer?.invoke('quit-and-install');

    const themes = [
        { value: "light", label: "Светлая", icon: Sun },
        { value: "dark", label: "Темная", icon: Moon },
    ] as const;

    return (
        <div className="flex-1 h-full bg-background p-6 overflow-y-auto">
            <div className="max-w-xl mx-auto space-y-8">

                <h1 className="text-2xl font-bold tracking-tight text-foreground">Настройки</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Основные параметры приложения
                </p>

                <div className="space-y-6">
                    {/* Appearance */}

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

                    <Separator />

                    {/* About */}

                    <h2 className="text-base font-medium">О приложении</h2>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary/50 p-2 flex items-center justify-center shrink-0">
                            <img src="/Icon_app.png" alt="App Icon" className="w-full h-full object-contain" />
                        </div>
                        <div className="space-y-1">
                            <div className="font-medium text-sm">NMSTU Schedule</div>
                            <div className="text-xs text-muted-foreground flex gap-2">
                                <span>{__APP_VERSION__}</span>
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

                </div>

                <Separator />



                {/* Danger Zone */}

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

                <Separator />

                {/* Updates */}

                <h2 className="text-base font-medium">Обновление</h2>
                <div className="text-card-foreground shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1">
                            <h3 className="font-medium text-sm">Версия приложения</h3>
                            <div className="flex items-center gap-2">
                                <p className="text-xs text-muted-foreground">
                                    Текущая версия: <span className="font-mono text-foreground">v{__APP_VERSION__}</span>
                                </p>
                                {updateStatus.status === 'not-available' && (
                                    <span className="text-[10px] bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded-full font-medium ml-1 flex items-center gap-1">
                                        <CheckCircle size={10} />
                                        Актуально
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {updateStatus.status === 'idle' && (
                                <Button variant="outline" size="sm" onClick={checkForUpdates} className="h-8">
                                    <RefreshCw className="mr-2 h-3.5 w-3.5" />
                                    Проверить
                                </Button>
                            )}
                            {updateStatus.status === 'checking' && (
                                <Button variant="outline" size="sm" disabled className="h-8">
                                    <RefreshCw className="mr-2 h-3.5 w-3.5 animate-spin" />
                                    Проверка...
                                </Button>
                            )}
                            {updateStatus.status === 'available' && (
                                <Button size="sm" onClick={downloadUpdate} className="h-8">
                                    <Download className="mr-2 h-3.5 w-3.5" />
                                    Загрузить
                                </Button>
                            )}
                            {updateStatus.status === 'downloading' && (
                                <Button size="sm" disabled className="h-8">
                                    <Download className="mr-2 h-3.5 w-3.5 animate-pulse" />
                                    Загрузка...
                                </Button>
                            )}
                            {updateStatus.status === 'downloaded' && (
                                <Button size="sm" onClick={quitAndInstall} className="h-8">
                                    <Rocket className="mr-2 h-3.5 w-3.5" />
                                    Установить
                                </Button>
                            )}
                            {updateStatus.status === 'not-available' && (
                                <Button variant="ghost" size="icon" onClick={checkForUpdates} className="h-8 w-8 text-muted-foreground">
                                    <RefreshCw className="h-3.5 w-3.5" />
                                </Button>
                            )}
                            {updateStatus.status === 'dev' && (
                                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">Dev Mode</span>
                            )}
                            {updateStatus.status === 'error' && (
                                <Button variant="outline" size="sm" onClick={checkForUpdates} className="h-8 text-destructive hover:text-destructive">
                                    <RefreshCw className="mr-2 h-3.5 w-3.5" />
                                    Повторить
                                </Button>
                            )}
                        </div>
                    </div>

                    {updateStatus.status === 'downloading' && (
                        <div className="space-y-1.5 pt-2">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Загрузка обновления...</span>
                                <span>{Math.round(updateStatus.progress?.percent || 0)}%</span>
                            </div>
                            <Progress value={updateStatus.progress?.percent || 0} className="h-1.5" />
                        </div>
                    )}

                    {updateStatus.status === 'error' && (
                        <div className="text-xs text-destructive flex items-center gap-2 bg-destructive/10 p-2 rounded mt-2">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>Ошибка: {updateStatus.error}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
