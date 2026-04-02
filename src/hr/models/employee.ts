import type { BaseResource } from '../../common/models';

export interface Employee extends BaseResource {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position?: string;
  departmentId?: string;
  departmentName?: string;
  hireDate: string;
  terminationDate?: string;
  status: string;
  statusLabel: string;
  statusColor: string;
  employeeNumber?: string;
  nationalId?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  city?: string;
  country?: string;
  salary?: number;
  currency?: string;
  managerId?: string;
  managerName?: string;
}

export interface CreateEmployeeRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position?: string;
  departmentId?: string;
  hireDate?: string;
  employeeNumber?: string;
  nationalId?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  city?: string;
  country?: string;
  salary?: number;
  currency?: string;
  managerId?: string;
}

export interface UpdateEmployeeRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  position?: string;
  departmentId?: string;
  hireDate?: string;
  terminationDate?: string;
  employeeNumber?: string;
  nationalId?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  city?: string;
  country?: string;
  salary?: number;
  currency?: string;
  managerId?: string;
}
