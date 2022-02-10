import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Grid,
  Box
} from "@material-ui/core";
import { TextInput } from './TextInput'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'none',
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  fonts: {
    fontWeight: "450",
    fontSize: "16px",
  },
  inline: {
    display: "inline"
  }
}));

const Comment = ({ item, auth }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(item.comments)
  console.log(comments)
  
  return (
    <>
      <List className={classes.root}
        component="nav"
        sx={{padding: '0px'}}
      >
        {comments.map((comment_item, index) => {
          return (
            <React.Fragment key={index}>
              <ListItem key={index} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="avatar" src={comment_item.avatar} sx={{ width: 30, height: 30 }}/>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Typography className={classes.fonts}>
                        {comment_item.fullname}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        style={{color: '#858585'}}
                      >
                        &nbsp; - {moment(comment_item.createdAt).format('L')}
                      </Typography>
                    </Grid>
                    
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {comment_item.message}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </React.Fragment>
          );
        })}
      </List>
      <Box sx={{borderTop: '1px solid #ccc', padding: "8px 16px 8px 16px",}}>
        <Grid container alignItems="center" direction="row">
          <Grid item xs={1}>
            <Avatar src={auth.user.avatar} sx={{ width: 30, height: 30 }} />
          </Grid>
          <Grid item xs={11}>
            <Grid>
              <TextInput post_id={item.post_id} user_id={auth.user._id} setComments={setComments}/>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Comment;