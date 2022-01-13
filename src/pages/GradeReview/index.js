import React, { useState, useEffect } from "react";
import {
  Container,
  List,
  Grid,
  ListItem,
  ListItemText,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const useStyles = makeStyles({
  listItem: {
    mb: 0.5,
    boxShadow:
      "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
    borderRadius: "2rem",
    backgroundColor: "#e2e7ff",
    "&:not(:hover)": {
      boxShadow: "none",
      border: "1px solid #ccc",
      borderRadius: "0.5rem",
    },
  },
  listItemText: {
    width: "900px",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pl: 3, maxWidth: "600px" }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function GradeReview() {
  const token = localStorage.getItem("access_token");
  const auth = useSelector((status) => status.auth);
  const [teacher, setTeacher] = useState([]);
  const classes = useStyles();
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [reportList, setReportList] = useState([]);
  
  useEffect(() => {
    if (token) {
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
      const getGradeClass = async () => {
        try {
          axios
            .get(`${API_URL}/classroom/${id}/all-report-student`, {
              headers: { Authorization: token },
            })
            .then((result) => {
              console.log(result.data.data);
              setReportList(result.data.data);
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
    }
  }, [token, id]);

  const checkTeacher = (user_cur, teacher) => {
    for (let i = 0; i < teacher.length; i++) {
      if (teacher[i].teacherId === user_cur)
        return true
    }
    return false
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      {checkTeacher(auth.user._id, teacher) ? (
        <>
          <Box sx={{ mt: 2 }}>
            <Link to={`/class/${id}/gradeClass`} style={{ textDecoration: "none" }}>
              <Button variant="outlined" startIcon={<ArrowBackIcon />}>
                Back
              </Button>
            </Link>
          </Box>
          <Container sx={{ maxWidth: "1000px !important", mt: 2 }}>
            <Box
              sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
                height: 500,
              }}
            >
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                <Tab label="Chưa giải quyết" {...a11yProps(0)} />
                <Tab label="Đã giải quyết" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <List>
                  {reportList.map((report, index) => (
                    <Box key={index}>
                      {!report.isFinal ? (
                        <ListItem
                          button
                          className={classes.listItem}
                          secondaryAction={
                            <Link
                              to={`/class/${id}/gradeClass/${report.exerciseId}/${report.studentId}`}
                              style={{ textDecoration: "none" }}
                            >
                              <Button>Chi tiết</Button>
                            </Link>
                          }
                        >
                          <Avatar sx={{ backgroundColor: "#3f51b5", mr: 2 }}>
                            <AssignmentOutlinedIcon />
                          </Avatar>
                          <ListItemText
                            primary={report.exerciseName}
                            secondary={`${report.studentName} - MSSV: ${report.studentId}`}
                            className={classes.listItemText}
                          />
                        </ListItem>
                      ) : (
                        <></>
                      )}
                    </Box>
                  ))}
                </List>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <List>
                  {reportList.map((report, index) => (
                    <Box key={index}>
                      {report.isFinal ? (
                        <ListItem
                          button
                          className={classes.listItem}
                          secondaryAction={
                            <Link
                              to={`/class/${id}/gradeClass/${report.exerciseId}/${report.studentId}`}
                              style={{ textDecoration: "none" }}
                            >
                              <Button>Chi tiết</Button>
                            </Link>
                          }
                        >
                          <Avatar sx={{ backgroundColor: "#3f51b5", mr: 2 }}>
                            <AssignmentOutlinedIcon />
                          </Avatar>
                          <ListItemText
                            primary={report.exerciseName}
                            secondary={`${report.studentName} - MSSV: ${report.studentId}`}
                            className={classes.listItemText}
                          />
                        </ListItem>
                      ) : (
                        <></>
                      )}
                    </Box>
                  ))}
                </List>
              </TabPanel>
            </Box>
          </Container>
        </>
      ) : <></>
      }
    </Grid>
  );
}

export default GradeReview;
