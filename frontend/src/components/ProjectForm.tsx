"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Chip,
  Alert,
  Snackbar,
  IconButton,
  Paper
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Employee } from "../models/Employee";

interface ProjectForm {
  name: string;
  description: string;
  teamMembers: string[];
}

interface ProjectFormProps {
  onClose: () => void;
  selectedEmployees?: Employee[];
  onResetSelection?: () => void;
}

export default function ProjectForm({ onClose, selectedEmployees = [], onResetSelection }: ProjectFormProps) {
  const [form, setForm] = useState<ProjectForm>({
    name: "",
    description: "",
    teamMembers: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  // 選択された社員が変更されたら、チームメンバーに自動追加
  useEffect(() => {
    const employeeNames = selectedEmployees.map(emp => emp.name);
    setForm(prev => ({
      ...prev,
      teamMembers: employeeNames
    }));
  }, [selectedEmployees]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      teamMembers: [],
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // プロジェクトデータを準備
      const projectData = {
        ...form,
        teamMembers: form.teamMembers.filter(member => member.trim() !== ""),
      };

      console.log("プロジェクトデータ:", projectData);
      
      // 成功時の処理
      setSnackbar({
        open: true,
        message: "プロジェクトを正常に立案しました！",
        severity: "success",
      });
      resetForm();
      
      // 選択状態もリセット
      if (onResetSelection) {
        onResetSelection();
      }
      
      // グローバルリセットイベントを発火
      window.dispatchEvent(new CustomEvent('reset-selection'));
      
      // 少し遅延してからフォームを閉じる
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (error) {
      setSnackbar({
        open: true,
        message: `エラーが発生しました: ${error instanceof Error ? error.message : "不明なエラー"}`,
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Paper 
        sx={{ 
          width: "100%", 
          p: 3, 
          overflowY: "auto",
          mb: 2
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography 
          variant="h5" 
          fontWeight="bold"
          sx={{
            textAlign: "center",
            width: "100%"
          }}
          >
            プロジェクト立案
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {selectedEmployees.length > 0 && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {selectedEmployees.length}名の社員が選択されました
          </Alert>
        )}
        
        <Box component="form" display="flex" flexDirection="column" gap={2} onSubmit={handleSubmit}>
          <TextField
            label="プロジェクト名"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
          />
          
          <TextField
            label="プロジェクト概要"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
          
          <Box>
            <Typography variant="subtitle2" mb={1}>
              チームメンバー
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={0.5}>
              {form.teamMembers.map((member) => (
                <Chip key={member} label={member} size="small" color="primary" />
              ))}
              {form.teamMembers.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  選択された社員がここに表示されます
                </Typography>
              )}
            </Box>
          </Box>
          
          <Box display="flex" gap={2} justifyContent="center" mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isSubmitting}
              sx={{ minWidth: 120 }}
            >
              {isSubmitting ? "立案中..." : "立案"}
            </Button>
            
            <Button
              type="button"
              variant="outlined"
              size="large"
              onClick={resetForm}
              disabled={isSubmitting}
              sx={{ minWidth: 120 }}
            >
              リセット
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
} 