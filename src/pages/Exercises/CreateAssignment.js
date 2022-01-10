import React, {useState, useEffect} from "react";
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
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ControlledEditor from "./ControlledEditor";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { API_URL } from "../../utils/config";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const validationSchema = yup.object({
  name: yup.string("Enter assignment title").required("Assignment title is required"),
  point: yup.number("Assignment point must be integer").required("Assignment point is required"),
});

const CreateAssignment = ({ classId, openState, assignmentState, curAssignmentState }) => {
  //console.log({ classId, openState, assignmentState, curAssignmentState })
  const [open, setOpen] = openState;
  const [assignment, setAssignment] = assignmentState;
  const [curAssignment, setCurAssignment] = curAssignmentState;
  const [value, setValue] = useState("");
  const token = localStorage.getItem("access_token");
  
  useEffect(() => {
    if (curAssignment) {
      setValue(curAssignment.desc);
    } else {
      setValue("");
    }
  }, [curAssignment]);

  //handle the add assignment dialog
  const handleClickOpen = () => {
    setCurAssignment(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: curAssignment ? curAssignment.name : "",
      point: curAssignment ? curAssignment.point : "",
    },
    enableReinitialize: true,
    initialErrors: {
      name: "Can't leave blank title",
      point: "Can't leave blank point",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const description = value && value !== "<p><br/></p>" ? value : null;
      if (curAssignment) {
        axios
          .post(`${API_URL}/exercise/update`,
            {
              id: curAssignment.id,
              name: values.name,
              desc: description,
              point: values.point,
              classId: classId,
            },
            {
              headers: { Authorization: token }
            }
          )
          .then((res) => {

            if (res.status === 200) {
              const idx = assignment.findIndex((obj) => obj.id === res.data.data.id);
              setAssignment((prev) => [...prev.slice(0, idx), res.data.data, ...prev.slice(idx + 1)]);
              setOpen(false);
              setValue("");
              formik.resetForm();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post(`${API_URL}/exercise/create`,
            {
              name: values.name,
              desc: description,
              point: values.point,
              classId: classId,
            },
            {
              headers: { Authorization: token }
            }
          )
          .then((res) => {
            if (res.status === 201) {
              const newdata = {
                id: res.data._id,
                name: res.data.name,
                desc: res.data.desc,
                point: res.data.point
              }
              setAssignment(assignment.concat(newdata));
              setOpen(false);
              setValue("");
              formik.resetForm();
            }
          })
          .catch((err) => {
            console.log(err);
          });
        }
      },
    });
  
  return (
    <React.Fragment>
      <Button
        variant="contained"
        size="medium"
        startIcon={<AddIcon />}
        sx={{
          textTransform: "none",
          fontWeight: 500,
          height: "50px",
          backgroundColor: "#3f51b5"
        }}
        onClick={handleClickOpen}
      >
        Create
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} >
        <form onSubmit={formik.handleSubmit}>
          <AppBar sx={{ position: "relative", backgroundColor: "#3f51b5"}}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Assignment
              </Typography>
              <Button
                autoFocus
                variant="contained"
                color="primary"
                type="submit"
                disabled={curAssignment ? false : !formik.isValid}
              >
                Assign
              </Button>
            </Toolbar>
          </AppBar>

          <Container maxWidth="sm" sx={{ mt: 3 }}>
            <Grid container direction="column" spacing={2}>
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
                      label="Title"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    ></TextField>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <DescriptionOutlinedIcon sx={{ mt: 1.6 }} />
                  </Grid>
                  <Grid item xs={11}>
                    <ControlledEditor value={value} setValue={setValue} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <BorderColorOutlinedIcon sx={{ mt: 1.6 }} />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      lmargin="dense"
                      variant="filled"
                      id="point"
                      name="point"
                      label="Point"
                      type="number"
                      value={formik.values.point}
                      onChange={formik.handleChange}
                      error={formik.touched.point && Boolean(formik.errors.point)}
                      helperText={formik.touched.point && formik.errors.point}
                    ></TextField>
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

export default CreateAssignment;
