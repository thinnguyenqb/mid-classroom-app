import React, { useState } from "react";
import { Button } from "@material-ui/core";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import PeopleClass from "../PeopleClass/PeopleClass";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Tooltip, IconButton } from '@mui/material';

const PeopleButton = (id) => {
  const [peopleDiglog, setPeopleDiglog] = useState(false);
  const showPeople = () => {
    setPeopleDiglog(true);
  };
  
  return (
    <>
      <Box sx={{ mr:1 }}>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button
            style={{
              color: "black",
              backgroundColor: "#fff",
              marginBottom: "10px",
            }}
            onClick={showPeople}
          >
            <Tooltip title="Everyone">
              <IconButton color="primary">
                <AssignmentIndIcon />
              </IconButton>
            </Tooltip>
          </Button>
          
        </ButtonGroup>
      </Box>
      <PeopleClass
        peopleDiglog={peopleDiglog}
        setPeopleDiglog={setPeopleDiglog}
        id={id}
      />
    </>
  );
};

export default PeopleButton;
