import {
    Avatar,
    Button,
    CircularProgress,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    OutlinedInput
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';
import Visibility from '@mui/icons-material/VisibilityOutlined';
import React, { useState } from 'react';
import { useStyles } from "./styles";
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../components/Notification/Notification'
import { isEmpty, isEmail, isLength, isMatch, validateUserName } from './../../components/Validation/Validation';
import { API_URL } from '../../utils/config';
import {dispatchLogin } from '../../redux/actions/authAction'
import { useDispatch } from "react-redux";

const initialState = {
    username: '',
    fullname: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: '',
    showPassword: false,
    showCfPassword: false,
}

const SignUp = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(initialState);
    const dispatch = useDispatch()
    const history = useHistory()

    const { username, fullname, email, password, cf_password, err, success } = user
    
    
    const handleChangeInput = e => {
        const {name, value} = e.target;
        setUser({...user, [name]:value, err: '', success:''})
    }
    
    const handleClickShowPassword = () => {
        setUser({ ...user, showPassword: !user.showPassword});
    };
    const handleClickCfShowPassword = () => {
        setUser({ ...user, showCfPassword: !user.showCfPassword});
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const name = username;
        if (!validateUserName(name))
            return setUser({...user, err: "Username must contain 3 to 30 characters. Only letter and number are allowed.", success: ''})
        if (isEmpty(name) || isEmpty(password))
            return setUser({...user, err: "Please fill in all fields", success: ''})
        if (!isEmail(email))
            return setUser({...user, err: "Invalid emails", success: ''})
        if (isLength(password))
            return setUser({...user, err: "Password must be at least 6 characters", success: ''})
        if (!isMatch(password, cf_password))
            return setUser({ ...user, err: "Password did not match", success: '' })
        try {
            const res = await axios.post(`${API_URL}/user/register`, {name, fullname, email, password})
            setLoading(false)
            setUser({ ...user, err: '', success: res.data.msg })
            localStorage.setItem('access_token', res.data.access_token);
            dispatch(dispatchLogin())
            history.push("/")
        } catch (err) {
            err.response.data.msg && setUser({...user, err: err.response.data.msg, success:''})
        }
    }
    
    return (
        <Container maxWidth="sm" style={{marginTop: '100px'}}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Signup
                </Typography>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        size="small"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        name="username"
                        autoFocus
                        value={user.username}
                        onChange={handleChangeInput}
                    />
                    <TextField
                        size="small"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Fullname"
                        name="fullname"
                        autoFocus
                        value={user.fullname}
                        onChange={handleChangeInput}
                    />
                    <TextField
                        size="small"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        required
                        value={user.email}
                        onChange={handleChangeInput}
                    />
                    <FormControl variant="outlined" fullWidth margin="normal" size="small">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={user.showPassword ? 'text' : 'password'}
                            value={user.password}
                            name="password"
                            label="Password"
                            onChange={handleChangeInput}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {user.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth margin="normal" size="small">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={user.showCfPassword ? 'text' : 'password'}
                            name="cf_password"
                            label="Confirm Password"
                            value={user.cf_password}
                            onChange={handleChangeInput}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickCfShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {user.showCfPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                    </FormControl>
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
                            'Sign up'
                        )}
                    </Button>
                    <Grid container>
                        <Grid item xs></Grid>
                        <Grid item>
                            <Link to="/login" variant="body2" style={{textDecoration: 'none', color: '#3f51b5'}}>
                                {'Return to login'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default SignUp;
