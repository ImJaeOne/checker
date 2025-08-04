const TableLoadingMessage = () => {
  return (
    <div className="border rounded-lg">
      <div className="flex flex-col items-center justify-center px-8 py-16">
        <div className="w-12 h-12 mb-4 border-b-2 border-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-600">휴가 신청 목록을 불러오는 중입니다...</p>
      </div>
    </div>
  );
};

export default TableLoadingMessage;
