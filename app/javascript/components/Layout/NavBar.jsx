import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100px",
  },
  menuButton: {
    marginRight: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
    textAlign: "right",
    marginRight: "1em",
  },
  toolbar: {
    height: "80px",
    justifyContent: "center",
  },
  menuIcon: {
    height: "3rem",
    width: "3rem",
  },
}));

export default function NavBar(props) {
  const { currentUser } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    let token = document.querySelector('meta[name="csrf-token"]').content;
    fetch("/users/sign_out", {
      headers: { "X-CSRF-Token": token },
      method: "delete",
    }).then(() => (window.location.href = "/"));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Link to={"/"}>
            <img
              src="https://photos.smugmug.com/photos/i-89Rgs5V/0/2d5e195f/O/i-89Rgs5V.png"
              height="50px"
            />
          </Link>
          <Typography variant="h4" className={classes.title}>
            Welcome {currentUser && currentUser.attributes.first_name}
          </Typography>
          {currentUser && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon className={classes.menuIcon} />
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
                {currentUser.attributes.is_admin && (
                  <Link to={"/admin/reports"}>
                    <MenuItem onClick={handleClose}>Reports</MenuItem>
                  </Link>
                )}
                <Link to={"/profile"}>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>
                <Link to={"/report"}>
                  <MenuItem onClick={handleClose}>Report</MenuItem>
                </Link>
                <Link to={"/cancellation"}>
                  <MenuItem onClick={handleClose}>Cancellation</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
