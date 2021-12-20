import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid, Paper, Box, Button } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../utils/config";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import GetAppIcon from "@mui/icons-material/GetApp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { CSVLink } from "react-csv";

const Input = styled("input")({
  display: "none",
});

const studentImportTemp = [
  ["studentid", "fullname"],
  ["1712787", "Nguyễn Văn Thìn"],
  ["1712788", "Trần Thiên Quàng"],
  ["1712789", "Nguyễn Công Sơn"],
];

const gradeImportTemp = [
  ["studentid", "grade"],
  ["1712787", "70"],
  ["1712788", "80"],
  ["1712789", "90"],
];

const initrows = 
  {
    id: "1712878",
    fullname: "NGuyen van a",
  };

export default function DenseTable() {
  const [rows, setRows] = useState([]);
  const [classes, setClasses] = useState(false);
  const [exercise, setExercise] = useState([])
  const { id } = useParams();
  const token = useSelector((state) => state.token);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      const getDetailClass = async () => {
        try {
          axios
            .get(`${API_URL}/classroom/detail/${id}`, {
              headers: { Authorization: token },
            })
            .then((result) => {
              console.log(result.data);
              setClasses(result.data);
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
      const getGradeClass = async () => {
        try {
          axios
            .get(`${API_URL}/classroom/${id}/grade-student`, {
              headers: { Authorization: token },
            })
            .then((result) => {
              console.log(result.data);
              setExercise(result.data.exercise)
              setRows(result.data.studentGrade)
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
      getDetailClass();
      getGradeClass();
    }
  }, [token, id]);

  const importFile = async (e) => {
    e.preventDefault();
    try {
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
  console.log(rows)
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
                  exercise.map(({ id, name, grade }, index) => 
                    <TableCell key={id}>{name}</TableCell>
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
                  <TableCell >{row.studentName}</TableCell>
                  
                  {/* 
                  <TableCell >{row.bt2}</TableCell> */}
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
