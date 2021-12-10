import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Divider,
} from "@material-ui/core";
import "./style.css";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useSelector } from "react-redux";

const InviteMember = (props) => {
  const { showInviteDiglog, setShowInviteDiglog, id } = props;
  //const handleOpen = () => setCreateClassDiglog(true);
  const handleClose = () => setShowInviteDiglog(false);

  const [email, setEmail] = useState("");

  const token = useSelector((state) => state.token);
  //console.log(id.id)
  const inviteMember = async (e) => {
    e.preventDefault();
    if (email.trim().length > 0) {
      const data = {
        email: email,
        classroom_id: id.id
      };
      console.log(data)
      axios
        .post(`${API_URL}/classroom/invite-student`, data, {
          headers: { Authorization: token },
        })
        .then((result) => {
          alert(result.data.msg);
          if(!result.data.showErr) setShowInviteDiglog(false)
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
      open={showInviteDiglog}
      onClose={handleClose}
    >
      <DialogTitle>INVITE MEMBER</DialogTitle>

      <DialogContent>
        <DialogContentText>
          <h5>Invitation link</h5>
        </DialogContentText>
        https://classroom.google.com/c/NDI0NzU0NTE3Mdfsfsdfsdfsdfsdfsdf
      </DialogContent>
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
        />
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={inviteMember}>Invite</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InviteMember;
