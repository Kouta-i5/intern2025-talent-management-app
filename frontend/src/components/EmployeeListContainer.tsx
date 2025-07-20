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

export function EmployeeListContainer({ filterText, onSelectedEmployeesChange, onResetSelection }: EmployeesContainerProps) {
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(new Set());
  
  const encodedFilterText = encodeURIComponent(filterText);
  const { data, error, isLoading } = useSWR<Employee[], Error>(
    `/api/employees?filterText=${encodedFilterText}`,
    employeesFetcher
  );

  useEffect(() => {
    if (error != null) {
      console.error(`Failed to fetch employees filtered by filterText`, error);
    }
  }, [error, filterText]);

  // 選択された社員の情報を親コンポーネントに送信
  useEffect(() => {
    if (data && onSelectedEmployeesChange) {
      const selected = data.filter(employee => selectedEmployees.has(employee.id));
      onSelectedEmployeesChange(selected);
    }
  }, [data, selectedEmployees, onSelectedEmployeesChange]);

  const handleEmployeeCheck = (employeeId: string, checked: boolean) => {
    setSelectedEmployees(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(employeeId);
      } else {
        newSet.delete(employeeId);
      }
      return newSet;
    });
  };

  // 外部からリセットされた場合の処理
  useEffect(() => {
    if (onResetSelection) {
      const resetHandler = () => {
        setSelectedEmployees(new Set());
      };
      // グローバルイベントリスナーとして登録（簡易実装）
      window.addEventListener('reset-selection', resetHandler);
      return () => {
        window.removeEventListener('reset-selection', resetHandler);
      };
    }
  }, [onResetSelection]);

  if (data != null) {
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
