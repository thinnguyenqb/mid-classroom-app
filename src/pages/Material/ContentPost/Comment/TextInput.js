import React, { useState } from "react";
import {
  IconButton,
  FormControl, OutlinedInput, InputAdornment,
  Tooltip 
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { API_URL } from "../../../../utils/config";

export const TextInput = ({ post_id, user_id, setComments }) => {
  const token = localStorage.getItem("access_token");
  const [message, setMessage] = useState("")

  const handleChangeInput = (e) => {
    setMessage(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/post/comment`,
        {
          post_id: post_id,
          userId: user_id,
          message: message
        },
        {
          headers: { Authorization: token },
        }
      );
      setComments(oldArray => [...oldArray, res.data.dataComment])
      setMessage("")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <FormControl sx={{ ml: 0, pr: 2, width: '100%' }} variant="outlined">
        <OutlinedInput
          placeholder="Thêm nhận xét trong lớp học..."
          variant="outlined"
          size="small"
          name="message"
          value={message}
          onChange={handleChangeInput}
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title="Đăng">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={
                    () => {
                      handleSubmit();
                    }
                  }
                >
                  <SendIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
};
