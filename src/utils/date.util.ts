import { format } from 'date-fns';

/**
 * 두 날짜 사이의 평일(월~금) 개수를 계산합니다.
 *
 * @param startDate - 시작 날짜
 * @param endDate - 종료 날짜
 * @returns 시작일과 종료일 사이에 포함된 평일(월~금)의 총 개수
 *
 * @example
 * calculateWeekdays(new Date('2025-07-01'), new Date('2025-07-07')); // 5
 */
export const calculateWeekdays = (startDate: Date, endDate: Date): number => {
  if (!startDate || !endDate) return 0;

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start > end) return 0;

  let weekdays = 0;
  const current = new Date(start);

  while (current <= end) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      weekdays++;
    }
    current.setDate(current.getDate() + 1);
  }

  return weekdays;
};

/**
 * 유효한 날짜 범위인지 검사합니다.
 *
 * @param startDate - 시작 날짜
 * @param endDate - 종료 날짜
 * @returns 시작일이 종료일보다 같거나 이른 경우 true, 그렇지 않으면 false
 *
 * @example
 * isValidDateRange(new Date('2025-07-01'), new Date('2025-07-05')); // true
 * isValidDateRange(new Date('2025-07-10'), new Date('2025-07-01')); // false
 */
export const isValidDateRange = (startDate: Date, endDate: Date): boolean => {
  return startDate && endDate && new Date(startDate) <= new Date(endDate);
};

/**
 * Date 객체를 'yyyy-MM-dd' 형식의 문자열로 변환합니다.
 *
 */
export const formatDateToYMD = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * Date 객체를 'HH:mm:ss' 형식의 문자열로 변환합니다.
 */
export const formatTimeToHMS = (date: Date): string => {
  return format(date, 'HH:mm:ss');
};

/**
 * Date 객체를 'yyyy-MM-dd HH:mm:ss' 형식의 문자열로 변환합니다.
 */
export const formatDateTimeToYMDHMS = (date: Date): string => {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};

/**
 * ISO 문자열을 Date 객체로 변환한 후 'yyyy-MM-dd HH:mm:ss' 형식으로 포맷합니다.
 * 타임스탬프 문자열을 직접 받아서 처리하는 헬퍼 함수입니다.
 */
export const formatISOStringToYMDHMS = (isoString: string): string => {
  if (!isoString) return '-';

  const date = new Date(isoString);
  return formatDateTimeToYMDHMS(date);
};
