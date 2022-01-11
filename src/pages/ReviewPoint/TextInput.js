import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(() =>
  createStyles({
    wrapForm: {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      margin: "0 auto",
    },
    wrapText: {
      width: "100%",
    },
    button: {},
  })
);

export const TextInput = ({ user_id, setChat }) => {
  const token = localStorage.getItem("access_token");
  const classes = useStyles();
  const { exerciseid, studentid } = useParams()
  const [message, setMessage] = useState("")
  

  const handleChangeInput = (e) => {
    setMessage(e.target.value)
  }
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/exercise/comment-report`,
        {
          exercise_id: exerciseid,
          student_id: studentid,
          message: message,
          userId: user_id
        },
        {
          headers: { Authorization: token },
        }
      );
      setChat(oldArray => [...oldArray, res.data.dataComment])
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form className={classes.wrapForm} noValidate autoComplete="off">
        <TextField
          id="standard-text"
          label="Thêm nhận xét"
          name="message"
          className={classes.wrapText}
          value={message}
          onChange={handleChangeInput}
        />
        <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>
          <SendIcon />
        </Button>
      </form>
    </>
  );
};
