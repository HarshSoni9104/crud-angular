import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeDetails } from './model/Employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  employeeForm !: FormGroup
  employeeObj: EmployeeDetails = new EmployeeDetails()
  employeeList:EmployeeDetails [] = []
    editingEmpId: number | null = null;
  title = 'crudoperation';

  constructor (private formBuilder: FormBuilder){
    const oldData = localStorage.getItem('EmpData')
    if (oldData != null) {
      const parseData = JSON.parse(oldData)
      this.employeeList = parseData
    }
      console.log("emp" , this.employeeList)
  }

ngOnInit(): void {
    this.createForm()

}

  createForm(){
    this.employeeForm = this.formBuilder.group({
      empId:[null],
      name:[null , Validators.required],
      email:[null, Validators.required],
      contact:[null, Validators.required],
      city:[null, Validators.required],
      state:[null, Validators.required],
      address:[null, Validators.required],
      pincode:[null, Validators.required],
    })
  }

  hasError(controlName: string , errorName:string){
    return this.employeeForm.get(controlName)?.hasError(errorName)
  }

  onSave(){
    if (this.employeeForm.valid) {
      const newEmp = { ...this.employeeForm.value };
     newEmp.empId = this.employeeList.length > 0
       ? Math.max(...this.employeeList.map(e => e.empId)) + 1
       : 1;
 
     this.employeeList.unshift(newEmp);
     this.updateStorage();
     this.employeeForm.reset();
    }else{
      console.log("not valid")
    }
  }

  onEdit(emp:EmployeeDetails){
    this.employeeForm.patchValue(emp)
    this.editingEmpId = emp.empId;
    // this.employeeObj = emp
    // this.createForm()
  } 
  
  onUpdate(){
      if (this.editingEmpId == null) return;
          const index = this.employeeList.findIndex(e => e.empId === this.editingEmpId);
      if (index !== -1) {
      this.employeeList[index] = { ...this.employeeForm.value, empId: this.editingEmpId };
      this.updateStorage();
       this.employeeForm.reset();
    this.editingEmpId = null;
    }

  }
  private updateStorage() {
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
  }
  onDelete(empId:number){
    const isDelete = confirm("Are you sure want to Delete");
    if (isDelete) {
      const index = this.employeeList.findIndex(m => m.empId == empId)
      this.employeeList.splice(index , 1)
    this.updateStorage()
    }  
  }
}
