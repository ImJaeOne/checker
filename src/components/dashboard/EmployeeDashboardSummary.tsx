const EmployeeDashboardSummary = () => {
  return (
    <section className="w-full p-6 bg-white rounded-2xl shadow-md grid grid-cols-3 gap-4">
      <article className="bg-gray-50 border rounded-xl p-4 text-center">
        <p className="text-sm text-gray-500 mb-2">내 근무기간</p>
        <p className="text-xl font-bold">2022.01.01 ~ 현재</p>
      </article>

      <article className="bg-gray-50 border rounded-xl p-4 text-center">
        {/* 신입의 경우 월차 */}
        <p className="text-sm text-gray-500 mb-2">남은 연차</p>
        <p className="text-xl font-bold ">8일</p>
      </article>

      <article className="bg-gray-50 border rounded-xl p-4 text-center">
        <p className="text-sm text-gray-500 mb-2">직급</p>
        <p className="text-xl font-bold ">주임</p>
      </article>
    </section>
  );
};

export default EmployeeDashboardSummary;
