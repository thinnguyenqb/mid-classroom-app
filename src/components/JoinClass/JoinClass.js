import React, { useState } from "react";
import { Avatar, Button, Dialog, Slide, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import "./style.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const JoinClass = (props) => {
  const { joinClassDiglog, setJoinClassDiglog } = props;
  const [classCode, setClassCode] = useState("");
  const [error, setError] = useState();

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
            >
              Join
            </Button>
          </div>
          <div className="joinClass__form">
            <p className="joinClass__formText">
              You're currently signed in as 
            </p>
            <div className="joinClass__loginInfo">
              <div className="joinClass__classLeft">
                <Avatar src="https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png" />
                <div className="joinClass__loginText">
                  <div className="joinClass__loginName">
                    Thin Nguyen
                  </div>
                  <div className="joinClass__loginEmail">
                    thinnguyen2625@gmail.com
                  </div>
                </div>
              </div>
              <Button variant="outlined" color="primary">
                Logout
              </Button>
            </div>
          </div>
          <div className="joinClass__form">
            <div
              style={{ fontSize: "1.25rem", color: "#3c4043" }}
              className="joinClass__formText"
            >
              Class Code
            </div>
            <div
              style={{ color: "#3c4043", marginTop: "-5px" }}
              className="joinClass__formText"
            >
              Ask your teacher for the class code, then enter it here.
            </div>
            <div className="joinClass__loginInfo">
              <TextField
                id="outlined-basic"
                label="Class Code"
                variant="outlined"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                error={error}
                helperText={error && "No class was found"}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default JoinClass;