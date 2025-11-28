export function spn(processes, startTimeApp = 0) {
  const procs = processes.map((p) => ({ ...p }));
  const ready = [];
  const remaining = [...procs];
  const gantt = [];

  let time = startTimeApp;

  while (ready.length > 0 || remaining.length > 0) {
    remaining
      .filter((p) => p.arrival <= time)
      .forEach((p) => {
        ready.push(p);
        remaining.splice(remaining.indexOf(p), 1);
      });

    if (ready.length === 0) {
      time = Math.max(time, Math.min(...remaining.map((r) => r.arrival)));
      continue;
    }

    ready.sort((a, b) => a.burst - b.burst);

    const p = ready.shift();
    const start = time;
    const end = time + p.burst;

    gantt.push({ process: p.name, start, end });
    time = end;
  }

  const table = procs.map((p) => {
    const segs = gantt.filter((g) => g.process === p.name);
    segs.sort((a, b) => a.start - b.start);

    const startTime = segs[0].start;
    const finish = segs[segs.length - 1].end;

    return {
      process: p.name,
      arrival: p.arrival,
      burst: p.burst,
      startTime,
      waiting: startTime - p.arrival,
      tat: finish - p.arrival,
      finish,
    };
  });

  return {
    gantt,
    table,
    avgWaiting: table.reduce((s, r) => s + r.waiting, 0) / table.length,
    avgTat: table.reduce((s, r) => s + r.tat, 0) / table.length,
  };
}
