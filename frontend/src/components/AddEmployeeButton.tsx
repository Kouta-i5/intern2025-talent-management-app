"use client";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

const AddEmployeeButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/employee/add");
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={handleClick}
    >
      社員追加
    </Button>
  );
};

export default AddEmployeeButton;
