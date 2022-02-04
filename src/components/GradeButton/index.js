import React from "react";
import Box from "@mui/material/Box";
import GradingIcon from '@mui/icons-material/Grading';
import { Tooltip, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const GradeButton = (id) => {
  const location = useLocation();

  return (
    <>
      <Box sx={{ mr: 2 }}
        style={{
          color: "black",
          backgroundColor: "#fff",
          marginBottom: "10px",
          borderRadius: "5px",
          padding: '5px'
        }}>
        <Link to={`${location.pathname}/gradeClass`}>
          <Tooltip title="Grade">
            <IconButton color="primary" size="large">
              <GradingIcon />
            </IconButton>
          </Tooltip>
        </Link>
      </Box>
    </>
  );
};

export default GradeButton;
