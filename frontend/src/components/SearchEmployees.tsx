"use client";
import { Paper, TextField, Select, MenuItem, Box, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";
import { EmployeeListContainer } from "./EmployeeListContainer";
import { DepartmentT, SkillT } from "../models/Employee";

export function SearchEmployees() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [searchSkill, setSearchSkill] = useState("");
  const [sortKey, setSortKey] = useState("name_asc");
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
        <FormControl sx={{ minWidth: 300 }}>
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
        <FormControl sx={{ minWidth: 300 }}>
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
        <FormControl sx={{ minWidth: 200, marginLeft: 'auto' }}>
        <InputLabel id="sort-label">並び替え</InputLabel>
          <Select
            labelId="sort-label"
            id="sort"
            label="並び替え"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <MenuItem value="name_asc">名前 (昇順)</MenuItem>
            <MenuItem value="name_desc">名前 (降順)</MenuItem>
            <MenuItem value="age_asc">年齢 (昇順)</MenuItem>
            <MenuItem value="age_desc">年齢 (降順)</MenuItem>
            <MenuItem value="hireYear_asc">入社年数 (昇順)</MenuItem>
            <MenuItem value="hireYear_desc">入社年数 (降順)</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <EmployeeListContainer
        key="employeesContainer"
        filterText={searchKeyword}
        filterDepartment={searchDepartment}
        filterSkill={searchSkill}
        sortKey={sortKey}
      />
    </Paper>
  );
}
