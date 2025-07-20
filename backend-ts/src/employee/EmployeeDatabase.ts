import { Employee } from "./Employee";

export interface EmployeeDatabase {
    getEmployee(id: string): Promise<Employee | undefined>
    getEmployees(filterText: string, filterDepartment: string, filterSkill: string): Promise<Employee[]>
}
