import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeModel } from 'src/app/core/employee.model';
import { EmployeeService } from 'src/app/core/employee.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public roles = [
    {label: 'Admin', value: 'Admin'},
    {label: 'Manager', value: 'Manager'},
    {label: 'HR', value: 'HR'},
    {label: 'Developer', value: 'Developer'},
  ];
  public employeeForm!: FormGroup;
  public currentLimit = 0;
  public popupMode: string|null = null;
  private phoneArrayLimit = 10;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      address: this.fb.control('', [Validators.required]),
      dob: this.fb.control('', [Validators.required]),
      gender: this.fb.control('', [Validators.required]),
      role: this.fb.control('', [Validators.required]),
      phone: this.fb.array([])
    });
    this.addPhone();
  }

  addPhone() {
    if (this.currentLimit >= this.phoneArrayLimit) {
      alert('Maximum phone numbers added');
      return;
    }
    const phones = this.employeeForm.controls['phone'] as FormArray;
    phones.push(this.fb.control('', Validators.required));
    this.currentLimit ++;
  }

  removePhone(i:number) {
    if (this.currentLimit <= 1) {
      alert('Minimum one phone number needed');
      return;
    }
    const phones = this.employeeForm.controls['phone'] as FormArray;
    phones.removeAt(i);
    this.currentLimit --;
  }

  get phones() : FormArray {
    return this.employeeForm.get("phone") as FormArray
  }

  formSubmit() {
    console.log(this.employeeForm.value);
    if (this.employeeForm.invalid) {
      this.popupMode = 'validation';
      Object.keys(this.employeeForm.controls).forEach(key => {
        const controlErrors: ValidationErrors | null | undefined = this.employeeForm.get(key)?.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
           console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
      console.log(this.employeeForm.errors);
      return;
    }
    const employeeDetails: EmployeeModel = {
      name: this.employeeForm.value['name'],
      address: this.employeeForm.value['address'],
      dob: this.employeeForm.value['dob'],
      gender: this.employeeForm.value['gender'],
      role: this.employeeForm.value['role'],
      phone: this.employeeForm.value['phone']
    }
    this.employeeService.saveEmployee(employeeDetails);
    this.popupMode='success';
  }

  goToListing() {
    this.router.navigate(['list'])
  }

  addAnother() {
    this.employeeForm.reset();
    this.popupMode = null;
  }

}
