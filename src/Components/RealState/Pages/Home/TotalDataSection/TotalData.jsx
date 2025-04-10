export default function TotalData() {
  return (
    <>
      <div className="rounded-md bg-white shadow-md">
        <div>
          <div className="overflow-hidden rounded-lg bg-white">
            <table className="w-full border-collapse text-center">
              <thead className="bg-cyan-100 !shadow-md">
                <tr className="!rounded-t-lg">
                  <th className="px-4 py-4 font-bold">Total In</th>
                  <th className="px-4 py-4 font-bold">Total Not In</th>
                  <th className="px-4 py-4 font-bold">Total On Leave</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-4 py-7 font-semibold">10</td>
                  <td className="px-4 py-7 font-semibold">5</td>
                  <td className="px-4 py-7 font-semibold">3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
