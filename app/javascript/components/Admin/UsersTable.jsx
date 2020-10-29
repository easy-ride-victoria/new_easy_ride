import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function UsersTable() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get("/api/v1/users").then((response) => {
      console.log(response);
      setUsers(response.data.data);
    });
  }, []);
  // console.log("users: ", users);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">HCBC Number</StyledTableCell>
            <StyledTableCell align="right">HCBC Status</StyledTableCell>
            <StyledTableCell align="right">Admin</StyledTableCell>
            <StyledTableCell align="right">Active Rider</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            const {
              id,
              first_name,
              last_name,
              email,
              hcbc_number,
              hcbc_active,
              is_admin,
              active,
            } = user.attributes;
            return (
              <StyledTableRow key={id}>
                <StyledTableCell component="th" scope="row">
                  {`${first_name} ${last_name}`}
                </StyledTableCell>
                <StyledTableCell align="right">{email}</StyledTableCell>
                <StyledTableCell align="right">{hcbc_number}</StyledTableCell>
                <StyledTableCell align="right">
                  {hcbc_active ? "Up to date" : "Needs confirmation"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {is_admin ? "Admin" : "Rider"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {active ? "Yes" : "No"}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
