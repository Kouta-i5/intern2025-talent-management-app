"use client";
import { Paper, TextField } from "@mui/material";
import { useState } from "react";
import { EmployeeListContainer } from "./EmployeeListContainer";
import { Employee } from "../models/Employee";

export type SearchEmployeesProps = {
  onSelectedEmployeesChange?: (selectedEmployees: Employee[]) => void;
  onResetSelection?: () => void;
};

export function SearchEmployees({ onSelectedEmployeesChange, onResetSelection }: SearchEmployeesProps) {
  const [searchKeyword, setSearchKeyword] = useState("");
  
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        flex: 1,
        p: 2,
      }}
    >
      <TextField
        placeholder="検索キーワードを入力してください"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <EmployeeListContainer
        key="employeesContainer"
        filterText={searchKeyword}
        onSelectedEmployeesChange={onSelectedEmployeesChange}
        onResetSelection={onResetSelection}
      />
    </Paper>
  );
}
