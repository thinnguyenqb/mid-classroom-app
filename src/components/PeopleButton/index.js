import React, { useState } from "react";
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
      <Box sx={{ mr: 2 }}
        style={{
          color: "black",
          backgroundColor: "#fff",
          marginBottom: "10px",
          borderRadius: "5px",
          padding: '5px'
        }}>
        <Tooltip title="Everyone">
          <IconButton color="primary"
            size="large"
            onClick={showPeople}
          >
            <AssignmentIndIcon />
          </IconButton>
        </Tooltip>
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
