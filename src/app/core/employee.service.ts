import { Injectable } from '@angular/core';
import { EmployeeModel } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  saveEmployee(employeeDetails: EmployeeModel): void {
    const allEmployeeDetails = localStorage.getItem('employeeDetails')
      ? JSON.parse(localStorage.getItem('employeeDetails') as string)
      : [];
    allEmployeeDetails.push(employeeDetails);
    localStorage.setItem('employeeDetails', JSON.stringify(allEmployeeDetails));
  }

  getEmployeeDetails(): EmployeeModel[] {
    const allEmployeeDetails = localStorage.getItem('employeeDetails')
      ? JSON.parse(localStorage.getItem('employeeDetails') as string)
      : [];
    return allEmployeeDetails;
  }
}
