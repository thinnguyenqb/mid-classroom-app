import React, { useState, useEffect } from "react";
import {
  Container,
  IconButton,
  Typography,
  Grid,
  Avatar,
  Button,
  Box,
  Divider,
} from "@mui/material";
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

function Exercise() {
  const token = localStorage.getItem("access_token");
  const { id, exerciseid, studentid } = useParams();
  const [dataReport, setDataReport] = useState({});
  const [chat, setChat] = useState([]);
  const auth = useSelector((status) => status.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getReportData = async () => {
      setLoading(true);
      await axios
        .get(`${API_URL}/exercise/report-grade/${exerciseid}/${studentid}`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          //console.log(res);
          setDataReport(res.data.dataReport);
          setChat(res.data.dataReport.chat);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getReportData();
  }, [token, studentid, exerciseid]);

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
            <Link
              to={`/class/${id}/gradeClass`}
              style={{ textDecoration: "none" }}
            >
              <Button variant="outlined" startIcon={<ArrowBackIcon />}>
                Back
              </Button>
            </Link>
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
                        {dataReport.studentName} - {dataReport.studentId}
                      </Typography>
                      <Typography variant="h6" gutterBottom component="div">
                        {moment(dataReport.createdAt).format("L, h:mm:ss A")}
                      </Typography>
                    </Grid>
                    <Typography sx={{ color: "#3c4043", fontWeight: "500" }}>
                      {dataReport.curPoint}/{dataReport.defPoint} Điểm
                    </Typography>

                    <Divider sx={{ mt: 1.5 }} />
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
                        <Typography variant="h5" gutterBottom component="div">
                          Điểm mong đợi
                        </Typography>
                        <Typography variant="h6" gutterBottom component="div">
                          {dataReport.pointExpect}/{dataReport.defPoint}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid
                      item
                      container
                      alignItems="center"
                      sx={{mt: 1}}
                    >
                      <IconButton
                        className="menu-button"
                      >
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
    </Grid>
  );
}

export default Exercise;
