export function srt(processes, startTimeApp = 0) {
  const procs = processes.map((p) => ({ ...p, remaining: p.burst }));
  const gantt = [];

  let time = startTimeApp;
  let completed = 0;

  while (completed < procs.length) {
    const ready = procs.filter((p) => p.arrival <= time && p.remaining > 0);

    if (ready.length === 0) {
      time++;
      continue;
    }

    ready.sort((a, b) => a.remaining - b.remaining);
    const cur = ready[0];

    const start = time;
    time++;
    cur.remaining--;

    gantt.push({ process: cur.name, start, end: time });

    if (cur.remaining === 0) completed++;
  }

  // merge adjacent segments
  const merged = [];
  for (const s of gantt) {
    const last = merged[merged.length - 1];
    if (last && last.process === s.process && last.end === s.start) {
      last.end = s.end;
    } else merged.push({ ...s });
  }

  const table = processes.map((p) => {
    const segs = merged.filter((g) => g.process === p.name);
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
    gantt: merged,
    table,
    avgWaiting: table.reduce((s, r) => s + r.waiting, 0) / table.length,
    avgTat: table.reduce((s, r) => s + r.tat, 0) / table.length,
  };
}
