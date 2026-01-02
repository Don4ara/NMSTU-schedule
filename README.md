<div align="center">
  <img src="public/Icon_app.png" alt="NMSTU-Schedule Icon" width="128" height="128" style="border-radius: 22%; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

  # NMSTU Schedule Manager

  **Современное десктопное приложение расписания для студентов и преподавателей МГТУ им. Г.И. Носова.**
  
  Создано с упором на производительность, эстетику и работу без интернета.

  [![Electron](https://img.shields.io/badge/Electron-30.0-blue?logo=electron)](https://www.electronjs.org/)
  [![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)

</div>

---

## 🚀 Возможности

- **🎓 Умное расписание**: Просмотр расписания групп и преподавателей с автоматическим определением четности недели.
- **⚡ Быстродействие**: Работает на **Vite** и использует **Web Workers** для плавного интерфейса без зависаний.
- **🎨 Современный UI**: Красивый интерфейс, построенный на **TailwindCSS**, **Radix UI** и анимациях **Framer Motion**.
- **📂 Офлайн-режим**: Расписание кэшируется локально, что позволяет просматривать его без доступа к интернету.
- **📅 Сравнение**: Возможность сравнивать расписания двух разных групп или преподавателей бок о бок.
- **🔍 Быстрый поиск**: Мгновенный поиск по базе университета.
- **📉 Оптимизация**: Ленивая загрузка (Lazy loading) и минимальный размер приложения.

## 🛠 Технологический стек

| Категория | Технологии |
|-----------|------------|
| **Core** | [Electron](https://www.electronjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **Сборка** | [Vite](https://vitejs.dev/) (с агрессивным разделением кода) |
| **Стилизация** | [Tailwind CSS v4](https://tailwindcss.com/), [Clsx](https://github.com/lukeed/clsx), [Tailwind Merge](https://github.com/dcastil/tailwind-merge) |
| **UI Компоненты** | [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/) (Иконки) |
| **Данные** | [TanStack Query](https://tanstack.com/query/latest) (Кэширование/Запросы), React Context |
| **Анимация** | [Framer Motion](https://www.framer.com/motion/) |
| **Упаковка** | [Electron Builder](https://www.electron.build/) |

## 🏁 Начало работы

### Требования
- Node.js (версия 18 или выше)
- npm или yarn

### Установка

1. **Клонируйте репозиторий**
   ```bash
   git clone https://github.com/Don4ara/NMSTU-schedule.git
   cd NMSTU-schedule
   ```

2. **Установите зависимости**
   ```bash
   npm install
   ```

### Разработка

Запуск приложения в режиме разработки с Hot Module Replacement (HMR):

```bash
npm run dev
```

> **Примечание**: В режиме разработки название приложения в доке/панели задач может отображаться как "Electron". Это нормально. Пользовательское название "NMSTU-Schedule" применяется только в скомпилированной версии.

### Сборка (Production)

Для компиляции приложения и создания исполняемого файла (DMG, EXE и т.д.):

```bash
npm run build
```

Готовые файлы будут находиться в папке `release/`.

## 📂 Структура проекта

```bash
src/
├── app/                  # Глобальные провайдеры, роутинг и точка входа
├── processes/            # Сложные процессы (если есть)
├── pages/                # Компоненты страниц (Dashboard, Schedule и т.д.)
├── features/             # Бизнес-фичи (Просмотр календаря, Сетка расписания)
│   ├── calendar-viewer/  # Логика и UI календаря
│   └── schedule-viewer/  # Основная сетка расписания
├── entities/             # Бизнес-сущности (Модели студента, группы, расписания)
├── shared/               # Переиспользуемые компоненты, хуки, API и утилиты
│   ├── api/              # Клиенты API
│   ├── ui/               # UI кит (Кнопки, Инпуты и т.д.)
│   └── workers/          # Web Workers (фоновые вычисления)
└── electron/             # Скрипты Main и Preload процессов Electron
```

---

_Сделано с ❤️ для МГТУ им. Г.И. Носова._
