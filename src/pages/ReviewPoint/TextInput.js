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

export const TextInput = ({ user_id, setChat, checkTeacher, teacher }) => {
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
      setMessage("")
    } catch (err) {
      console.log(err);
    }
  };

  const createNotifyComment = async () => {
    try {
      var arrT = []
      //create array student id
      for (var i = 0; i < teacher.length; i++) { 
        arrT.push(teacher[i].teacherId)
      }
      if (checkTeacher === 0) {
        await axios.post(
          `${API_URL}/notify/create-teacher`,
          {
            sender: user_id,
            receivers: arrT,
            idExer: exerciseid,
            text: "has commented on your review grade",
          },
          {
            headers: { Authorization: token },
          }
        );
      } else {
          await axios.post(
          `${API_URL}/notify/create-student`,
          {
            sender: user_id,
            receivers: studentid,
            idExer: exerciseid,
            text: "has commented on your review grade",
          },
          {
            headers: { Authorization: token },
          }
        );
      }
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
        <Button variant="contained" color="primary" className={classes.button} onClick={
          () => {
            createNotifyComment();
            handleSubmit();
          }
        }>
          <SendIcon />
        </Button>
      </form>
    </>
  );
};
