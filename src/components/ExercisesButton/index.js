import React from "react";
import Box from "@mui/material/Box";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Tooltip, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const ExercisesButton = (id) => {
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
        <Link to={`${location.pathname}/exercises`}>
          <Tooltip title="Exercises" >
            <IconButton color="primary" size="large">
              <AssignmentIcon/>
            </IconButton>
          </Tooltip>
        </Link>
      </Box>
    </>
  );
};

export default ExercisesButton;
