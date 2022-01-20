import React, { useState, useEffect } from "react";
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
import CopyLink from "./CopyLink"
import ShowMoreText from "react-show-more-text";

const InviteMember = (props) => {
  const { showInviteDiglog, setShowInviteDiglog, id } = props;
  const handleClose = () => setShowInviteDiglog(false);
  const [linkInvite, setLinkInvite] = useState("")
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("access_token");
  
  useEffect(() => {
    if (token) {
      const getData = async () => {
        try {
          const res = await axios.post(
            `${API_URL}/classroom/invite-student-link`,
            { classroom_id: id.id },
            {
              headers: { Authorization: token },
            }
          );
          setLinkInvite(res.data.url);
        } catch (error) {
          if (error) {
            console.log(error.response.data.msg);
          }
        }
      };
      getData();
    }
  }, [token, id])
  
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
      <DialogTitle>INVITE STUDENT</DialogTitle>

      <DialogContent>
        <DialogContentText>
          <h5>Invitation link</h5>
        </DialogContentText>
        <ShowMoreText
          lines={1}
          width={500}
          expanded={false}
        >
        {linkInvite}
        </ShowMoreText>
        <CopyLink linkInvite={linkInvite}/>
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
