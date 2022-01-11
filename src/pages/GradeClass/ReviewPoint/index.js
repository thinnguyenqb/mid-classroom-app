import React, {useState} from "react";
import { IconButton } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import Tooltip from "@mui/material/Tooltip";
import { CreateRequestPoint } from "./CreateRequestPoint";

export default function ReviewPoint({exerciseId, studentId, curPoint, defPoint, nameExercise }) {
  const [open, setOpen] = useState(false);
  const [isReport, setIsReport] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      {!isReport ?
          <Tooltip title="Request a review" style={{ marginRight: "5px" }}>
          <IconButton
            id="basic-button"
            size="small"
            aria-label=""
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickOpen}
            variant="outlined"
            style={{ color: "#3f51b5", marginLeft: "5px" }}
          >
              <ReplyIcon />
            
          </IconButton>
        </Tooltip>
        : <></>
      }
      
      <CreateRequestPoint
        openState={[open, setOpen]}
        exerciseId={exerciseId}
        studentId={studentId}
        curPoint={curPoint}
        defPoint={defPoint}
        nameExercise={nameExercise}
        setIsReport={setIsReport}
      />
    </React.Fragment>
  );
}
