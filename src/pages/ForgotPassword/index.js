import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useStyles } from "./styles";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from '../../components/Notification/Notification'

const initialState = {
  email: '',
  err: '',
  success: '',
}

const ForgotPassword = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(initialState) 
  const {email, err, success} = data;

  const handleChangeInput = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value, err: '', success: '' })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('/user/forgot', { email })
      setLoading(false)
      return setData({ ...data, err: '', success: res.data.msg })
    } catch (err) {
        err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            variant="outlined"
            label="Email"
            name="email"
            autoComplete="email"
            value={data.email}
            onChange={handleChangeInput}
          />
          <Button
            className={classes.submit}
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            {loading ? (
              <CircularProgress size={25} thickness={4} color="white" />
            ) : (
              "Send me password reset email"
            )}
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link
                to="/login"
                variant="body2"
                style={{ textDecoration: "none", color: '#3f51b5' }}
              >
                {"Return to login"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <ToastContainer />
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
