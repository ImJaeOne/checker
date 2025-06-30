const AdminAttendanceList = () => {
  const data = [
    {
      department: '개발팀',
      name: '홍길동',
      position: '사원',
      date: '2025-06-30',
      leaveType: '연차',
      clockIn: '09:10',
      clockOut: '18:00',
      lateDuration: '10분',
    },
  ];

  const headers = [
    '부서',
    '이름',
    '직급',
    '날짜',
    '휴가/휴직',
    '출근',
    '퇴근',
    '지각 시간',
    '수정/변경',
  ];

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="border border-gray-300 px-4 py-2 text-center"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx} className="text-center hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">
              {item.department}
            </td>
            <td className="border border-gray-300 px-4 py-2">{item.name}</td>
            <td className="border border-gray-300 px-4 py-2">
              {item.position}
            </td>
            <td className="border border-gray-300 px-4 py-2">{item.date}</td>
            <td className="border border-gray-300 px-4 py-2">
              {item.leaveType}
            </td>
            <td className="border border-gray-300 px-4 py-2">{item.clockIn}</td>
            <td className="border border-gray-300 px-4 py-2">
              {item.clockOut}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {item.lateDuration}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <button className="cursor-pointer mr-2">수정</button>
              <button className="cursor-pointer">삭제</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminAttendanceList;
