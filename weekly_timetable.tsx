import { useState } from "react";

const CATS = {
  class:   { label: "Class",     card: "bg-indigo-50 border-indigo-500 text-indigo-900",    block: "bg-indigo-600 text-white",      dot: "bg-indigo-600" },
  work:    { label: "Work",      card: "bg-emerald-50 border-emerald-500 text-emerald-900", block: "bg-emerald-600 text-white",     dot: "bg-emerald-600" },
  gym:     { label: "Gym",       card: "bg-rose-50 border-rose-500 text-rose-900",          block: "bg-rose-600 text-white",        dot: "bg-rose-600" },
  study:   { label: "Study",     card: "bg-sky-50 border-sky-500 text-sky-900",             block: "bg-sky-600 text-white",         dot: "bg-sky-600" },
  meal:    { label: "Meals",     card: "bg-amber-50 border-amber-400 text-amber-900",       block: "bg-amber-300 text-amber-900",   dot: "bg-amber-300" },
  chores:  { label: "Chores",    card: "bg-teal-50 border-teal-500 text-teal-900",          block: "bg-teal-600 text-white",        dot: "bg-teal-600" },
  free:    { label: "Free time", card: "bg-violet-50 border-violet-400 text-violet-900",    block: "bg-violet-200 text-violet-900", dot: "bg-violet-200" },
  routine: { label: "Routine",   card: "bg-slate-50 border-slate-300 text-slate-700",       block: "bg-slate-200 text-slate-700",   dot: "bg-slate-200" },
};

const WAKE = ["05:20", "05:35", "routine", "Wake up", "Water, wash up, make bed"];

const WEEK = [
  { day: "Mon", name: "Monday", sleep: "22:00", items: [
    WAKE,
    ["05:35", "07:15", "work", "Work — deep focus", "Hardest task first, phone away"],
    ["07:15", "07:45", "meal", "Breakfast", ""],
    ["07:45", "09:30", "work", "Work", ""],
    ["09:30", "09:55", "routine", "Pack bag · walk to class", ""],
    ["09:55", "12:30", "class", "Organizational Behavior", "广A208 · Tan Dajia, Huang Lei"],
    ["12:30", "13:30", "meal", "Lunch", "Then walk to 广B209"],
    ["13:30", "15:10", "class", "Macroeconomics", "广B209 · Ding Xiaoyi"],
    ["15:10", "15:30", "meal", "Snack · walk back", "Fruit, yogurt or nuts"],
    ["15:30", "17:15", "work", "Work", ""],
    ["17:15", "18:00", "meal", "Dinner", ""],
    ["18:00", "18:30", "free", "Walk / rest", ""],
    ["18:30", "19:45", "study", "Study", "Review OB + Macro notes, homework"],
    ["19:45", "20:15", "study", "Chinese practice", "Vocab & characters before Tuesday's class"],
    ["20:15", "21:15", "free", "Free time", "Hobbies, friends, call family"],
    ["21:15", "21:45", "routine", "Shower · prep for tomorrow", "Pack bag, lay out clothes"],
    ["21:45", "22:00", "routine", "Wind down", "No phone — read or stretch"],
  ]},
  { day: "Tue", name: "Tuesday", sleep: "22:00", items: [
    WAKE,
    ["05:35", "07:15", "work", "Work — deep focus", ""],
    ["07:15", "07:45", "meal", "Breakfast", ""],
    ["07:45", "09:30", "work", "Work", ""],
    ["09:30", "10:00", "meal", "Pre-gym snack · walk to gym", "Banana or toast + water"],
    ["10:00", "12:00", "gym", "Gym", "1–2 h depending on the workout"],
    ["12:00", "13:00", "meal", "Shower · lunch", "Protein-rich: meat, eggs or tofu + rice + veg"],
    ["13:00", "13:30", "routine", "Rest / power nap", "20 min max"],
    ["13:30", "15:30", "work", "Work", ""],
    ["15:30", "15:45", "meal", "Snack break", ""],
    ["15:45", "17:00", "study", "Study", "Probability practice problems"],
    ["17:00", "17:45", "meal", "Dinner", ""],
    ["17:45", "18:30", "study", "Chinese review · walk to 健A107", ""],
    ["18:30", "20:10", "class", "Practical Chinese", "健A107 · Luo Mujun"],
    ["20:10", "21:15", "free", "Walk back · free time", ""],
    ["21:15", "21:45", "routine", "Wash up · prep for tomorrow", ""],
    ["21:45", "22:00", "routine", "Wind down", "No phone — read or stretch"],
  ]},
  { day: "Wed", name: "Wednesday", sleep: "22:00", items: [
    WAKE,
    ["05:35", "07:15", "work", "Work — deep focus", ""],
    ["07:15", "07:45", "meal", "Breakfast", ""],
    ["07:45", "10:00", "work", "Work", ""],
    ["10:00", "10:15", "free", "Break · short walk", ""],
    ["10:15", "12:00", "study", "Study — catch-up", "OB reading, Macro problem sets"],
    ["12:00", "13:00", "meal", "Lunch", ""],
    ["13:00", "13:30", "routine", "Rest / power nap", ""],
    ["13:30", "15:30", "work", "Work", "No classes today — your buffer if work runs over"],
    ["15:30", "16:30", "chores", "Laundry · clean room", ""],
    ["16:30", "17:30", "study", "Study — prep Thursday", "Operations Research + Managing Complexity"],
    ["17:30", "18:15", "meal", "Dinner", ""],
    ["18:15", "19:00", "free", "Evening walk / stretching", "Light recovery between gym days"],
    ["19:00", "19:30", "study", "Chinese practice", ""],
    ["19:30", "21:15", "free", "Free time", "Friends, hobbies, call family"],
    ["21:15", "21:45", "routine", "Shower · prep for tomorrow", ""],
    ["21:45", "22:00", "routine", "Wind down", "No phone — read or stretch"],
  ]},
  { day: "Thu", name: "Thursday", sleep: "22:00", items: [
    WAKE,
    ["05:35", "07:15", "work", "Work — deep focus", ""],
    ["07:15", "07:45", "meal", "Breakfast", ""],
    ["07:45", "09:45", "work", "Work", ""],
    ["09:45", "10:00", "meal", "Pre-gym snack · walk to gym", ""],
    ["10:00", "11:30", "gym", "Gym", "Shorter session (~1–1.5 h) — long class day ahead"],
    ["11:30", "12:15", "meal", "Shower · lunch", "Protein-rich meal"],
    ["12:15", "12:40", "routine", "Rest", ""],
    ["12:40", "13:15", "work", "Work — light tasks", "Emails, messages, admin"],
    ["13:15", "13:30", "routine", "Walk to 广B204", ""],
    ["13:30", "15:10", "class", "Operations Research", "广B204 · Deng Lili"],
    ["15:10", "15:25", "routine", "Walk to 广B409", ""],
    ["15:25", "17:05", "class", "Managing Complexity", "广B409 · Zhang Rui"],
    ["17:05", "17:50", "meal", "Dinner", ""],
    ["17:50", "18:30", "free", "Rest · walk to 健B104", ""],
    ["18:30", "20:10", "class", "National Development Strategy & Macro-Policy", "健B104 · Zhang Rui"],
    ["20:10", "21:15", "free", "Walk back · relax", "Long day — keep it easy"],
    ["21:15", "21:45", "routine", "Wash up · pack for Friday", "Friday is your longest day — prep everything tonight"],
    ["21:45", "22:00", "routine", "Wind down", "No phone — read or stretch"],
  ]},
  { day: "Fri", name: "Friday", sleep: "22:15", items: [
    WAKE,
    ["05:35", "07:15", "work", "Work — deep focus", ""],
    ["07:15", "07:40", "meal", "Breakfast", ""],
    ["07:40", "09:30", "work", "Work", ""],
    ["09:30", "09:55", "routine", "Walk to 广A104", "Bring water bottle + a snack"],
    ["09:55", "12:30", "class", "Probability & Statistics", "广A104 · Yuan Junqing"],
    ["12:30", "13:30", "meal", "Lunch", "Then walk to 广B301"],
    ["13:30", "15:10", "class", "Macroeconomics", "广B301 · Ding Xiaoyi"],
    ["15:10", "15:25", "routine", "Walk to 健A107", ""],
    ["15:25", "17:05", "class", "Practical Chinese", "健A107 · Luo Mujun"],
    ["17:05", "17:45", "meal", "Dinner", ""],
    ["17:45", "18:15", "work", "Work — light tasks", "Emails, messages, admin"],
    ["18:15", "18:30", "routine", "Walk to 博易C108", ""],
    ["18:30", "21:05", "class", "Accounting", "博易C108 · Lin Suyan"],
    ["21:05", "21:30", "meal", "Walk back · light snack", "Yogurt, fruit or milk"],
    ["21:30", "22:00", "routine", "Shower", ""],
    ["22:00", "22:15", "routine", "Wind down", ""],
  ]},
  { day: "Sat", name: "Saturday", sleep: "22:30", items: [
    WAKE,
    ["05:35", "07:15", "work", "Work — deep focus", ""],
    ["07:15", "07:45", "meal", "Breakfast", ""],
    ["07:45", "09:30", "work", "Work", ""],
    ["09:30", "10:00", "meal", "Pre-gym snack · walk to gym", "Banana or toast + water"],
    ["10:00", "12:00", "gym", "Gym", "Your longest session — up to 2 h"],
    ["12:00", "13:00", "meal", "Shower · lunch", "Protein-rich meal"],
    ["13:00", "13:30", "routine", "Rest / power nap", ""],
    ["13:30", "15:30", "work", "Work", ""],
    ["15:30", "17:00", "study", "Study", "Accounting + Probability homework while Friday is fresh"],
    ["17:00", "17:45", "meal", "Dinner", ""],
    ["17:45", "22:00", "free", "Free evening", "Friends, explore Hangzhou, movies"],
    ["22:00", "22:30", "routine", "Wash up · wind down", ""],
  ]},
  { day: "Sun", name: "Sunday", sleep: "22:00", items: [
    WAKE,
    ["05:35", "07:15", "work", "Work — deep focus", ""],
    ["07:15", "07:45", "meal", "Breakfast", ""],
    ["07:45", "10:30", "work", "Work", "Lighter work day — done by 10:30"],
    ["10:30", "12:00", "chores", "Clean room · groceries", "Restock snacks & water for the week"],
    ["12:00", "13:00", "meal", "Lunch", ""],
    ["13:00", "17:00", "free", "Free afternoon", "Rest day — no gym. Go out, meet friends, recharge"],
    ["17:00", "17:45", "meal", "Dinner", ""],
    ["17:45", "19:15", "study", "Study — prep Monday", "OB reading, Macro review"],
    ["19:15", "19:45", "study", "Weekly planning", "Check deadlines, set 3 goals for the week"],
    ["19:45", "21:15", "free", "Free time · call family", ""],
    ["21:15", "21:45", "routine", "Shower · prep for Monday", "Pack bag, lay out clothes"],
    ["21:45", "22:00", "routine", "Wind down", "No phone — read or stretch"],
  ]},
];

const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
const fmt = (mins) => {
  const h = Math.floor(mins / 60), m = mins % 60;
  if (!h) return `${m}m`;
  return m ? `${h}h ${m}m` : `${h}h`;
};
const dur = (it) => toMin(it[1]) - toMin(it[0]);
const sumCat = (d, cat) => d.items.filter((i) => i[2] === cat).reduce((a, i) => a + dur(i), 0);
const sleepLen = (bed) => 24 * 60 - toMin(bed) + toMin("05:20");

const START = 5 * 60, END = 23 * 60, PX = 1.1;

function Stat({ label, value }) {
  return (
    <div className="rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.15)" }}>
      <div className="text-xs opacity-80">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600">
      {Object.entries(CATS).map(([k, c]) => (
        <span key={k} className="inline-flex items-center gap-1">
          <span className={`w-3 h-3 rounded ${c.dot}`} />
          {c.label}
        </span>
      ))}
      <span className="inline-flex items-center gap-1">
        <span className="w-3 h-3 rounded bg-slate-700" />
        Sleep
      </span>
    </div>
  );
}

function WeekView({ onPick }) {
  const hours = [];
  for (let h = 5; h <= 23; h++) hours.push(h);
  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: 820 }}>
        <div className="flex border-b border-gray-200">
          <div style={{ width: 48 }} />
          {WEEK.map((d, i) => (
            <button
              key={d.day}
              onClick={() => onPick(i)}
              className="flex-1 py-2 text-sm font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-t-lg transition-colors"
            >
              {d.day}
            </button>
          ))}
        </div>
        <div style={{ paddingTop: 8, paddingBottom: 8 }}>
          <div className="flex" style={{ height: (END - START) * PX }}>
            <div className="relative" style={{ width: 48 }}>
              {hours.map((h) => (
                <div key={h} className="absolute text-xs text-gray-400 tabular-nums" style={{ top: (h * 60 - START) * PX - 7, right: 6 }}>
                  {String(h).padStart(2, "0")}:00
                </div>
              ))}
            </div>
            {WEEK.map((d, i) => (
              <div key={d.day} className="flex-1 relative border-l border-gray-100 cursor-pointer" onClick={() => onPick(i)}>
                {hours.map((h) => (
                  <div key={h} className="absolute left-0 right-0 border-t border-gray-100" style={{ top: (h * 60 - START) * PX }} />
                ))}
                <div className="absolute rounded-md bg-slate-700" style={{ top: 1, height: (toMin("05:20") - START) * PX - 2, left: 3, right: 3 }} />
                <div
                  className="absolute rounded-md bg-slate-700 text-slate-200 px-1"
                  style={{ top: (toMin(d.sleep) - START) * PX + 1, height: (END - toMin(d.sleep)) * PX - 2, left: 3, right: 3, fontSize: 10, lineHeight: "12px" }}
                >
                  <div className="font-semibold pt-0.5">Sleep {d.sleep}</div>
                </div>
                {d.items.map((it, k) => {
                  const s = toMin(it[0]);
                  const h = dur(it) * PX;
                  const c = CATS[it[2]];
                  return (
                    <div
                      key={k}
                      title={`${it[0]}–${it[1]}  ${it[3]}${it[4] ? " — " + it[4] : ""}`}
                      className={`absolute rounded-md px-1 overflow-hidden ${c.block}`}
                      style={{ top: (s - START) * PX + 1, height: h - 2, left: 3, right: 3, fontSize: 10, lineHeight: "12px" }}
                    >
                      {h >= 14 && <div className={`font-semibold ${h >= 60 ? "" : "truncate"}`} style={{ paddingTop: h >= 30 ? 2 : 0 }}>{it[3]}</div>}
                      {h >= 60 && it[2] === "class" && <div className="opacity-90 truncate">{it[4].split(" · ")[0]}</div>}
                      {h >= 34 && <div className="opacity-75 truncate tabular-nums">{it[0]}–{it[1]}</div>}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">Tap any day for the full detailed schedule.</p>
    </div>
  );
}

function Chip({ className, children }) {
  return <span className={`px-2 py-1 rounded-full font-medium ${className}`}>{children}</span>;
}

function DayView({ idx, setIdx }) {
  const d = WEEK[idx];
  const cls = sumCat(d, "class"), work = sumCat(d, "work"), gym = sumCat(d, "gym"), study = sumCat(d, "study");
  return (
    <div>
      <div className="flex gap-1 overflow-x-auto pb-1">
        {WEEK.map((w, i) => (
          <button
            key={w.day}
            onClick={() => setIdx(i)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${i === idx ? "bg-indigo-600 text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            {w.day}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between mt-4 mb-4 gap-2">
        <h2 className="text-2xl font-bold text-gray-900">{d.name}</h2>
        <div className="flex flex-wrap gap-2 text-xs">
          {cls > 0 && <Chip className="bg-indigo-100 text-indigo-800">Classes {fmt(cls)}</Chip>}
          <Chip className="bg-emerald-100 text-emerald-800">Work {fmt(work)}</Chip>
          {gym > 0 && <Chip className="bg-rose-100 text-rose-800">Gym</Chip>}
          {study > 0 && <Chip className="bg-sky-100 text-sky-800">Study {fmt(study)}</Chip>}
          <Chip className="bg-slate-200 text-slate-800">Sleep {fmt(sleepLen(d.sleep))}</Chip>
        </div>
      </div>
      <div className="space-y-2">
        {d.items.map((it, k) => {
          const c = CATS[it[2]];
          return (
            <div key={k} className="flex gap-3">
              <div className="w-24 flex-shrink-0 text-xs text-gray-500 pt-2.5 tabular-nums">{it[0]} – {it[1]}</div>
              <div className={`flex-1 border-l-4 rounded-r-lg px-3 py-2 ${c.card}`}>
                <div className="flex justify-between gap-2">
                  <span className="font-semibold text-sm">{it[3]}</span>
                  <span className="text-xs opacity-60 flex-shrink-0">{fmt(dur(it))}</span>
                </div>
                {it[4] && <div className="text-xs opacity-80 mt-0.5">{it[4]}</div>}
              </div>
            </div>
          );
        })}
        <div className="flex gap-3">
          <div className="w-24 flex-shrink-0 text-xs text-gray-500 pt-2.5 tabular-nums">{d.sleep}</div>
          <div className="flex-1 rounded-lg px-3 py-2 bg-slate-700 text-slate-100">
            <div className="font-semibold text-sm">Sleep</div>
            <div className="text-xs opacity-80 mt-0.5">Lights out — {fmt(sleepLen(d.sleep))} until your 05:20 alarm</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkBars() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
      <h3 className="font-semibold text-gray-900 mb-3">
        Work hours per day <span className="text-xs font-normal text-gray-500 ml-1">target 4–6 h · dashed line = 4 h</span>
      </h3>
      <div className="space-y-2">
        {WEEK.map((d) => {
          const w = sumCat(d, "work");
          return (
            <div key={d.day} className="flex items-center gap-2 text-xs">
              <span className="w-8 text-gray-600 font-medium">{d.day}</span>
              <div className="flex-1 h-3 bg-gray-100 rounded-full relative overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, (w / 360) * 100)}%` }} />
                <div className="absolute top-0 bottom-0 border-l-2 border-dashed border-gray-500" style={{ left: `${(240 / 360) * 100}%` }} />
              </div>
              <span className="w-14 text-right text-gray-700 tabular-nums">{fmt(w)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Tips() {
  const tips = [
    ["Friday is your marathon", "Classes run 9:55–21:05. Pack water, snacks and your charger on Thursday night."],
    ["Wednesday is your buffer", "No classes — if work or homework spills over during the week, move it here."],
    ["Gym at 10:00", "If your gym opens at a different time, swap the gym block with a work block — the totals stay the same."],
    ["Protect the 22:00 bedtime", "With a 05:20 alarm, 22:00 gives you 7h 20m. Going past 22:30 drops you under 7 hours."],
    ["Water all day", "Keep a bottle with you, especially on gym days and long class days."],
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Notes</h3>
      <ul className="space-y-2">
        {tips.map(([t, d]) => (
          <li key={t} className="text-sm text-gray-700">
            <span className="font-semibold text-gray-900">{t}.</span> {d}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  const today = (new Date().getDay() + 6) % 7;
  const [view, setView] = useState("week");
  const [idx, setIdx] = useState(today);
  const totalWork = WEEK.reduce((a, d) => a + sumCat(d, "work"), 0);
  const totalClass = WEEK.reduce((a, d) => a + sumCat(d, "class"), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <header className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-5 shadow-lg">
          <div className="text-xs uppercase tracking-wider opacity-80">Fall 2026 · Weeks 1–16 · Pingfeng Campus</div>
          <h1 className="text-2xl sm:text-3xl font-bold mt-1">Kamoliddin's Weekly Timetable</h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <Stat label="Work / week" value={fmt(totalWork)} />
            <Stat label="Classes / week" value={fmt(totalClass)} />
            <Stat label="Gym" value="Tue · Thu · Sat" />
            <Stat label="Wake-up" value="05:20 daily" />
          </div>
        </header>

        <div className="flex items-center justify-between mt-4 mb-3 flex-wrap gap-3">
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-gray-200">
            {["week", "day"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${view === v ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
              >
                {v === "week" ? "Week view" : "Day view"}
              </button>
            ))}
          </div>
          <Legend />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-4">
          {view === "week" ? (
            <WeekView onPick={(i) => { setIdx(i); setView("day"); }} />
          ) : (
            <DayView idx={idx} setIdx={setIdx} />
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <WorkBars />
          <Tips />
        </div>
      </div>
    </div>
  );
}
