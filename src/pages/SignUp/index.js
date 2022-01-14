import {
    Avatar,
    Button,
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
import { Link } from 'react-router-dom';
import { register } from '../../redux/actions/authAction'
import { useDispatch } from "react-redux";

const initialState = {
    name: '', //username
    fullname: '',
    email: '',
    password: '',
    cf_password: '',
    showPassword: false,
    showCfPassword: false,
}

const SignUp = () => {
    const classes = useStyles();
    const [user, setUser] = useState(initialState);
    const dispatch = useDispatch()

    const handleChangeInput = e => {
        const {name, value} = e.target;
        setUser({...user, [name]:value})
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
        dispatch(register(user));
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

                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        size="small"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        name="name"
                        value={user.name}
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
                        Sign up
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
