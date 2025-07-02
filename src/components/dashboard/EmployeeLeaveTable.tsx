const EmployeeLeaveTable = () => {
  const data = [
    {
      date: '2025-07-05',
      type: '월차',
      reason: '개인 사정',
      status: '반려',
    },
    {
      date: '2025-07-03',
      type: '반차',
      reason: '병원 예약',
      status: '대기',
    },
    {
      date: '2025-07-01',
      type: '연차',
      reason: '가족 행사 참석',
      status: '승인',
    },
  ];

  const headers = ['사용 일자', '구분', '사유', '승인 여부'];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">연차 사용 내역</h2>
      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="border px-4 py-2 bg-gray-100 text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="border-t">
              <td className="border px-4 py-2">{item.date}</td>
              <td className="border px-4 py-2">{item.type}</td>
              <td className="border px-4 py-2">{item.reason}</td>
              <td className="border px-4 py-2">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeLeaveTable;
