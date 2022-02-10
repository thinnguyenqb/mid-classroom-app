import React, {useState, useEffect} from "react";
import {
  Grid, Typography, Box, Paper, Avatar, IconButton, CircularProgress 
} from "@mui/material";
import axios from "axios";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import moment from 'moment'
import Comment from "./Comment";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";

const ContentPost = ({ postState, classId, auth }) => {
  const [post, setPost] = postState;
  const token = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token && classId) {
      setLoading(true)
      axios
        .get(
        process.env.REACT_APP_USER_BASE_URL + 
        `/post/${classId}`,{
          headers: { Authorization: token },
        })
        .then((res) => {
          setPost(res.data);
          setLoading(false)
        })
        .catch((err) => console.log(err));
    }
  }, [token, classId, setPost]);
  console.log(post)
  return (
    <React.Fragment>
      {
        !post || loading ?
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{mt: 2}}
          >
            <CircularProgress /> 
          </Grid>
          :
          <>
            {post.map((item, index) => (
              <Paper elevation={0} variant="outlined" sx={{mt: 2}} key={index}>
                <Box sx={{ borderBottom: '1px solid #ccc', padding: "16px", }}>
                  <Grid container spacing={2}>
                    <Grid item xs={1}>
                      <Avatar
                        src={item && item.sender ? item.sender.avatar: 'some default src'}
                        height="25" wihth="25"
                      ></Avatar>
                    </Grid>
                    <Grid item xs={10}>
                      <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                      >
                        <Typography
                          sx={{ fontSize: '16px', color: "#3f51b5" }}
                        >
                          {item && item.sender ? item.sender.fullname: "username"}
                        </Typography>
                        <Typography sx={{ fontSize: '14px' }}>
                        {moment(item.createdAt).format("L, h:mm:ss A")}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        sx={{
                          ml: "10px",
                          height: 40,
                          width: 40,
                        }}
                        className="menu-button"
                        //data-id={id}
                        //onClick={handleClickMenu}
                      >
                        <MoreVertOutlinedIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>  
                <Box>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      p: 2,
                      pl: 4,
                      fontSize: "13px",
                      lineHeight: "20px",
                      letterSpacing: "normal",
                    }}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  ></Grid>
                </Box>
                <Box sx={{ borderTop: '1px solid #ccc', }}>
                  <Grid item container alignItems="center" sx={{ ml: 2 }}>
                        <IconButton className="menu-button">
                          <PeopleOutlineRoundedIcon fontSize="large"/>
                        </IconButton>
                        <Typography
                          sx={{
                            mr: "auto",
                            color: "#3c4043",
                            fontWeight: "500",
                            fontSize: "16px",
                          }}
                        >
                          {item.comments.length} Nhận xét về lớp học
                        </Typography>
                      </Grid>
                  <Comment item={item} auth={auth}/>
                    
                </Box>  
              </Paper>
            ))}
          </>  
      }
    </React.Fragment>
  );
};

export default ContentPost;