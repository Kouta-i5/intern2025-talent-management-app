// frontend/components/EmployeeAddForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gender, Department, Skill, Employee } from "../models/Employee";
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Checkbox, ListItemText, OutlinedInput, Box } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const genders: Gender[] = ["男性", "女性", "その他"];
const departments: Department[] = ["A", "B", "C", "D"];
const skills: Skill[] = ["フロントエンド", "バックエンド", "クラウド", "デザイン", "PM"];

export function EmployeeAddForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<Gender>("男性");
  const [department, setDepartment] = useState<Department>("A");
  const [skillsSelected, setSkillsSelected] = useState<Skill[]>([]);
  const [qualifications, setQualifications] = useState<string>("");
  const [hireYear, setHireYear] = useState<number | "">("");
  const [aspirationsSelected, setAspirationsSelected] = useState<Skill[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !age || !hireYear) {
      alert("名前・年齢・入社年は必須です");
      return;
    }

    const employee: Omit<Employee, "id"> = {
      name,
      age: Number(age),
      gender,
      department,
      skills: skillsSelected,
      qualifications: qualifications.split(",").map(q => q.trim()).filter(Boolean),
      hireYear: Number(hireYear),
      aspirations: aspirationsSelected,
    };

    const res = await fetch("/employee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });

    if (!res.ok) {
      alert("登録に失敗しました" );
      return;
    }

    alert("登録成功！");
    router.back();
  };

  return (
    <>
      <Button
        component={Link}
        href="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        検索画面に戻る
      </Button>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField label="名前" value={name} onChange={e => setName(e.target.value)} required />
      <TextField label="年齢" type="number" value={age} onChange={e => setAge(e.target.value === "" ? "" : Number(e.target.value))} required />
      <FormControl>
        <InputLabel>性別</InputLabel>
        <Select value={gender} onChange={e => setGender(e.target.value as Gender)} label="性別">
          {genders.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>所属</InputLabel>
        <Select value={department} onChange={e => setDepartment(e.target.value as Department)} label="所属">
          {departments.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>スキル</InputLabel>
        <Select
          multiple
          value={skillsSelected}
          onChange={e => setSkillsSelected(typeof e.target.value === "string" ? e.target.value.split(",") as Skill[] : e.target.value)}
          input={<OutlinedInput label="スキル" />}
          renderValue={(selected) => (selected as string[]).join(", ")}
        >
          {skills.map(skill => (
            <MenuItem key={skill} value={skill}>
              <Checkbox checked={skillsSelected.indexOf(skill) > -1} />
              <ListItemText primary={skill} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="資格（カンマ区切り）"
        value={qualifications}
        onChange={e => setQualifications(e.target.value)}
      />
      <TextField
        label="入社年"
        type="number"
        value={hireYear}
        onChange={e => setHireYear(e.target.value === "" ? "" : Number(e.target.value))}
        required
      />
      <FormControl>
        <InputLabel>希望</InputLabel>
        <Select
          multiple
          value={aspirationsSelected}
          onChange={e => setAspirationsSelected(typeof e.target.value === "string" ? e.target.value.split(",") as Skill[] : e.target.value)}
          input={<OutlinedInput label="希望" />}
          renderValue={(selected) => (selected as string[]).join(", ")}
        >
          {skills.map(skill => (
            <MenuItem key={skill} value={skill}>
              <Checkbox checked={aspirationsSelected.indexOf(skill) > -1} />
              <ListItemText primary={skill} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        <Button type="submit" variant="contained" color="primary">社員追加</Button>
      </Box>
    </>
  );
}
