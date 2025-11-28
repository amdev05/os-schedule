export function rr(processes, quantum = 1, startTimeApp = 0) {
  const procs = processes.map((p) => ({ ...p, remaining: p.burst }));
  procs.sort((a, b) => a.arrival - b.arrival);

  const gantt = [];
  const queue = [];

  let time = startTimeApp;

  while (procs.length > 0 && procs[0].arrival <= time) {
    queue.push(procs.shift());
  }

  if (queue.length === 0 && procs.length > 0) {
    time = procs[0].arrival;
    queue.push(procs.shift());
  }

  while (queue.length > 0) {
    const p = queue.shift();

    const run = Math.min(quantum, p.remaining);
    const start = time;
    const end = time + run;

    gantt.push({ process: p.name, start, end });

    time = end;
    p.remaining -= run;

    while (procs.length > 0 && procs[0].arrival <= time) {
      queue.push(procs.shift());
    }

    if (p.remaining > 0) {
      p.arrival = time; // reschedule
      queue.push(p);
    }

    if (queue.length === 0 && procs.length > 0) {
      time = procs[0].arrival;
      queue.push(procs.shift());
    }
  }

  const table = processes.map((p) => {
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
