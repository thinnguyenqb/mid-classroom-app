import {
    Avatar,
    Button,
    CircularProgress,
    Container,
    Paper,
    TextField,
    Typography,
    Grid
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStyles } from './styles';
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../components/Notification/Notification'
import { isLength, isMatch } from './../../components/Validation/Validation';

const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}


const ResetPassword = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    const { token } = useParams();
    const [data, setData] = useState(initialState)
    const { password, cf_password, err, success } = data;

    const handleChangeInput = async (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }
    const handleResetPass = async (e) => {
        e.preventDefault()
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''});
        
        if(!isMatch(password, cf_password))
            return setData({ ...data, err: "Password did not match.", success: '' });
        
        setLoading(true)
        try {
            const res = await axios.post('/user/reset', {password}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            return setData({...data, err: "", success: res.data.msg})

        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                <form className={classes.form} onSubmit={handleResetPass}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        value={data.password}
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
                        value={data.cf_password}
                        onChange={handleChangeInput}
                    />
                    <Button
                        className={classes.submit}
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        {loading ? (
                            <CircularProgress size={25} thickness={4} color="white" />
                        ) : (
                            'Reset your password'
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

export default ResetPassword;
