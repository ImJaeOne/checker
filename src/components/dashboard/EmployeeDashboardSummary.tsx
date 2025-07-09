import type { UserWithPositionDTO } from '@/types/DTO/user.dto';
import { format } from 'date-fns';

type EmployeeDashboardSummaryProps = {
  user: UserWithPositionDTO;
};

const EmployeeDashboardSummary = ({ user }: EmployeeDashboardSummaryProps) => {
  return (
    <section className="w-full p-6 bg-white rounded-2xl shadow-md grid grid-cols-3 gap-4">
      <h2 className="sr-only">일반 직원 대시보드 요약 영역</h2>
      <div className="bg-gray-50 border rounded-xl p-4 text-center">
        <p className="text-sm text-gray-500 mb-2">내 근무기간</p>
        <p className="text-xl font-bold">
          {user.hire_date ? (
            <>
              {format(user.hire_date, 'yyyy.MM.dd')} ~
              {format(new Date(), 'yyyy.MM.dd')}
            </>
          ) : (
            <span className="text-gray-400">입사일 정보 없음</span>
          )}
        </p>
      </div>

      <div className="bg-gray-50 border rounded-xl p-4 text-center">
        {/* 신입의 경우 월차 */}
        <p className="text-sm text-gray-500 mb-2">남은 연차</p>
        <p className="text-xl font-bold ">8일</p>
      </div>

      <div className="bg-gray-50 border rounded-xl p-4 text-center">
        <p className="text-sm text-gray-500 mb-2">직급</p>
        <p className="text-xl font-bold ">{user.positions.name}</p>
      </div>
    </section>
  );
};

export default EmployeeDashboardSummary;
