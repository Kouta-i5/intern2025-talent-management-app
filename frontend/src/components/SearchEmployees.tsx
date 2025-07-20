"use client";
import { Paper, TextField, Select, MenuItem, Box, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";
import { EmployeeListContainer } from "./EmployeeListContainer";
import { DepartmentT, SkillT } from "../models/Employee";

export function SearchEmployees() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [searchSkill, setSearchSkill] = useState("");
  const departmentLabels = DepartmentT.types.map(codec => codec.value);
  const skillLabels = SkillT.types.map(codec => codec.value);

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
      <Box sx={{ display: "flex", gap: 2 }}>
        <FormControl fullWidth>
        <InputLabel id="department-select-label">所属部署を選択してください</InputLabel>
          <Select
            labelId="department-select-label"
            id="department"
            value={searchDepartment}
            onChange={(e) => setSearchDepartment(e.target.value)}
          >
            <MenuItem value="">未選択</MenuItem>
            {departmentLabels.map(label => (
              <MenuItem key={label} value={label || ''}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
        <InputLabel id="skill-select-label">スキルを選択してください</InputLabel>
          <Select
            labelId="skill-select-label"
            id="skill"
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
          >
            <MenuItem value="">未選択</MenuItem>
            {skillLabels.map(label => (
              <MenuItem key={label} value={label || ''}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <EmployeeListContainer
        key="employeesContainer"
        filterText={searchKeyword}
        filterDepartment={searchDepartment}
        filterSkill={searchSkill}
      />
    </Paper>
  );
}
