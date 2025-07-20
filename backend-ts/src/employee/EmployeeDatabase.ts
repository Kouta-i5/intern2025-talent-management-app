import { Employee } from "./Employee";

export interface EmployeeDatabase {
    getEmployee(id: string): Promise<Employee | undefined>
    addEmployee(employee: Employee): Promise<void>;
    getEmployees(filterText: string, filterDepartment: string, filterSkill: string): Promise<Employee[]>
}
