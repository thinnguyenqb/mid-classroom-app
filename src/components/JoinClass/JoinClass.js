import React, { useState } from "react";
import { Button, Dialog, Slide, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import "./style.css";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useHistory } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const JoinClass = (props) => {
  const { joinClassDiglog, setJoinClassDiglog } = props;
  const [classCode, setClassCode] = useState("");
  const token = localStorage.getItem("access_token")
  const history = useHistory()

  const joinClass = (e) => {
    e.preventDefault();
    if (classCode.trim().length > 0) {
      if (!classCode.includes(' ')) {
        const data = {
          classroom_id: classCode,
        }
        axios
          .post(`${API_URL}/classroom/join`, data, {
            headers: { Authorization: token },
          })
          .then((result) => {
            alert(result.data.msg)
            if (!result.data.showErr) setJoinClassDiglog(false)
            history.go(0)
          })
          .catch((err) => {
            alert(err.msg);
          });
      }else {
        alert("Code hasn't white space");
      }
    } else {
      alert("Please enter both fields");
    }
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={joinClassDiglog}
        onClose={() => setJoinClassDiglog(false)}
        TransitionComponent={Transition}
      >
        <div className="joinClass">
          <div className="joinClass__wrapper">
            <div
              className="joinClass__wraper2"
              onClick={() => setJoinClassDiglog(false)}
            >
              <Close className="joinClass__svg" />
              <div className="joinClass__topHead">Join Class</div>
            </div>
            <Button
              className="joinClass__btn"
              variant="contained"
              color="primary"
              onClick={joinClass}
            >
              Join
            </Button>
          </div>
          <div className="joinClass__form">
            <div
              style={{ fontSize: "1.5rem", color: "#3c4043" }}
              className="joinClass__formText"
            >
              Class Code
            </div>
            <div
              style={{ color: "#3c4043", marginTop: "10px", marginBottom: "5px" }}
              className="joinClass__formText"
            >
              Ask your teacher for the class code, then enter it here.
            </div>
            <div className="joinClass__loginInfo">
              <TextField
                id="outlined-basic"
                label="Class Code"
                variant="outlined"
                fullWidth
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default JoinClass;