export type LeaveTypesDTO = {
  id: number;
  name: string;
  code: string;
  is_paid: boolean;
  max_days_per_year: number | null;
  description: string;
};
