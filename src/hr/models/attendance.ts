import type { BaseResource } from '../../common/models';

export interface Attendance extends BaseResource {
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  workedHours?: number;
  overtimeHours?: number;
  status: string;
  statusLabel: string;
  statusColor: string;
  note?: string;
}

export interface CreateAttendanceRequest {
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  note?: string;
}

export interface UpdateAttendanceRequest {
  checkIn?: string;
  checkOut?: string;
  note?: string;
}
