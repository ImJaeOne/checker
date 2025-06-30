export const USER_ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
  MANAGER: 'manager',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];

type User = {
  id: number;
  email: string | null;
  password: string | null;
  name: string | null;
  phone: string | null;
  employee_number: string | null;
  department_id: number | null;
  position: string | null;
  role: UserRole;
  hire_date: string | null;
  work_start_time: string;
  work_end_time: string;
  status: UserStatus;
  created_at: string;
  updated_at: string;
};

// [1] admin-active [2] employee-inactive
export const mockUsers: User[] = [
  {
    id: 1,
    email: 'hong.gildong@example.com',
    password: 'hashed-password-1',
    name: '홍길동',
    phone: '010-1234-5678',
    employee_number: 'EMP001',
    department_id: 101,
    position: 'Frontend Developer',
    role: 'employee',
    hire_date: '2021-06-01',
    work_start_time: '09:00:00',
    work_end_time: '18:00:00',
    status: 'inactive',
    created_at: '2023-01-01T09:00:00+09:00',
    updated_at: '2023-01-01T09:00:00+09:00',
  },
  {
    id: 2,
    email: 'kim.chulsu@example.com',
    password: 'hashed-password-2',
    name: '김철수',
    phone: '010-2345-6789',
    employee_number: 'EMP002',
    department_id: 1,
    position: 'Backend Developer',
    role: 'admin',
    hire_date: '2022-03-15',
    work_start_time: '09:00:00',
    work_end_time: '18:00:00',
    status: 'active',
    created_at: '2023-01-05T09:00:00+09:00',
    updated_at: '2023-01-05T09:00:00+09:00',
  },
];
