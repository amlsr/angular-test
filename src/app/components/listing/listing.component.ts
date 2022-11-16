import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from 'src/app/core/employee.model';
import { EmployeeService } from 'src/app/core/employee.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  public employeeDetails: EmployeeModel[] = [];

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.employeeDetails = this.employeeService.getEmployeeDetails();
  }

}
