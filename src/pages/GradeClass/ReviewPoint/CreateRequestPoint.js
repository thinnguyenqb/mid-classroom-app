import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import {
  Button,
  Container,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import SwipeRoundedIcon from '@mui/icons-material/SwipeRounded';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { API_URL } from "../../../utils/config";
import ControlledEditor from './ControlledEditor'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const validationSchema = yup.object({
  point: yup.number("Expect point must be integer").required("Expect point is required"),
});

export const CreateRequestPoint = ({openState, exerciseId, studentId, curPoint, defPoint, nameExercise, setIsReport}) => {
  //console.log({ exerciseId, studentId, curPoint, defPoint, nameExercise })
  const [open, setOpen] = openState;
  const [value, setValue] = useState("");
  const token = localStorage.getItem("access_token");

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      point: '',
    },
    enableReinitialize: true,
    initialErrors: {
      point: "Can't leave blank point",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values.point)
      const message = value && value !== "<p><br/></p>" ? value : null;
      axios
          .post(`${API_URL}/exercise/create-report-grade`,
            {
              exercise_id: exerciseId,
              student_id: studentId,
              point_expect: values.point,
              message: message,
            },
            {
              headers: { Authorization: token }
            }
          )
        .then((res) => {
            setIsReport(true)
            setOpen(false);
            formik.resetForm();
          })
          .catch((err) => {
            console.log(err);
          });
        }
      },
    );
  return (
    <React.Fragment>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} >
        <form onSubmit={formik.handleSubmit}>
          <AppBar sx={{ position: "relative", backgroundColor: "#3f51b5"}}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Request a review of grade composition
              </Typography>
              <Button
                autoFocus
                variant="contained"
                color="primary"
                type="submit"
                disabled={!formik.isValid}
              >
                Assign
              </Button>
            </Toolbar>
          </AppBar>

          <Container maxWidth="sm" sx={{ mt: 3 }}>
            <Grid container direction="column" spacing={2} style={{border: '1px solid #ccc', padding: '5px 20px 30px 0px', borderRadius: '5px'}}>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <AssignmentOutlinedIcon sx={{ mt: 1.6 }} />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      autoFocus
                      margin="dense"
                      variant="filled"
                      id="title"
                      name="name"
                      disabled
                      label="Exercise - Point"
                      value={`${nameExercise} - ${curPoint}/${defPoint}`}
                    ></TextField>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                  </Grid>
                  <Grid item xs={11}>
                    <Typography component="div" style={{color: 'red', fontStyle: 'italic'}}>*Bạn chỉ phúc khảo điểm 1 lần duy nhất !</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <SwipeRoundedIcon sx={{ mt: 1.6 }} />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      margin="dense"
                      variant="filled"
                      id="point"
                      name="point"
                      label="PointExpect"
                      type="number"
                      value={formik.values.point}
                      onChange={formik.handleChange}
                      error={formik.touched.point && Boolean(formik.errors.point)}
                      helperText={formik.touched.point && formik.errors.point}
                    ></TextField>
                  </Grid>
                </Grid>
                
              </Grid> 
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <CommentRoundedIcon sx={{ mt: 1.6 }} />
                  </Grid>
                  <Grid item xs={11}>
                    <ControlledEditor value={value} setValue={setValue} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </form>
      </Dialog>
    </React.Fragment>
  );
};
