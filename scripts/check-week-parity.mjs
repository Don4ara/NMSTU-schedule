// Проверка чётности недели: календарь (worker) и расписание раньше считали её
// по-разному. Запуск: node scripts/check-week-parity.mjs
import assert from 'node:assert/strict';

const DAY_MS = 24 * 60 * 60 * 1000;
const mondayOf = (date) => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    return d;
};
const getWeekParity = (date, baseYear) => {
    const startYear = baseYear ?? (date.getMonth() < 8 ? date.getFullYear() - 1 : date.getFullYear());
    const start = mondayOf(new Date(startYear, 8, 1));
    const days = Math.round((mondayOf(date).getTime() - start.getTime()) / DAY_MS);
    return (Math.floor(days / 7) + 1) % 2 === 0 ? "Четная" : "Нечетная";
};

// 1 сентября всегда на первой (нечётной) неделе, каким бы днём недели ни было
for (const year of [2024, 2025, 2026, 2027, 2028]) {
    assert.equal(getWeekParity(new Date(year, 8, 1)), "Нечетная", `1 сент ${year}`);
}

// чётность меняется в понедельник и держится всю неделю
const mon = new Date(2025, 8, 8);
for (let i = 0; i < 7; i++) {
    const d = new Date(2025, 8, 8 + i);
    assert.equal(getWeekParity(d), "Четная", d.toDateString());
}
assert.equal(getWeekParity(new Date(2025, 8, 7)), "Нечетная", "воскресенье перед сменой");
assert.equal(getWeekParity(new Date(2025, 8, 15)), "Нечетная", "следующий понедельник");
assert.equal(mondayOf(mon).getTime(), mon.getTime(), "mondayOf понедельника = он сам");

// явный baseYear (путь worker'а) и вывод из даты дают одно и то же
for (const year of [2024, 2026]) {
    for (let i = 0; i < 365; i += 1) {
        const d = new Date(year, 8, 1 + i);
        assert.equal(getWeekParity(d, year), getWeekParity(d), d.toDateString());
    }
}

console.log('week parity: ok');
