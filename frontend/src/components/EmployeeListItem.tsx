import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Box, Card, CardContent, Typography, Chip, Checkbox } from "@mui/material";
import { Employee } from "../models/Employee";
import Link from "next/link";
import { useState } from "react";

export type EmployeeListItemProps = {
  employee: Employee;
};

export function EmployeeListItem(prop: EmployeeListItemProps) {
  const [checked, setChecked] = useState(false);
  const employee = prop.employee;

  return (
    <Card
      sx={{
        transition: "background-color 0.2s",
        "&:hover": {
          backgroundColor: "#f0f0f0",
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* 左：社員情報（Linkごと） */}
          <Link
            href={`/employee?id=${employee.id}`}
            style={{ textDecoration: "none", color: "inherit", flex: 1 }}
          >
            <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
              <Avatar sx={{ width: 48, height: 48 }}>
                <PersonIcon sx={{ fontSize: 48 }} />
              </Avatar>
              <Box display="flex" flexDirection="column" gap={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="h6">{employee.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {employee.age}歳
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2" color="text.secondary">
                    所属: {employee.department}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    入社{new Date().getFullYear() - employee.hireYear}年
                  </Typography>
                </Box>
                <Box display="flex" flexWrap="wrap" gap={0.5}>
                  {employee.skills.slice(0, 3).map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                  {employee.skills.length > 3 && (
                    <Chip
                      label={`+${employee.skills.length - 3}`}
                      size="small"
                      color="default"
                      variant="outlined"
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Link>

          {/* 右：チェックボックス */}
          <Checkbox
            checked={checked}
            onChange={() => setChecked(!checked)}
            color="primary"
          />
        </Box>
      </CardContent>
    </Card>
  );
}
