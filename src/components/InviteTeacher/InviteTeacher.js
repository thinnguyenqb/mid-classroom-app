import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Divider,
} from "@material-ui/core";
import "./style.css";
import axios from "axios";
import { API_URL } from "../../utils/config";


const InviteTeacher = (props) => {
  const { showInviteDiglogTeacher, setShowInviteDiglogTeacher, id } = props;
  const handleClose = () => setShowInviteDiglogTeacher(false);
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("access_token");
  
  const inviteTeacher = async (e) => {
    e.preventDefault();
    if (email.trim().length > 0) {
      const data = {
        email: email,
        classroom_id: id.id
      };
      console.log(data)
      axios
        .post(`${API_URL}/classroom/invite-teacher`, data, {
          headers: { Authorization: token },
        })
        .then((result) => {
          alert(result.data.msg);
          if(!result.data.showErr) setShowInviteDiglogTeacher(false)
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("Please Enter Class Name to Create.");
    }
  };

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      maxWidth="lg"
      className="form__dialog"
      open={showInviteDiglogTeacher}
      onClose={handleClose}
    >
      <DialogTitle>INVITE TEACHER</DialogTitle>

      <DialogContent>
        <Divider />
        <TextField
          id="filled-basic"
          label="Input email to invite"
          name="email"
          variant="standard"
          margin="dense"
          required
          autoFocus
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{width: '400px'}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={inviteTeacher}>Invite</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InviteTeacher;
