import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../utils/config";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Grid, Paper, Box, Button } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";

const initcolumns = [
  { field: "id", headerName: "Student ID", width: 150 },
  {
    field: "fullname",
    headerName: "Full Name",
    width: 180,
    editable: true,
  },
  {
    field: "bt1",
    headerName: "BT1",
    width: 150,
    editable: true,
  },
  {
    field: "bt2",
    headerName: "BT2",
    width: 150,
    editable: true,
  },

  {
    field: "total",
    headerName: "Total",
    width: 150,
    editable: true,
  },
];

const initrows = [
  {
    id: 1712700,
    fullname: "Edward Snowden",
    bt1: "100",
    bt2: "100",
    age: 35,
    total: 100,
  },
  {
    id: 1712701,
    fullname: "Edward Snowden",
    bt1: "100",
    bt2: "100",
    age: 35,
    total: 100,
  },
  {
    id: 1712702,
    fullname: "Edward Snowden",
    bt1: "100",
    bt2: "100",
    age: 35,
    total: 100,
  },
  {
    id: 1712703,
    fullname: "Edward Snowden3",
    bt1: "100",
    bt2: "100",
    age: 35,
    total: 100,
  },
  {
    id: 1712704,
    fullname: "Edward Snowden",
    bt1: "100",
    bt2: "100",
    age: 35,
    total: 100,
  },
];
export default function GradeClass() {
  const [columns, setColumns] = useState(initcolumns);
  const [rows, setRows] = useState(initrows);
  const { id } = useParams();
  const token = useSelector((state) => state.token);
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
              //   setClasses(result.data);
              //   setTeacherName(result.data.teacher.name);
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

      //   const getExercise = async () => {
      //     try {
      //       const res = await axios.get(
      //         `${API_URL}/exercise/list-exercise/${id}`,
      //         {
      //           headers: { Authorization: token },
      //         }
      //       );
      //       setAssignment(res.data);
      //     } catch (error) {
      //       if (error) {
      //         console.log(error.response.data.msg);
      //       }
      //     }
      //   };
      getDetailClass();
      //   getExercise();
    }
  }, [token, id]);
  useEffect(() => {
    if (token) {
      const getData = async () => {
        try {
          const res = await axios.get(
            `${API_URL}/exercise/list-exercise/${id}`,
            {
              headers: { Authorization: token },
            }
          );
          // setAssignment(res.data);
          console.log(res.data);
        } catch (error) {
          if (error) {
            console.log(error.response.data.msg);
          }
        }
      };

      getData();
    }
  }, [id, token]);
  return (
    <>
    <Grid container>
      <Paper elevation={2} sx={{ display: 'flex', width: '100%', mx: 2, my: 1 }}>
      <Grid xs={6} sx={{display: 'flex', justifyContent: 'flex-start' }}>
          <Box p={2} sx={{  display: 'inline-flex' }} style={{}}>
            <Button variant="contained">Upload Student List</Button>
            <Button startIcon={<GetAppIcon />} variant="default">
              Export Students Grade
            </Button>
          </Box>
          </Grid>
      <Grid xs={6} sx={{display: 'flex', justifyContent: 'flex-end' }}>
        
          <Box p={2} sx={{  justifyContent: 'flex-end' }} style={{ }}>
            <Button startIcon={<GetAppIcon />} variant="default">
              Students Import Template
            </Button>
            <Button startIcon={<GetAppIcon />} variant="default">
              Grades Import Template
            </Button>
          </Box>
          </Grid>
      </Paper>

      <Grid item xs={12}>
        <div style={{ height: 500}}>
          <DataGrid
            sx={{
                mx: 2,
                mt: 1,
                boxShadow: 2,
              }}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </Grid>
      </Grid>
    </>
  );
}
