import { makeStyles, Card, CardMedia, CardHeader, Avatar, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function VideoCard() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://i.ytimg.com/vi/04_Znifwy98/mqdefault.jpg"
        title="Paella dish"
      />
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon onClick={handleClick} /> */}
          </IconButton>
        }
        title={
          <Typography noWrap align="left">
            Hello
          </Typography>
        }
        subheader={
          <div>
            <Typography align="left" color="textSecondary" component="p">
              Channel Name
            </Typography>
            <Typography align="left" color="textSecondary" component="p">
              3K Views • 19 hours ago
            </Typography>
          </div>
        }
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          {/* <PlaylistPlayIcon onClick={handleClick} /> */}
          Add to Queue
        </MenuItem>
      </Menu>
    </Card>
  );
}
