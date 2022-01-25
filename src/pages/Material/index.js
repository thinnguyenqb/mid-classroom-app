import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Button,
  Container,
  Typography,
  Link,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ControlledEditor from "./ControlledEditor";
import CopyClipboard from "./CopyClipboard";
import GradeStructure from "./GradeStructure";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useParams } from "react-router-dom";
import PeopleButton from "../../components/PeopleButton/index";
import ExercisesButton from "./../../components/ExercisesButton/index";
import GradeButton from "../../components/GradeButton";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  padding: "16px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  variant: "outlined",
}));

const styles = {
  infoLabel: {
    minWidth: 120,
    display: "inline-block",
    fontWeight: 600,
    fontStyle: "normal",
    fontSize: "0.875rem",
  },
  sizeText: {
    fontSize: "0.875rem",
  },
};

const Material = () => {
  const [addPost, setAddPost] = useState(false);
  const [value, setValue] = useState("");
  const { id } = useParams();
  const [classes, setClasses] = useState([]);
  const token = localStorage.getItem("access_token");
  const [teacherName, setTeacherName] = useState("");
  const { auth } = useSelector(state => state)

  useEffect(() => {
    if (token) {
      const getDetailClass = async () => {
        try {
          axios
            .get(`${API_URL}/classroom/detail/${id}`, {
              headers: { Authorization: token },
            })
            .then((result) => {
              setClasses(result.data);
              setTeacherName(result.data.teacher[0].name);
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (error) {
          console.log(error.response.data.msg);
        }
      };
      getDetailClass();
    }
  }, [token, id]);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ marginTop: 11, maxWidth: "1000px !important" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper xs={{ padding: 0, borderRadius: "10px !important" }}>
                <Accordion disableGutters xs={{ borderRadius: "10px" }}>
                  <AccordionSummary
                    id="panel1a-header"
                    aria-controls="panel1a-content"
                    sx={{
                      height: 250,
                      width: "100%",
                      background: `radial-gradient(
                          45rem 18.75rem ellipse at bottom right,
                          #3f51b5,
                          transparent
                        ), 
                        url('https://www.gstatic.com/classroom/themes/img_code.jpg')`,
                      alignItems: "end",
                      borderRadius: "5px",
                    }}
                  >
                    <Grid sx={{ width: "100%" }}>
                      <Typography sx={{ color: "white", fontSize: 36 }}>
                        {classes.name}
                      </Typography>
                      <Typography sx={{ color: "white", fontSize: 20 }}>
                        {classes.desc}
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <ExercisesButton id={id} />
                      <PeopleButton id={id} />
                      <GradeButton id={id} />
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <b style={styles.infoLabel}>Room:</b>
                      <span style={styles.sizeText}>{classes.room}</span>
                    </Typography>
                    <Typography>
                      <b style={styles.infoLabel}>Topic:</b>
                      <span style={styles.sizeText}>{classes.topic}</span>
                    </Typography>
                    <Typography>
                      <b style={styles.infoLabel}>Teacher:</b>
                      <span style={styles.sizeText}>{teacherName}</span>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid>
            <Grid item xs={3.5}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Item sx={{boxShadow: 'none'}}>
                    <Grid container alignItems={"center"}>
                      <Grid item>
                        <Typography>
                          <span style={styles.infoLabel}>Invite code</span>
                        </Typography>
                      </Grid>
                      <Grid item sx={{ ml: "auto" }}>
                        <CopyClipboard classCode={classes.id} />
                      </Grid>
                    </Grid>
                    <Box
                      sx={{
                        paddingTop: 2,
                      }}
                    >
                      <p
                        style={{
                          fontWeight: "400",
                          fontSize: "1 rem",
                          textAlign: "center",
                          backgroundColor: "#66b2ff26",
                          color: "black",
                          borderRadius: "5px",
                          padding: "3px",
                        }}
                      >
                        {classes.id}
                      </p>
                    </Box>
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <Item sx={{boxShadow: 'none'}}>
                    <Typography>
                      <span style={styles.infoLabel}>
                        Current grade structure
                      </span>
                    </Typography>
                    <Divider sx={{ mt: 1 }} />
                    <GradeStructure class_id={classes.id} />
                  </Item>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8.5}>
              <Item >
                {addPost ? (
                  <Box>
                    <ControlledEditor value={value} setValue={setValue} />
                    <Grid container justifyContent="end" sx={{ marginTop: 2 }}>
                      <Button
                        sx={{ marginRight: 1 }}
                        color="primary"
                        aria-label="add"
                        onClick={() => setAddPost(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        aria-label="add"
                        sx={{ backgroundColor: "#3f51b5" }}
                        onClick={() => setAddPost(false)}
                      >
                        Post
                      </Button>
                    </Grid>
                  </Box>
                ) : (
                    <>
                      <Box
                        onClick={() => setAddPost(true)}
                        sx={{ marginBottom: 1, "&:hover": { cursor: "pointer" } }}
                      >
                        <Grid container alignItems="center">
                          <Avatar src={auth.user.avatar} height="35" wihth="35"></Avatar>
                          <Link
                            sx={{
                              marginLeft: "10px",
                              color: "rgba(0,0,0,0.55)",
                              textDecoration: "none",
                              "&:hover": {
                                color: "#000",
                                cursor: "pointer",
                              },
                            }}
                          >
                            Annouce something to your class
                          </Link>
                        </Grid>
                      </Box>
                     
                    </>
                )}
              </Item>
              <Item sx={{mt: 3, boxShadow: 'none'}}>
                <Grid
                  container
                  direction={"column"}
                  justify={"center"}
                  alignItems={"center"}
                >
                  <Box
                    component="img"
                    sx={{
                      width: "20%",
                    }}
                    alt="The house from the offer."
                    src="https://res.cloudinary.com/ericnguyen-cop/image/upload/v1643095971/Classroom/vrtdkpjdcksm9zooxxvl.png"
                  />
                  <Typography>
                    <span style={styles.infoLabel}>
                      Đây là nơi đăng thông báo cho lớp học của bạn
                    </span>
                  </Typography>
                  <Typography>
                    Sử dụng bảng tin để thông báo và trả lời câu hỏi của học viên
                  </Typography>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Material;
