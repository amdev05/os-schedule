import { useState } from "react";
import InputForm from "./components/InputForm";
import GanttChart from "./components/GanttChart";
import ProcessTable from "./components/ProcessTable";

import { fcfs } from "./algorithms/fcfs";
import { spn } from "./algorithms/spn";
import { srt } from "./algorithms/srt";
import { rr } from "./algorithms/rr";

export default function App() {
  const [processes, setProcesses] = useState([
    { name: "A", arrival: 0, burst: 7 },
    { name: "B", arrival: 2, burst: 4 },
    { name: "C", arrival: 4, burst: 1 },
    { name: "D", arrival: 5, burst: 4 },
    { name: "E", arrival: 6, burst: 6 },
  ]);

  const [algo, setAlgo] = useState("FCFS");
  const [quantum, setQuantum] = useState(1);
  const [result, setResult] = useState(null);

  const run = () => {
    let out = null;

    if (algo === "FCFS") out = fcfs(processes);
    if (algo === "SPN") out = spn(processes);
    if (algo === "SRT") out = srt(processes);
    if (algo === "RR") out = rr(processes, quantum);

    setResult(out);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-light">
      <h1 className="text-3xl font-bold mb-4">Simulasi Penjadwalan CPU</h1>

      {/* Algorithm Selector */}
      <div className="mb-6">
        <label className="font-semibold">Pilih Algoritma:</label>
        <select className="ml-3 p-2 border rounded cursor-pointer" value={algo} onChange={(e) => setAlgo(e.target.value)}>
          <option value="FCFS">First Come First Served (FCFS)</option>
          <option value="SPN">Shortest Process Next (SPN)</option>
          <option value="SRT">Shortest Remaining Time (SRT)</option>
          <option value="RR">Round Robin</option>
        </select>

        {algo === "RR" && <input type="number" min="1" value={quantum} onChange={(e) => setQuantum(Number(e.target.value))} className="ml-4 p-2 w-24 border rounded" placeholder="Quantum" />}

        <button onClick={run} className="ml-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
          Run
        </button>
      </div>

      <InputForm processes={processes} setProcesses={setProcesses} />

      {result && (
        <div className="mt-6">
          <GanttChart gantt={result.gantt} processes={processes} />

          <ProcessTable table={result.table} />

          <div className="mt-4 font-semibold">
            <p>Average Waiting Time: {result.avgWaiting.toFixed(2)}</p>
            <p>Average Turnaround Time: {result.avgTat.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
