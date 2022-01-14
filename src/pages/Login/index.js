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
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { Chip, Divider } from "@mui/material";
import { login, loginGoogle } from '../../redux/actions/authAction'

const initialState = {
  email: '',
  password: '',
}


const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialState);
  const history = useHistory()
  const handleChangeInput = e => {
    const { name, value } = e.target;
    setUser({...user, [name]: value})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await dispatch(login(user))
    history.push("/")
    setLoading(false)
  }

  const responseGoogle = async (response) => {
    await dispatch(loginGoogle({ tokenId: response.tokenId }))
  }

  return (
    <Container component="main" maxWidth="sm" style={{marginTop: '100px'}}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}> <LockOutlinedIcon /> </Avatar>
        <Typography component="h1" variant="h5"> Login </Typography>
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
        </form>
        <div className={classes.form}>
          <Grid container >
            <Grid item xs>
              <Link to="/forgot-password" variant="body2" style={{textDecoration: 'none', color: '#3f51b5'}}>
                Forgot your password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2" style={{textDecoration: 'none', color: '#3f51b5'}}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Divider sx={{mt: 1, mb: 2}}>
            <Chip label="OR" />
          </Divider>
        </div>
        <GoogleLogin
          clientId="243157071866-dv8qfonmlum4u3kkv2asdi0qph1pb882.apps.googleusercontent.com"
          buttonText="Login with google"
          onSuccess={responseGoogle}
          cookiePolicy={'single_host_origin'}
          className={classes.googleBtn}
        />
      </Paper>
    </Container>
  );
};

export default Login;
