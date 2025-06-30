const AdminDashboardSummary = () => {
  return (
    <section className="w-full p-6 bg-white rounded-2xl shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <ul className="flex gap-4 text-sm text-gray-700 font-medium">
          <li>
            직원 수 <span className="font-semibold text-black">100명</span>
          </li>
          <li>
            금일 지각자 <span className="font-semibold text-black">3명</span>
          </li>
          <li>
            금일 휴무자 <span className="font-semibold text-black">3명</span>
          </li>
          <li>
            금일 근무자 <span className="font-semibold text-black">97명</span>
          </li>
        </ul>
        <div className="text-sm text-gray-500 flex items-center gap-3">
          <span>2025.06.30 / 14:30:30</span>
          <button className="text-blue-600 cursor-pointer">새로고침</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <article className="bg-gray-50 border rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">출근 등록 대상자</p>
          <p className="text-xl font-bold">100명</p>
        </article>
        <article className="bg-gray-50 border rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">출근 등록자</p>
          <p className="text-xl font-bold">97명</p>
        </article>
        <article className="bg-gray-50 border rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">금일 휴가</p>
          <p className="text-xl font-bold">3명</p>
        </article>
        <article className="bg-gray-50 border rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">익일 휴가</p>
          <p className="text-xl font-bold">1명</p>
        </article>
      </div>
    </section>
  );
};

export default AdminDashboardSummary;
