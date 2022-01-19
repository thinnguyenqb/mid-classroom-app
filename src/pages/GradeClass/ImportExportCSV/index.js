import React from "react";
import {
  Grid,
  Paper,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { API_URL } from "../../../utils/config";
import LoadingButton from "@mui/lab/LoadingButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { CSVLink } from "react-csv";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useHistory } from "react-router-dom";

const studentImportTemp = [
  ["StudentId", "Fullname"],
  ["1712787", "Nguyễn Văn Thìn"],
  ["1712788", "Trần Thiên Quàng"],
  ["18120000", "Nguyễn Công Sơn"],
];

const gradeImportTemp = [
  ["StudentId", "Grade"],
  ["1712787", "70"],
  ["1712788", "80"],
  ["18120000", "90"],
];

const Input = styled("input")({
  display: "none",
});

export default function ImportExportCSV({ id, loading, setLoading, gradeBoard }) {
  const token = localStorage.getItem("access_token");
  const history = useHistory()
  const importFile = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      await axios.post(`${API_URL}/classroom/${id}/import-student`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      history.go(0)
    } catch (err) {}
  };

  

  return (
    <React.Fragment>
      <Paper
            elevation={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              mx: 3,
              my: 1,
            }}
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

                <CSVLink
                  data={gradeBoard}
                  filename={"AllClassroom.csv"}
                  target="_blank"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Button startIcon={<GetAppIcon />} variant="default">
                    Export Students Grade
                  </Button>
                </CSVLink>
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
    </React.Fragment>
  );
}
