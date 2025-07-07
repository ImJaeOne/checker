/**
 * 입력된 문자열에서 숫자만 추출한 뒤, 전화번호 형식(하이픈 포함)으로 포맷팅합니다.
 *
 * - 숫자 이외의 문자는 모두 제거합니다.
 * - 4자리 미만일 경우: 그대로 반환합니다 (ex. "010" → "010").
 * - 4자리 이상 8자리 미만일 경우: 3-숫자 형식으로 하이픈을 추가합니다 (ex. "010123" → "010-123").
 * - 8자리 이상일 경우: 3-4-숫자 형식으로 하이픈을 추가합니다 (ex. "0101234567" → "010-1234-567").
 *
 * @param input 문자열 형태의 전화번호 입력값 (숫자, 문자, 공백 등 혼합 가능)
 * @returns 하이픈이 포함된 전화번호 문자열
 */
export const formatPhoneNumber = (input: string): string => {
  let value = input.replace(/[^0-9]/g, '');
  if (value.length < 4) {
    return value;
  } else if (value.length < 8) {
    return value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
  } else {
    return value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
  }
};
