import React from "react";
import { Button } from "@material-ui/core";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Tooltip, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const ExercisesButton = (id) => {
  const location = useLocation();

  return (
    <>
      <Box>
        <Link to={`${location.pathname}/exercises`}>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button
              style={{
                color: "black",
                backgroundColor: "#fff",
                marginBottom: "10px",
              }}
            >
              <Tooltip title="Exercises">
                <IconButton color="primary">
                  <AssignmentIcon />
                </IconButton>
              </Tooltip>
            </Button>
          </ButtonGroup>
        </Link>
      </Box>
    </>
  );
};

export default ExercisesButton;
