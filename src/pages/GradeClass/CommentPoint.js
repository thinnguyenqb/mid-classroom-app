import React from "react";
import { IconButton } from "@mui/material";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import Tooltip from "@mui/material/Tooltip";
import { Link, useLocation } from "react-router-dom";

export default function CommentPoint({exerciseId, studentId}) {
  const location = useLocation();
  console.log(exerciseId)
  return (
    <React.Fragment>
      <Tooltip title="Grade review" style={{ marginLeft: "5px" }}>
        <Link to={`${location.pathname}/${exerciseId}/${studentId}`}>
          <IconButton
            id="basic-button"
            size="small"
            aria-label=""
            aria-controls="basic-menu"
            aria-haspopup="true"
            variant="outlined"
            style={{ color: "#3f51b5", marginLeft: "5px" }}
          >
            <ChatRoundedIcon />
          </IconButton>
        </Link>
      </Tooltip>
    </React.Fragment>
  );
}
