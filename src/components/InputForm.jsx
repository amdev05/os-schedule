import { useState } from "react";

export default function InputForm({ processes, setProcesses }) {
  const [name, setName] = useState("");
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");

  const add = () => {
    if (!name || arrival === "" || burst === "") return;

    if (processes.some((p) => p.name === name)) {
      alert("Nama proses sudah ada");
      return;
    }

    setProcesses([...processes, { name, arrival: Number(arrival), burst: Number(burst) }]);

    setName("");
    setArrival("");
    setBurst("");
  };

  const remove = (name) => {
    setProcesses(processes.filter((p) => p.name !== name));
  };

  return (
    <div className="bg-white p-4 lg:p-8 rounded-2xl shadow">
      <h2 className="font-semibold mb-3">Tabel Input</h2>
      <div className="flex gap-2">
        <input className="border p-2 rounded-lg flex-1" placeholder="Nama Proses" value={name} onChange={(e) => setName(e.target.value)} />

        <input className="border p-2 rounded-lg w-24" placeholder="Arrival" value={arrival} type="number" min="1" onChange={(e) => setArrival(e.target.value)} />

        <input className="border p-2 rounded-lg w-24" placeholder="Service" value={burst} type="number" min="1" onChange={(e) => setBurst(e.target.value)} />

        <button className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer" onClick={add}>
          Tambah
        </button>
      </div>

      <div className="mt-4 ">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th>Process</th>
              <th>Arrival</th>
              <th>Service</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {processes.map((p) => (
              <tr key={p.name} className="border-t">
                <td className="py-1">{p.name}</td>
                <td>{p.arrival}</td>
                <td>{p.burst}</td>
                <td>
                  <button className="text-red-600 cursor-pointer" onClick={() => remove(p.name)}>
                    hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
