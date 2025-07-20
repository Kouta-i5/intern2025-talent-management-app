// app/employee/add/page.tsx
import { GlobalContainer } from "@/components/GlobalContainer";
import { EmployeeAddForm } from "@/components/EmployeeForm";

export default function AddEmployeePage() {
  return (
    <GlobalContainer>
      <EmployeeAddForm />
    </GlobalContainer>
  );
}
