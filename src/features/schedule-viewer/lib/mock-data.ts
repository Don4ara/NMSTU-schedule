export const MOCK_DB = {
    search_results: [
        { id: 1, name: "АБб-14-1", url: "АБб-14-1", type: "group" },
        { id: 2, name: "АБб-14-2", url: "АБб-14-2", type: "group" },
        { id: 3, name: "ИВб-20-1", url: "ИВб-20-1", type: "group" },
        { id: 7, name: "Абрамова Т.В.", url: "Абрамова_ТВ", type: "teacher" },
        { id: 9, name: "Абдулвелеев И.Р.", url: "Абдулвелеев_ИР", type: "teacher" }
    ],
    schedules: {
        "group_2": {
            id: "2",
            name: "АБб-14-2",
            url: "АБб-14-2",
            type: "group",
            schedule: [
                {
                    week_id: 1,
                    week: "Нечетная",
                    days: [
                        {
                            day_id: 1,
                            day: "Понедельник",
                            events: [
                                {
                                    event_index: 2,
                                    course_id: 960,
                                    course: "Управление ИТ-проектами",
                                    type_id: 3,
                                    subgroup: 0,
                                    location: "1-6202к",
                                    type: "лабораторная",
                                    reverse_id: 487,
                                    reverse: "Новикова Т.Б."
                                },
                                {
                                    event_index: 3,
                                    course_id: 961,
                                    course: "Разработка ПО",
                                    type_id: 2,
                                    subgroup: 0,
                                    location: "1-405",
                                    type: "лекция",
                                    reverse_id: 488,
                                    reverse: "Иванов И.И."
                                }
                            ]
                        },
                        {
                            day_id: 2,
                            day: "Вторник",
                            events: []
                        },
                        {
                            day_id: 3,
                            day: "Среда",
                            events: [
                                {
                                    event_index: 1,
                                    course_id: 962,
                                    course: "Философия",
                                    type_id: 1,
                                    subgroup: 0,
                                    location: "2-301",
                                    type: "практика",
                                    reverse_id: 490,
                                    reverse: "Петров П.П."
                                }
                            ]
                        }
                    ]
                },
                {
                    week_id: 2,
                    week: "Четная",
                    days: [
                        {
                            day_id: 1,
                            day: "Понедельник",
                            events: [
                                {
                                    event_index: 1,
                                    course_id: 960,
                                    course: "Управление ИТ-проектами",
                                    type_id: 2,
                                    subgroup: 0,
                                    location: "1-6202к",
                                    type: "лекция",
                                    reverse_id: 487,
                                    reverse: "Новикова Т.Б."
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "teacher_9": {
            id: "9",
            name: "Абдулвелеев И.Р.",
            url: "Абдулвелеев_ИР",
            type: "teacher",
            schedule: [
                {
                    week_id: 1,
                    week: "Нечетная",
                    days: [
                        { day_id: 1, day: "Понедельник", events: [] },
                        {
                            day_id: 2,
                            day: "Вторник",
                            events: [
                                {
                                    event_index: 1,
                                    course_id: 1017,
                                    course: "Математическое моделирование",
                                    type_id: 2,
                                    subgroup: 1,
                                    location: "1-142к",
                                    type: "лекция",
                                    reverse_id: 41,
                                    reverse: "АЭб-14-2"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
};
