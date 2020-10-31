import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "150px",
  },
  menuButton: {
    marginRight: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
    textAlign: "right",
    marginRight: "50px",
  },
  toolbar: {
    height: "100px",
    justifyContent: "center",
  },
}));

export default function MenuAppBar(props) {
  const { currentUser, setCurrentUser } = props;
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Link to={"/"}>
            <img
              src="https://photos.smugmug.com/photos/i-89Rgs5V/0/2d5e195f/O/i-89Rgs5V.png"
              height="75px"
            />
          </Link>
          <Typography variant="h2" className={classes.title}>
            Welcome {currentUser && currentUser.attributes.first_name}
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                {currentUser.attributes.is_admin && (
                  <Link to={"/admin/users"}>
                    <MenuItem onClick={handleClose}>Edit Users</MenuItem>
                  </Link>
                )}
                {currentUser.attributes.is_admin && (
                  <Link to={"/admin/horses"}>
                    <MenuItem onClick={handleClose}>Edit Horses</MenuItem>
                  </Link>
                )}
                <Link to={"/profile"}>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>
                <Link to={"/report"}>
                  <MenuItem onClick={handleClose}>Report</MenuItem>
                </Link>
                  <MenuItem onClick={() => setCurrentUser(null)}>
                    Logout
                  </MenuItem>
                
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
