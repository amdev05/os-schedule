export function fcfs(processes, startTimeApp = 0) {
  const procs = processes.map((p) => ({ ...p }));
  procs.sort((a, b) => a.arrival - b.arrival);

  const gantt = [];
  let time = startTimeApp;

  procs.forEach((p) => {
    const start = Math.max(time, p.arrival);
    const end = start + p.burst;

    gantt.push({ process: p.name, start, end });
    time = end;
  });

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
