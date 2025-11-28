export default function ProcessTable({ table }) {
  return (
    <div className="mt-6 bg-white p-4 lg:p-8 rounded-2xl shadow">
      <h2 className="font-semibold mb-2">Process Table</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            <th>Process</th>
            <th>Arrival</th>
            <th>Service</th>
            <th>Waiting</th>
            <th>Start</th>
            <th>Finish</th>
            <th>Turnaround</th>
          </tr>
        </thead>

        <tbody>
          {table.map((row) => (
            <tr key={row.process} className="border-t">
              <td className="py-1">{row.process}</td>
              <td>{row.arrival}</td>
              <td>{row.burst}</td>
              <td>{row.waiting}</td>
              <td>{row.startTime}</td>
              <td>{row.finish}</td>
              <td>{row.tat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
