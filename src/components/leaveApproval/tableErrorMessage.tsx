const TableErrorMessage = () => {
  return (
    <div className="border rounded-lg">
      <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
        <div className="mb-4 text-red-500">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-800">
          데이터를 불러올 수 없습니다
        </h3>
        <p className="mb-6 text-gray-600">
          네트워크 연결을 확인하거나 잠시 후 다시 시도해주세요.
        </p>
      </div>
    </div>
  );
};
export default TableErrorMessage;
