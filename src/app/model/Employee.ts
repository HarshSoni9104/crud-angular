export class EmployeeDetails{
    empId: number
    name: string
    city : string
    state: string
    email:string
    contact: string
    address: string
    pinCode: string

    constructor(){
        this.address = ''
        this.contact = ''
        this.email = ''
        this.state = ''
        this.city = ''
        this.name = ''
        this.empId = 1
        this.pinCode = ''
    }
}