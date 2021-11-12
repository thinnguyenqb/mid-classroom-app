import {
    Avatar,
    Button,
    CircularProgress,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import { useStyles } from "./styles";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../components/Notification/Notification'
import { isEmpty, isEmail, isLength, isMatch } from './../../components/Validation/Validation';

const initialState = {
    username: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

const SignUp = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
   
    const [user, setUser] = useState(initialState)

    const {username, email, password, cf_password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target;
        setUser({...user, [name]:value, err: '', success:''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const name = username;
        if (isEmpty(name) || isEmpty(password))
            return setUser({...user, err: "Please fill in all fields", success: ''})
        if (!isEmail(email))
            return setUser({...user, err: "Invalid emails", success: ''})
        if (isLength(password))
            return setUser({...user, err: "Password must be at least 6 characters", success: ''})
        if (!isMatch(password, cf_password))
            return setUser({ ...user, err: "Password did not match", success: '' })
        try {
            const res = await axios.post('/user/register', {name, email, password})
            setLoading(false)
            setUser({ ...user, err: '', success: res.data.msg })
        } catch (err) {
            err.response.data.msg && setUser({...user, err: err.response.data.msg, success:''})
        }
    }
    
    return (
        <Container maxWidth="sm">
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        value={user.password}
                        onChange={handleChangeInput}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="cf_password"
                        label="Confirm Password"
                        type="password"
                        value={user.cf_password}
                        onChange={handleChangeInput}
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
                            'Sign up'
                        )}
                    </Button>
                    <Grid container>
                        <Grid item xs></Grid>
                        <Grid item>
                            <Link to="/login" variant="body2" style={{textDecoration: 'none'}}>
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
