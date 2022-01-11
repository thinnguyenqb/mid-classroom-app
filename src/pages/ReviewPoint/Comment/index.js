import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Grid
} from "@material-ui/core";
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
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

const Comment = ({ chat }) => {
  console.log({chat})
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {chat.map((chat_item, index) => {
        return (
          <React.Fragment key={index}>
            <ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="avatar" src={chat_item.avatar} />
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
                      {chat_item.fullname}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      style={{color: '#858585'}}
                    >
                      &nbsp; - {moment(chat_item.createdAt).format('L')}
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
                      {chat_item.message}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Comment;