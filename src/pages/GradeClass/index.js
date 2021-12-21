import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid, Paper, Box, Button, IconButton , MenuItem, Menu } from "@mui/material";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import GetAppIcon from "@mui/icons-material/GetApp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { CSVLink } from "react-csv";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Input = styled("input")({
  display: "none",
});

const studentImportTemp = [
  ["StudentId", "Fullname"],
  ["1712787", "Nguyễn Văn Thìn"],
  ["1712788", "Trần Thiên Quàng"],
  ["1712789", "Nguyễn Công Sơn"],
];

const gradeImportTemp = [
  ["StudentId", "Grade"],
  ["1712787", "70"],
  ["1712788", "80"],
  ["1712789", "90"],
];


export default function DenseTable() {
  const [rows, setRows] = useState([]);
  const [exercise, setExercise] = useState([])
  const { id } = useParams();
  const token = localStorage.getItem('access_token')
  const [loading, setLoading] = useState(false);
  const [exerciseId, setExerciseId] = useState('');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (token) {
      const getGradeClass = async () => {
        try {
          axios
            .get(`${API_URL}/classroom/${id}/grade-student`, {
              headers: { Authorization: token },
            })
            .then((result) => {
              setExercise(result.data.exer)
              setRows(result.data.students)
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
      getGradeClass();
    }
  }, [token, id]);

  const importFile = async (e) => {
    e.preventDefault();
    try {
      console.log(123)
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      await axios.post(
        `${API_URL}/classroom/${id}/import-student`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      setLoading(false);
    } catch (err) {}
  };

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
      console.log(res)
    } catch (err) {}
  };

  return (
    <>
      <Grid container>
        <Box sx={{ display: "flex",width: "100%", mx: 3, my: 1 }}>
          <Link to={`/class/${id}`} style={{ textDecoration: "none" }}>
            <Button variant="outlined" startIcon={<ArrowBackIcon />}>
              Back
            </Button>
          </Link>
        </Box>
        <Paper
          elevation={2}
          sx={{ display: "flex",justifyContent:"space-between",width: "100%", mx: 3, my: 1 }}
        >
          <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Box p={2} sx={{ display: "inline-flex" }}>
              <label htmlFor="contained-button-file">
                <Input
                  id="contained-button-file"
                  type="file"
                  name="file"
                  onChange={importFile}
                />
                <LoadingButton
                  startIcon={<FileUploadIcon />}
                  loading={loading}
                  loadingPosition="start"
                  variant="contained"
                  component="span"
                  style={{ backgroundColor: "#3f51b5" }}
                >
                  Update Student List
                </LoadingButton>
              </label>
              <Button startIcon={<GetAppIcon />} variant="default">
                Export Students Grade
              </Button>
            </Box>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Box p={2} sx={{ justifyContent: "flex-end" }} style={{}}>
              <CSVLink
                data={studentImportTemp}
                filename={"students.csv"}
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Button startIcon={<GetAppIcon />} variant="default">
                  Students Import Template
                </Button>
              </CSVLink>

              <CSVLink
                data={gradeImportTemp}
                filename={"grades.csv"}
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Button startIcon={<GetAppIcon />} variant="default">
                  Grades Import Template
                </Button>
              </CSVLink>
            </Box>
          </Grid>
        </Paper>

        <TableContainer component={Paper} sx={{ display: "flex", width: "100%", mx: 3, my: 1 }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left">StudentID</TableCell>
                <TableCell >Full Name</TableCell>
                {
                  exercise.map(({ id, name }, index) => 
                    <TableCell key={id}>
                      {name}
                      <IconButton 
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        size="small"
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                          style: {
                            maxHeight:  '30px',
                            width: '15ch',
                            paddingTop: '5px'
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
                              onClick={() => setExerciseId(id)}
                            />
                            Import grade
                          </label>
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  )
                }
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.studentId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" component="th" scope="row">
                    {row.studentId}
                  </TableCell>
                  {
                    row.student_id ?
                      <Link to={`inforStudent/${row.student_id}`}>
                        <TableCell >{row.studentName}</TableCell>
                      </Link>
                      :
                      <TableCell >{row.studentName}</TableCell>
                  }
                  {
                    row.exercises.map((item, index) => (
                      <TableCell key={index}>
                        {item.point}/{exercise[index].point}
                      </TableCell>
                    ))
                  }
                  <TableCell align="right">{row.totalGrade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}
