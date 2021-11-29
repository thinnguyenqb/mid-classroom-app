import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import "./style.css";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const CreateClass = (props) => {
  const { createClassDiglog, setCreateClassDiglog } = props;
  //const handleOpen = () => setCreateClassDiglog(true);
  const handleClose = () => setCreateClassDiglog(false);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [topic, setTopic] = useState("");
  const [room, setRoom] = useState("");
  const token = useSelector((state) => state.token);
  const history = useHistory()

  const addClass = async (e) => {
    e.preventDefault();
    if (name.trim().length > 0 && desc.trim().length > 0) {
      const data = {
        name: name,
        desc: desc,
        topic: topic,
        room: room,
      };

      axios
        .post(`${API_URL}/classroom/create`, data, {
          headers: { Authorization: token },
        })
        .then((result) => {
          history.go(0)
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("Please Enter Class Name to Create.");
    }
    setCreateClassDiglog(false)
  };

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      maxWidth="lg"
      className="form__dialog"
      open={createClassDiglog}
      onClose={handleClose}
    >
      <DialogTitle>Create Class</DialogTitle>
      <DialogContent>
        <TextField
          id="filled-basic"
          label="Class Name (required)"
          name="name"
          variant="standard"
          margin="dense"
          required
          autoFocus
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Description"
          variant="standard"
          margin="dense"
          autoFocus
          fullWidth
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Topic"
          variant="standard"
          margin="dense"
          autoFocus
          fullWidth
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Room"
          variant="standard"
          margin="dense"
          autoFocus
          fullWidth
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={addClass} >Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateClass;
