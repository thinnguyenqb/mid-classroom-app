import {
    Avatar,
    Button,
    CircularProgress,
    Container,
    Grid,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, {useState}  from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(20),
        paddingBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '80%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        name="email"
                        label="Email"
                        required
                        autoFocus
                        fullWidth
                        margin="normal"
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
                            'Send me password reset email'
                        )}
                    </Button>
                    <Grid container>
                        <Grid item xs></Grid>
                        <Grid item>
                            <Link to="/login" variant="body2">
                                {'Return to login'}
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
