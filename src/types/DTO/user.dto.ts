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

export type UserDTO = {
  id: number;
  email: string;
  name: string;
  phone: string;
  department_id: number;
  position: string;
  role: UserRole;
  hire_date: string | null;
  work_start_time: string;
  work_end_time: string;
  status: UserStatus;
  created_at: string;
  updated_at: string;
};

export type UserSignUpDTO = Pick<
  UserDTO,
  'email' | 'name' | 'department_id' | 'phone' | 'position'
> & { password: string };

export type UserSignInDTO = Pick<UserDTO, 'email'> & { password: string };
