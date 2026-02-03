<div align="center">
  <img src="public/Icon_app.png" alt="NMSTU-Planer Icon" width="128" height="128" style="border-radius: 22%; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

  # NMSTU-Planer

  **Современное десктопное приложение расписания для студентов и преподавателей МГТУ им. Г.И. Носова.**
  
  Создано с упором на производительность, эстетику и работу без интернета.

  [![Version](https://img.shields.io/badge/version-1.6.0-brightgreen)](https://github.com/Don4ara/NMSTU-schedule/releases)
  [![Electron](https://img.shields.io/badge/Electron-30-blue?logo=electron)](https://www.electronjs.org/)
  [![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)

</div>

---

## ✨ Ключевые особенности

### 🚀 Производительность
- **Мгновенная сборка** — Vite собирает проект за ~3.5 секунды
- **Web Workers** — тяжёлые вычисления календаря выполняются в фоне
- **React.memo & useMemo** — оптимизированный рендеринг без лишних перерисовок
- **Многоуровневый кэш** — API кешируется на 15 минут + in-memory cache в main process

### 📅 Расписание
- **Умное определение недели** — автоматически определяет чётную/нечётную неделю
- **Просмотр по группам и преподавателям** — быстрый поиск по базе университета
- **Сравнение расписаний** — два расписания бок о бок для планирования
- **Подсветка текущих пар** — визуальное выделение активных занятий

### 📆 Календарь
- **Годовой обзор** — все пары на учебный год в одном месте
- **Статистика** — количество лекций и занятий по месяцам
- **Быстрая навигация** — переключение между месяцами и переход к сегодня

### 🌐 Офлайн-режим
- **Локальный кэш** — расписание хранится в localStorage
- **Автосинхронизация** — обновление при восстановлении интернета
- **Индикатор статуса** — отображение текущего состояния подключения

### 🎨 Интерфейс
- **Тёмная и светлая тема** — адаптация под системные настройки
- **Плавные анимации** — Framer Motion для переходов
- **macOS нативный вид** — скрытый titlebar с интегрированными кнопками

---

## 🛠 Технологический стек

| Категория | Технологии |
|-----------|------------|
| **Фреймворк** | [Electron 30](https://www.electronjs.org/) + [React 18](https://react.dev/) |
| **Язык** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Сборка** | [Vite 5](https://vitejs.dev/) + [Terser](https://terser.org/) |
| **Стилизация** | [TailwindCSS 4](https://tailwindcss.com/) + [LightningCSS](https://lightningcss.dev/) |
| **UI компоненты** | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| **Иконки** | [Lucide React](https://lucide.dev/) |
| **Состояние** | [TanStack Query 5](https://tanstack.com/query) + React Context |
| **Роутинг** | [React Router 7](https://reactrouter.com/) |
| **Анимации** | [Framer Motion 12](https://www.framer.com/motion/) |
| **HTTP** | [Axios](https://axios-http.com/) + [Axios Retry](https://github.com/softonic/axios-retry) |
| **Утилиты** | [date-fns 4](https://date-fns.org/), [clsx](https://github.com/lukeed/clsx), [CVA](https://cva.style/) |
| **Упаковка** | [Electron Builder](https://www.electron.build/) |

---

## 📂 Архитектура (Feature-Sliced Design)

```
src/
├── app/                    # Слой приложения
│   ├── layouts/            # Компоненты макетов (MainLayout)
│   ├── provider/           # Провайдеры контекста (Schedule, Theme)
│   ├── router/             # Конфигурация роутинга
│   └── style/              # Глобальные стили
├── pages/                  # Слой страниц
│   ├── home/               # Главная страница
│   ├── schedule/           # Страница расписания
│   ├── calendar/           # Страница календаря
│   ├── comparison/         # Страница сравнения
│   └── settings/           # Страница настроек
├── widgets/                # Слой виджетов
│   ├── app-sidebar/        # Навигационная панель
│   ├── dashboard/          # Виджет дашборда
│   ├── calendar-viewer/    # Виджет календаря
│   ├── schedule-viewer/    # Виджет расписания
│   └── schedule-comparison/# Виджет сравнения
├── features/               # Слой фич (бизнес-логика)
│   ├── schedule-viewer/    # Логика расписания
│   ├── calendar-viewer/    # Логика календаря
│   ├── search/             # Функционал поиска
│   ├── navigation/         # Управление навигацией
│   ├── theme-switcher/     # Переключение темы
│   └── data-source-info/   # Попап с информацией об источнике
├── entities/               # Слой сущностей
│   └── schedule/           # Доменные модели (Schedule, Event)
├── shared/                 # Общий слой
│   ├── api/                # API клиенты и запросы
│   ├── components/ui/      # UI компоненты (Shadcn UI)
│   ├── lib/                # Утилиты и помощники
│   └── workers/            # Web Workers для вычислений
└── electron/               # Main процесс Electron
```

---

## 🏁 Быстрый старт

### Требования
- Node.js 18+
- npm или yarn

### Установка

```bash
git clone https://github.com/Don4ara/NMSTU-schedule.git
cd NMSTU-schedule
npm install
```

### Разработка

```bash
npm run dev
```

### Сборка

```bash
npm run build
```

Готовые файлы будут в папке `release/1.6.0/`

---

## 📊 Метрики производительности

| Метрика | Значение |
|---------|----------|
| Время сборки | ~3.5 сек |
| Bundle (gzip) | ~210 KB |
| DMG размер | ~90 MB |
| Cold start | < 2 сек |

---

_Сделано с ❤️ для МГТУ им. Г.И. Носова._
