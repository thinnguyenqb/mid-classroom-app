import React from "react";
import { Button } from "@material-ui/core";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import GradingIcon from '@mui/icons-material/Grading';
import { Tooltip, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const GradeButton = (id) => {
  const location = useLocation();

  return (
    <>
      <Box>
        <Link to={`${location.pathname}/gradeClass`}>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button
              style={{
                color: "black",
                backgroundColor: "#fff",
                marginBottom: "10px",
              }}
            >
              <Tooltip title="Grade">
                <IconButton color="primary">
                  <GradingIcon />
                </IconButton>
              </Tooltip>
            </Button>
          </ButtonGroup>
        </Link>
      </Box>
    </>
  );
};

export default GradeButton;
