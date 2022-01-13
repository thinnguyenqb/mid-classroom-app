import React, { useState, useEffect } from "react";
import {
  Container,
  IconButton,
  Typography,
  Grid,
  Avatar,
  Button,
  InputAdornment,
  Box,
  Divider,
  Chip,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tooltip,
} from "@mui/material";
import { FcOk } from "react-icons/fc";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useParams } from "react-router-dom";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import Comment from "./Comment";
import { TextInput } from "./TextInput";
import axios from "axios";
import { API_URL } from "../../utils/config";
import moment from "moment";
import { useSelector } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import Snackbar from "../../components/Snackbar/Snackbar";

function RewiewPoint() {
  const token = localStorage.getItem("access_token");
  const auth = useSelector((status) => status.auth);
  const [teacher, setTeacher] = useState([]);
  const { id, exerciseid, studentid } = useParams();
  const [dataReport, setDataReport] = useState({});
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [point, setPoint] = useState();
  const [snackbar, setSnackbar] = useState(false);
  const [checked, setChecked] = useState(false);
  const [alert, setAlert] = useState("")

  useEffect(() => {
    const getTeacher = async () => {
      try {
        const result = await axios.get(`${API_URL}/classroom/detail/${id}`, {
          headers: { Authorization: token },
        });
        console.log(result.data.teacher);
        setTeacher(result.data.teacher);
      } catch (error) {
        if (error) {
          console.log(error.response.data.msg);
        }
      }
    };
    const getReportData = async () => {
      setLoading(true);
      await axios
        .get(`${API_URL}/exercise/report-grade/${exerciseid}/${studentid}`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          //console.log(res.data.dataReport);
          setDataReport(res.data.dataReport);
          setChat(res.data.dataReport.chat);
          setChecked(res.data.dataReport.isFinal)
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTeacher();
    getReportData();
  }, [token, id, studentid, exerciseid]);

  const checkTeacher = (user_cur, teacher) => {
    for (let i = 0; i < teacher.length; i++) {
      if (teacher[i].teacherId === user_cur) return true;
    }
    return false;
  };

  const handleChangePoint = (e) => {
    const { value } = e.target;
    setPoint(value);
  };

  const handleUpdatePoint = async (exercise_id, studentId) => {
    try {
      await axios.post(
        `${API_URL}/exercise/${exercise_id}/update-point-student`,
        {
          studentId,
          point,
        },
        {
          headers: { Authorization: token },
        }
      ).then((res) => {
        setAlert(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
      setSnackbar(true);
      //if (!snackbar) history.go(0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = async(event) => {
    setChecked(event.target.checked);
    try {
      await axios.post(
        `${API_URL}/exercise/final-grade`,
        {
          exercise_id: exerciseid,
          student_id: studentid
        },
        {
          headers: { Authorization: token },
        }
      ).then((res) => {
        setAlert(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
      setSnackbar(true);
      //if (!snackbar) history.go(0);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      {loading ? (
        <>
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ mt: 2 }}>
            {checkTeacher(auth.user._id, teacher) ? (
              <Link
                to={`/class/${id}/gradeClass/gradeReview`}
                style={{ textDecoration: "none" }}
              >
                <Button variant="outlined" startIcon={<ArrowBackIcon />}>
                  Back
                </Button>
              </Link>
            ) : (
              <>
                <Link
                  to={`/class/${id}/gradeClass`}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="outlined" startIcon={<ArrowBackIcon />}>
                    Back
                  </Button>
                </Link>
              </>
            )}
          </Box>
          <Container sx={{ maxWidth: "850px !important" }}>
            <Grid
              container
              direction="column"
              spacing={2}
              sx={{
                mt: 2,
                boxShadow: 2,
                padding: "5px 30px 30px 5px",
                borderRadius: "5px",
              }}
            >
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <Avatar sx={{ backgroundColor: "#3f51b5" }}>
                      <AssignmentOutlinedIcon />
                    </Avatar>
                  </Grid>
                  <Grid item xs={11}>
                    <Grid style={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="h4"
                        gutterBottom
                        component="div"
                        sx={{ mt: 0.5, mb: 0, color: "#3f51b5" }}
                      >
                        {dataReport.name}
                      </Typography>
                      <IconButton
                        sx={{
                          ml: "auto",
                        }}
                        className="menu-button"
                      >
                        <MoreVertOutlinedIcon />
                      </IconButton>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        gutterBottom
                        component="div"
                        sx={{ color: "#3c4043", fontWeight: "500" }}
                      >
                        {dataReport.studentName} - MSSV: {dataReport.studentId}
                      </Typography>
                      <Typography variant="h6" gutterBottom component="div">
                        {moment(dataReport.createdAt).format("L, h:mm:ss A")}
                      </Typography>
                    </Grid>
                    <Typography sx={{ color: "#3c4043", fontWeight: "500" }}>
                      {dataReport.curPoint}/{dataReport.defPoint} Điểm
                    </Typography>
                    <Divider sx={{ mt: 1.5 }}>
                      <Chip label="Giải thích yêu cầu phúc khảo" />
                    </Divider>
                    <Grid container direction="row">
                      <Grid
                        item
                        xs={8}
                        sx={{
                          p: 2,
                          pl: 4,
                          fontSize: "13px",
                          lineHeight: "20px",
                          letterSpacing: "normal",
                          borderRight: "1px dashed #ccc",
                        }}
                        dangerouslySetInnerHTML={{ __html: dataReport.message }}
                      ></Grid>
                      <Grid
                        item
                        xs={4}
                        sx={{
                          p: 5,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="h6" gutterBottom component="div">
                          Điểm mong đợi
                        </Typography>
                        <Typography variant="h6" gutterBottom component="div">
                          {dataReport.pointExpect}/{dataReport.defPoint}
                        </Typography>
                      </Grid>
                      </Grid>
                      {checkTeacher(auth.user._id, teacher) ?
                        <>
                          <Divider sx={{ mt: 1.5 }}>
                            <Chip label="Giáo viên cập nhật điểm cuối cùng" />
                          </Divider>
                          <Grid
                            container
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                p: 1,
                                m: 1,
                                bgcolor: "background.paper",
                                borderRadius: 1,
                                border: "1px solid #ccc",
                              }}
                            >
                              <Typography variant="h6" sx={{ mr: 1 }}>
                                Điểm:
                              </Typography>
                              <TextField
                                hiddenLabel
                                defaultValue={dataReport.curPoint}
                                name="point"
                                variant="standard"
                                size="small"
                                sx={{ width: "10ch" }}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      /{dataReport.defPoint}
                                    </InputAdornment>
                                  ),
                                }}
                                onChange={handleChangePoint}
                              />
                              <Tooltip title="Update" placement="top">
                                <IconButton
                                  id="basic-button"
                                  aria-controls="basic-menu"
                                  aria-haspopup="true"
                                  size="small"
                                  onClick={() =>
                                    handleUpdatePoint(exerciseid, studentid)
                                  }
                                >
                                  <FcOk />
                                </IconButton>
                              </Tooltip>
                            </Box>
                            <Box>
                              <FormGroup>
                                <FormControlLabel
                                  control={<Checkbox checked={checked} onChange={handleChange} />}
                                  label="Thông báo điểm sau phúc khảo"
                                />
                              </FormGroup>
                            </Box>
                          </Grid>
                        </> :
                        <></>
                      }
                    <Divider sx={{ mt: 1.5 }} />
                    <Grid item container alignItems="center" sx={{ mt: 1 }}>
                      <IconButton className="menu-button">
                        <PeopleOutlineRoundedIcon />
                      </IconButton>
                      <Typography
                        sx={{
                          mr: "auto",
                          color: "#3c4043",
                          fontWeight: "500",
                          fontSize: "16px",
                        }}
                      >
                        Bình luận phúc khảo ({chat.length})
                      </Typography>
                    </Grid>
                    <Comment chat={chat} />
                    <TextInput user_id={auth.user._id} setChat={setChat} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
      <Snackbar
        open={snackbar}
        setOpen={setSnackbar}
        msg={alert}
      />
    </Grid>
  );
}

export default RewiewPoint;
