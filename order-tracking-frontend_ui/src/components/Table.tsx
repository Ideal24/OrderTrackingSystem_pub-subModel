// src/components/Table.tsx

interface RowData {
  id: string;
  name: string;
  status: string;
  date: string;
}

interface TableProps {
  rows: RowData[];
}

const Table = ({ rows }: TableProps) => {
  return (
    <div className="bg-white rounded shadow overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              ID
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="px-4 py-2">{row.id}</td>
              <td className="px-4 py-2">{row.name}</td>
              <td className="px-4 py-2">{row.status}</td>
              <td className="px-4 py-2">{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
