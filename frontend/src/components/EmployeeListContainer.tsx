"use client";
import { useEffect } from "react";
import useSWR from "swr";
import * as t from "io-ts";
import { isLeft } from "fp-ts/Either";
import { EmployeeListItem } from "./EmployeeListItem";
import { Employee, EmployeeT } from "../models/Employee";

export type EmployeesContainerProps = {
  filterText: string;
  filterDepartment?: string;
  filterSkill?: string;
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

export function EmployeeListContainer({ filterText, filterDepartment, filterSkill }: EmployeesContainerProps) {
  const params = new URLSearchParams();

  if (filterText) {
    params.append('filterText', filterText);
  }
  if (filterDepartment) {
    params.append('filterDepartment', filterDepartment);
  }
  if (filterSkill) {
    params.append('filterSkill', filterSkill);
  }

  const queryString = params.toString();

  const { data, error, isLoading } = useSWR<Employee[], Error>(
    `/api/employees?${queryString}`,
    employeesFetcher
  );
  useEffect(() => {
    if (error != null) {
      console.error(`Failed to fetch employees filtered by filterText`, error);
    }
  }, [error, filterText]);
  useEffect(() => {
    if (error != null) {
      console.error(`Failed to fetch employees filtered by filterDepartment`, error);
    }
  }, [error, filterDepartment]);
  useEffect(() => {
    if (error != null) {
      console.error(`Failed to fetch employees filtered by filterSkill`, error);
    }
  }, [error, filterSkill]);
  if (data != null) {
    return data.map((employee) => (
      <EmployeeListItem employee={employee} key={employee.id} />
    ));
  }
  if (isLoading) {
    return <p>Loading employees...</p>;
  }
}
