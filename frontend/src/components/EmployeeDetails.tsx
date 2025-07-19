import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Box, Paper, Tab, Tabs, Typography, Chip, Button } from "@mui/material";
import { Employee } from "../models/Employee";
import { useCallback, useEffect, useState } from "react";
import { pageMetadata } from "../../lib/metadata";
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const tabPanelValue = {
  basicInfo: "基本情報",
  skills: "スキル・資格",
  aspirations: "希望分野",
};

type TabPanelValue = keyof typeof tabPanelValue;

interface TabContentProps {
  value: TabPanelValue;
  selectedValue: TabPanelValue;
  children: React.ReactNode;
}

function TabContent({ value, selectedValue, children }: TabContentProps) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== selectedValue}
      id={`tabpanel-${value}`}
    >
      {children}
    </Box>
  );
}

export type EmployeeDetailsProps = {
  employee: Employee;
};

export function EmployeeDetails(prop: EmployeeDetailsProps) {
  const [selectedTabValue, setSelectedTabValue] =
    useState<TabPanelValue>("basicInfo");
  const employee = prop.employee;

  const handleTabValueChange = useCallback(
    (event: React.SyntheticEvent, newValue: TabPanelValue) => {
      setSelectedTabValue(newValue);
    },
    []
  );

  useEffect(() => {
    const title = pageMetadata.employeeDetailTitleTemplate.replace(
        "{employeeName}",
        employee.name
      );
    document.title = title;
  }, [employee.name]);

  return (
    <Paper sx={{ p: 2 }}>
      <Button
        component={Link}
        href="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }} 
      >
        検索画面に戻る
    </Button>
      <Box
        display={"flex"}
        flexDirection="column"
        alignItems="flex-start"
        gap={1}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          p={2}
          gap={2}
        >
          <Avatar sx={{ width: 128, height: 128 }}>
            <PersonIcon sx={{ fontSize: 128 }} />
          </Avatar>
          <Typography variant="h5">{employee.name}</Typography>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
          <Tabs value={selectedTabValue} onChange={handleTabValueChange}>
            <Tab label={tabPanelValue.basicInfo} value={"basicInfo"} />
            <Tab label={tabPanelValue.skills} value={"skills"} />
            <Tab label={tabPanelValue.aspirations} value={"aspirations"} />
          </Tabs>
        </Box>

        <TabContent value={"basicInfo"} selectedValue={selectedTabValue}>
          <Box p={2} display="flex" flexDirection="column" gap={2}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography><strong>名前：</strong>{employee.name}</Typography>
              <Typography><strong>年齢：</strong>{employee.age}歳</Typography>
              <Typography><strong>性別：</strong>{employee.gender}</Typography>
              <Typography><strong>所属：</strong>{employee.department}</Typography>
              <Typography><strong>入社年数：</strong>{new Date().getFullYear() - employee.hireYear}年</Typography>
            </Box>
          </Box>
        </TabContent>

        <TabContent value={"skills"} selectedValue={selectedTabValue}>
          <Box p={2} display="flex" flexDirection="column" gap={2}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box>
                <Typography variant="subtitle1" gutterBottom><strong>スキル：</strong></Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {employee.skills.map((skill, index) => (
                    <Chip key={index} label={skill} color="primary" variant="outlined" />
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography variant="subtitle1" gutterBottom><strong>資格：</strong></Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {employee.qualifications.map((qualification, index) => (
                    <Chip key={index} label={qualification} color="secondary" variant="outlined" />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </TabContent>

        <TabContent value={"aspirations"} selectedValue={selectedTabValue}>
          <Box p={2} display="flex" flexDirection="column" gap={2}>
            <Box>
              <Typography variant="subtitle1" gutterBottom><strong>希望分野：</strong></Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {employee.aspirations.map((aspiration, index) => (
                  <Chip key={index} label={aspiration} color="success" variant="outlined" />
                ))}
              </Box>
            </Box>
          </Box>
        </TabContent>
      </Box>
    </Paper>
  );
}
