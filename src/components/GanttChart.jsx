export default function GanttChart({ gantt, processes }) {
  if (!gantt || gantt.length === 0) return null;

  const start = Math.min(...gantt.map((g) => g.start));
  const end = Math.max(...gantt.map((g) => g.end));
  const total = end - start;

  const rowProcesses = processes.map((p) => p.name);

  return (
    <div className="mt-6 bg-white p-4 lg:p-8 rounded-2xl shadow">
      <h2 className="font-semibold mb-3">Gantt Chart</h2>

      <div className="grid border-b" style={{ gridTemplateColumns: `80px repeat(${total}, 32px)` }}>
        <div></div>
        {[...Array(total)].map((_, i) => (
          <div key={i} className="text-xs">
            {start + i}
          </div>
        ))}
      </div>

      {rowProcesses.map((proc) => {
        const segments = gantt.filter((g) => g.process === proc);

        return (
          <div key={proc} className="grid border-b" style={{ gridTemplateColumns: `80px repeat(${total}, 32px)` }}>
            <div className="font-semibold">{proc}</div>

            {[...Array(total)].map((_, t) => {
              const current = start + t;

              const active = segments.some((s) => current >= s.start && current < s.end);

              return <div key={t} className={`h-6 border ${active ? "bg-cyan-300" : ""}`}></div>;
            })}
          </div>
        );
      })}
    </div>
  );
}
