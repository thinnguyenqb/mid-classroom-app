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
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStyles } from "./style";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { FaFacebookSquare } from "react-icons/fa";

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});


const Login = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  
  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef=""
            required
            fullWidth
            label="Username"
            name="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef=""
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {loading ? (
                <CircularProgress size={25} thickness={4} color="white" />
            ) : (
                'Login'
            )}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password" variant="body2">
                Forgot your password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <Typography variant="body1" className={classes.separator}>
          Or
        </Typography>
        <GoogleLogin
          buttonText="Login with Google"
          cookiePolicy="single_host_origin"
          className={classes.googleBtn}
        />
        <FacebookLogin
          icon={<FaFacebookSquare className={classes.fbIcon} />}
          cssClass={classes.facebookBtn}
        />
      </Paper>
    </Container>
  );
};

export default Login;
