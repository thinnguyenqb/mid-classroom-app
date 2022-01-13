import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Grid,
  Paper,
  Box,
  Button,
  IconButton,
  MenuItem,
  Menu,
  InputAdornment,
  TextField,
  Tooltip
} from "@mui/material";
import { FcOk } from "react-icons/fc";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Snackbar from "../../components/Snackbar/Snackbar";
import { useSelector } from "react-redux";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ImportExportCSV from './ImportExportCSV'
import ReviewPoint from './ReviewPoint'
import CommentPoint from "./CommentPoint";
import ListAltIcon from '@mui/icons-material/ListAlt';

const Input = styled("input")({
  display: "none",
});

export default function DenseTable() {
  const [teacher, setTeacher] = useState([]);
  const auth = useSelector((state) => state.auth);
  const [rows, setRows] = useState([]);
  const [exercise, setExercise] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(false);
  const [exerciseId, setExerciseId] = useState("");
  const [gradeBoard, setGradeBoard] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [point, setPoint] = useState();
  const [snackbar, setSnackbar] = useState(false);
  const history = useHistory();
  const [mark, setMark] = useState(false);

  const open = Boolean(anchorEl);
  console.log(exercise)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const checkTeacher = (user_cur, teacher) => {
    for (let i = 0; i < teacher.length; i++) {
      if (teacher[i].teacherId === user_cur)
        return true
    }
    return false
  }

  useEffect(() => {
    if (token) {
      const getTeacher = async () => {
        try {
          const result = await axios.get(`${API_URL}/classroom/detail/${id}`, {
            headers: { Authorization: token },
          });
          setTeacher(result.data.teacher);
        } catch (error) {
          if (error) {
            console.log(error.response.data.msg);
          }
        }
      };
      const getGradeClass = async () => {
        try {
          axios
            .get(`${API_URL}/classroom/${id}/grade-student`, {
              headers: { Authorization: token },
            })
            .then((result) => {
              setExercise(result.data.exer);
              setRows(result.data.students);
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (error) {
          if (error) {
            console.log(error.response.data.msg);
          }
        }
      };
      const getDownloadGrade = async () => {
        try {
          axios
            .post(`${API_URL}/classroom/${id}/download-grade`, token, {
              headers: { Authorization: token },
            })
            .then((result) => {
              setGradeBoard(result.data.students);
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (error) {
          if (error) {
            console.log(error.response.data.msg);
          }
        }
      };
      getTeacher();
      getGradeClass();
      getDownloadGrade();
    }
  }, [token, id]);

  const importGrade = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        `${API_URL}/exercise/${exerciseId}/import-grade`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      console.log(res);
      setExerciseId("");
      history.go(0);
    } catch (err) {}
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
      );
      setSnackbar(true);
      if (!snackbar) history.go(0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMarkDone = async (exerciseId) => {
    try {
      await axios.post(
        `${API_URL}/exercise/${exerciseId}/markdone`, token,
        {
          headers: { Authorization: token },
        }
      );
      setSnackbar(true);
      if (!snackbar) history.go(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Grid container>
        <Box sx={{ display: "flex", width: "100%", mx: 3, my: 1 }}>
          <Link to={`/class/${id}`} style={{ textDecoration: "none" }}>
            <Button variant="outlined" startIcon={<ArrowBackIcon />}>
              Back
            </Button>
          </Link>
          {checkTeacher(auth.user._id, teacher) ? 
            <Link to={`/class/${id}/gradeClass/gradeReview`} style={{ textDecoration: "none" }}>
              <Button variant="outlined" startIcon={<ListAltIcon />}>
                List request grade review
              </Button>
            </Link>
            : <></>
          }
        </Box>
        {checkTeacher(auth.user._id, teacher) ? (
          <ImportExportCSV
            id={id}
            loading={loading}
            setLoading={setLoading}
            gradeBoard={gradeBoard}
          />
        ) : (
          <></>
        )}

        <TableContainer
          component={Paper}
          sx={{ display: "flex", width: "100%", mx: 3, my: 1 }}
        >
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left">StudentID</TableCell>
                <TableCell>Full Name</TableCell>
                {exercise.map(({ id, name }, index) => (
                  <>
                    <TableCell key={index} onClick={() => { setExerciseId(id); setMark(exercise[index].markDone) }}>
                      
                        {name}
                        {checkTeacher(auth.user._id, teacher) ? (
                          <IconButton
                            id="basic-button"
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                            size="small"
                            
                          >
                            <MoreVertIcon />
                          </IconButton>
                        ) : (
                            <>
                           
                            </>
                        )}
                    </TableCell>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                        style: {
                          maxHeight: "70px",
                          width: "25ch",
                          paddingTop: "5px",
                        },
                      }}
                    >
                      <MenuItem>
                        <label htmlFor={id}>
                          <Input
                            id={id}
                            type="file"
                            name="file"
                            onChange={importGrade}
                          />
                          Import grade
                        </label>
                      </MenuItem>
                      <MenuItem onClick={() => handleMarkDone(exerciseId)}>
                        {
                          mark ?
                            <>
                              <CheckBoxIcon /> Grade finalized
                            </>
                            :
                            <>
                              <CheckBoxOutlineBlankIcon /> Grade finalized
                            </>
                        }
                      </MenuItem>
                    </Menu>
                  </>
                ))}
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <>
                  {checkTeacher(auth.user._id, teacher) ? (
                    <TableRow
                    key={i}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="left" component="th" scope="row">
                      {row.studentId}
                    </TableCell>
                    {row.student_id ? (
                      <TableCell>
                        <Link to={`inforStudent/${row.student_id}`}>
                          {row.studentName}
                        </Link>
                      </TableCell>
                    ) : (
                      <TableCell>{row.studentName}</TableCell>
                    )}
                    {row.exercises.map((item, index) => (
                      <TableCell key={index}>
                        <TextField
                              hiddenLabel
                              defaultValue={item.point}
                              name="point"
                              variant="standard"
                              size="small"
                              sx={{ width: "8ch" }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    /{exercise[index].point}
                                  </InputAdornment>
                                ),
                              }}
                              onChange={handleChangePoint}
                        />
                        <Tooltip title="Update" placement="right">
                          <IconButton
                            id="basic-button"
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            size="small"
                            onClick={() =>
                              handleUpdatePoint(
                                exercise[index].id,
                                row.studentId
                              )
                            }
                          >
                            <FcOk />
                          </IconButton>
                         </Tooltip>
                      </TableCell>
                    ))}
                    <TableCell align="right">{row.totalGrade}</TableCell>
                  </TableRow>
                  ) : (
                    <>
                      {auth.user.studentID === row.studentId ? (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="left" component="th" scope="row">
                            {row.studentId}
                          </TableCell>
                          {row.student_id ? (
                            <TableCell>
                              <Link to={`inforStudent/${row.student_id}`}>
                                {row.studentName}
                              </Link>
                            </TableCell>
                          ) : (
                            <TableCell>{row.studentName}</TableCell>
                          )}
                          {row.exercises.map((item, index) => (
                            <TableCell key={index}>
                              {checkTeacher(auth.user._id, teacher) ? (
                                <>
                                  <TextField
                                    hiddenLabel
                                    defaultValue={item.point}
                                    name="point"
                                    variant="standard"
                                    size="small"
                                    sx={{ width: "8ch" }}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          /{exercise[index].point}
                                        </InputAdornment>
                                      ),
                                    }}
                                    onChange={handleChangePoint}
                                  />
                                  <IconButton
                                    id="basic-button"
                                    aria-controls="basic-menu"
                                    aria-haspopup="true"
                                    size="small"
                                    onClick={() =>
                                      handleUpdatePoint(
                                        exercise[index].id,
                                        row.studentId
                                      )
                                    }
                                  >
                                    <FcOk />
                                  </IconButton>
                                </>
                              ) : (
                                <>
                                  {exercise[index].markDone ? (
                                    <>
                                        {item.point} /{exercise[index].point}
                                        {!item.isReport ?
                                          <ReviewPoint
                                            exerciseId={exercise[index].id}
                                            studentId={auth.user.studentID}
                                            curPoint={item.point}
                                            defPoint={exercise[index].point}
                                            nameExercise={exercise[index].name}
                                          />
                                          :
                                          <></>
                                        }
                                        <CommentPoint
                                          exerciseId={exercise[index].id}
                                          studentId={auth.user.studentID}
                                        />
                                    </>
                                    ) : (
                                    <>
                                      <span>Chưa có điểm</span>
                                    </>
                                  )}
                                </>
                              )}
                            </TableCell>
                          ))}
                            {
                              row.isShowTotalPoint ? <TableCell align="right">{row.totalGrade}</TableCell> : <TableCell align="right">0.00</TableCell>
                            }
                        </TableRow>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar
          open={snackbar}
          setOpen={setSnackbar}
          msg="Update successfully"
        />
      </Grid>
    </>
  );
}
