"use client";
import { useState, useCallback, useEffect } from "react";
import { SearchEmployees } from "../components/SearchEmployees";
import { GlobalContainer } from "@/components/GlobalContainer";
import { Button, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProjectForm from "../components/ProjectForm";
https://github.com/Kouta-i5/intern2025-talent-management-app/pull/13/conflict?name=frontend%252Fsrc%252Fcomponents%252FEmployeeListContainer.tsx&ancestor_oid=2ccf0e261e81ffbbb2bd436c4e786bf8b10ab48a&base_oid=bb0fc461852f35560702edbe0ee937a8208edf48&head_oid=fe6dfe0e95f30e35352be73acaf1105cf027c09fimport { Employee } from "../models/Employee";
import { pageMetadata } from "../../lib/metadata";
import { Metadata } from "next";
import AddEmployeeButton from "@/components/AddEmployeeButton";


export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
};
export default function Home() {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);

  const handleOpenProjectForm = () => {
    setShowProjectForm(true);
  };

  const handleCloseProjectForm = () => {
    setShowProjectForm(false);
  };

  const handleSelectedEmployeesChange = useCallback((employees: Employee[]) => {
    setSelectedEmployees(employees);
  }, []);

  const handleResetSelection = useCallback(() => {
    setSelectedEmployees([]);
  }, []);

  // 選択された社員が1人以上になった時に自動でプロジェクトフォームを開く
  useEffect(() => {
    if (selectedEmployees.length > 0 && !showProjectForm) {
      setShowProjectForm(true);
    }
  }, [selectedEmployees, showProjectForm]);

  return (
    <GlobalContainer>
      <Box sx={{ position: "relative" }}>
        <Typography variant="body1" textAlign="center" color="text.secondary" mb={2}>
          社員を選択するか、プロジェクトを立案ボタンをクリックして、下側にフォームを表示できます
        </Typography>
        
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenProjectForm}
            sx={{ minWidth: 200 }}
          >
            プロジェクトを立案
          </Button>
        </Box>
        
        {showProjectForm && (
          <Box sx={{ mb: 3 }}>
            <ProjectForm onClose={handleCloseProjectForm} selectedEmployees={selectedEmployees} onResetSelection={handleResetSelection} />
          </Box>
        )}
        
        <SearchEmployees 
          onSelectedEmployeesChange={handleSelectedEmployeesChange} 
          onResetSelection={handleResetSelection}
        />
      </Box>
      <AddEmployeeButton />
      <SearchEmployees />
    </GlobalContainer>
  );
}
