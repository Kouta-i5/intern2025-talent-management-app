"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import * as t from "io-ts";
import { isLeft } from "fp-ts/Either";
import { EmployeeListItem } from "./EmployeeListItem";
import { Employee, EmployeeT } from "../models/Employee";

export type EmployeesContainerProps = {
  filterText: string;
  onSelectedEmployeesChange?: (selectedEmployees: Employee[]) => void;
  onResetSelection?: () => void;
  filterDepartment?: string;
  filterSkill?: string;
  sortKey?: string;
};

const EmployeesT = t.array(EmployeeT);

const employeesFetcher = async (url: string): Promise<Employee[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch employees at ${url}`);
  }
  const body = await response.json();
  const decoded = EmployeesT.decode(body);
  if (isLeft(decoded)) {
    throw new Error(`Failed to decode employees ${JSON.stringify(body)}`);
  }
  return decoded.right;
};

export function EmployeeListContainer({
  filterText,
  onSelectedEmployeesChange,
  onResetSelection,
  filterDepartment,
  filterSkill,
  sortKey
}: EmployeesContainerProps) {
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(new Set());

  const params = new URLSearchParams();
  if (filterText) params.append('filterText', filterText);
  if (filterDepartment) params.append('filterDepartment', filterDepartment);
  if (filterSkill) params.append('filterSkill', filterSkill);

  const queryString = params.toString();

  const { data, error, isLoading } = useSWR<Employee[], Error>(
    `/api/employees?${queryString}`,
    employeesFetcher
  );

  // エラー共通ログ
  useEffect(() => {
    if (error != null) {
      console.error('Failed to fetch employees', error);
    }
  }, [error, filterText, filterDepartment, filterSkill]);

  // 選択された社員を親へ送信
  useEffect(() => {
    if (data && onSelectedEmployeesChange) {
      const selected = data.filter(employee => selectedEmployees.has(employee.id));
      onSelectedEmployeesChange(selected);
    }
  }, [data, selectedEmployees, onSelectedEmployeesChange]);

  // チェック状態の更新
  const handleEmployeeCheck = (employeeId: string, checked: boolean) => {
    setSelectedEmployees(prev => {
      const newSet = new Set(prev);
      checked ? newSet.add(employeeId) : newSet.delete(employeeId);
      return newSet;
    });
  };

  // 選択状態リセット用イベントハンドラ
  useEffect(() => {
    if (onResetSelection) {
      const resetHandler = () => {
        setSelectedEmployees(new Set());
      };
      window.addEventListener('reset-selection', resetHandler);
      return () => {
        window.removeEventListener('reset-selection', resetHandler);
      };
    }
  }, [onResetSelection]);
  if (data != null) {
    if (sortKey) {
      const [key, order] = sortKey.split('_');
      data.sort((a, b) => {
        if (key === 'name') {
          return order === 'asc' ? a.name.localeCompare(b.name, 'ja') : b.name.localeCompare(a.name, 'ja');
        } else if (key === 'age') {
          return order === 'asc' ? a.age - b.age : b.age - a.age;
        } else if (key === 'hireYear') {
          return order === 'asc' ? b.hireYear - a.hireYear : a.hireYear - b.hireYear;
          // 入社年数が昇順の場合、入社年は降順
        }
        return 0;
      });
    }
    return data.map((employee) => (
      <EmployeeListItem 
        employee={employee} 
        key={employee.id}
        checked={selectedEmployees.has(employee.id)}
        onCheckChange={handleEmployeeCheck}
      />
    ));
  }
  if (isLoading) {
    return <p>Loading employees...</p>;
  }
}
