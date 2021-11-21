import {
  Avatar,
  Button,
  Container,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useStyles } from "./styles";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { FaFacebookSquare } from "react-icons/fa";
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../components/Notification/Notification'
import {dispatchLogin} from '../../redux/actions/authAction'
import { useDispatch } from "react-redux";

const initialState = {
  email: '',
  password: '',
  err: '',
  success: ''
}


const Login = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()

  const [user, setUser] = useState(initialState);
  const { email, password, err, success } = user;

  const handleChangeInput = e => {
    const { name, value } = e.target;
    setUser({...user, [name]: value, err: '', success: ''})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post('/user/login', { email, password })
      setUser({...user, err: '', success: res.data.msg})
      localStorage.setItem('first login', true);
      dispatch(dispatchLogin())
      setLoading(false)
      history.push("/")
    } catch (err) {
      err.response.data.msg &&
      setUser({...user, err: err.response.data.msg, success: ''})
    }
  }
  const responseGoogle = async (response) => {
    try {
      const res = await axios.post('/user/google_login', { tokenId: response.tokenId })
      setUser({...user, err: '', success: res.data.msg})
      localStorage.setItem('first login', true);
      dispatch(dispatchLogin())
      history.push("/")

    } catch (err) {
      err.response.data.msg &&
      setUser({...user, err: err.response.data.msg, success: ''})
    }
  }
  

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}> <LockOutlinedIcon /> </Avatar>
        <Typography component="h1" variant="h5"> Login </Typography>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}

        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            variant="outlined"
            label="Username"
            name="email"
            autoComplete="email"
            autoFocus
            value={user.email}
            onChange={handleChangeInput}
            
          />
          <TextField
            fullWidth
            required
            type="password"
            variant="outlined"
            margin="normal"
            name="password"
            label="Password"
            value={user.password}
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
                'Login'
            )}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password" variant="body2" style={{textDecoration: 'none'}}>
                Forgot your password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2" style={{textDecoration: 'none'}}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <Typography variant="body1" className={classes.separator}>
          Or
        </Typography>
        <GoogleLogin
          clientId="243157071866-dv8qfonmlum4u3kkv2asdi0qph1pb882.apps.googleusercontent.com"
          buttonText="Login with google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          className={classes.googleBtn}
        />,
        <FacebookLogin
          icon={<FaFacebookSquare className={classes.fbIcon} />}
          cssClass={classes.facebookBtn}
        />
      </Paper>
    </Container>
  );
};

export default Login;
