import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditUserForm from "./EditUserForm";

// Material ui customization
const useStyles = makeStyles({
  
  table: {
    width: "90%",
    margin: "auto",
  },
  tableHead: {
    backgroundColor: "#004578",
    
  },
  tableCellHead: {
    color: "white",
    fontSize: "1.5rem",
    fontFamily: "Roboto",
    lineHeight: "3rem",
  },
  tableCellHeader: {
    fontSize: "1.5rem",
    fontFamily: "Roboto",
  },
  tableCellBody: {
    fontSize: "1.5rem",
    fontFamily: "Roboto",
  }
});

export default function UsersTable(props) {
  const classes = useStyles();

  // console.log("users: ", users);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow className={classes.tableHead}>
            <TableCell className={classes.tableCellHead} >Name</TableCell>
            <TableCell className={classes.tableCellHead} align="right">Email</TableCell>
            <TableCell className={classes.tableCellHead} align="right">HCBC Number</TableCell>
            <TableCell className={classes.tableCellHead} align="right">HCBC Status</TableCell>
            <TableCell className={classes.tableCellHead} align="right">Admin</TableCell>
            <TableCell className={classes.tableCellHead} align="right">Active Rider</TableCell>
            <TableCell className={classes.tableCellHead} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map((user) => {
            const {
              first_name,
              last_name,
              email,
              hcbc_number,
              hcbc_active,
              is_admin,
              active,
            } = user.attributes;
            return (
              <TableRow key={user.id}>
                <TableCell className={classes.tableCellBody} component="th" scope="row">
                  {`${first_name} ${last_name}`}
                </TableCell>
                <TableCell className={classes.tableCellBody} align="right">{email}</TableCell>
                <TableCell className={classes.tableCellBody} align="right">{hcbc_number}</TableCell>
                <TableCell className={classes.tableCellBody} align="right">
                  {hcbc_active ? "Up to date" : "Needs confirmation"}
                </TableCell>
                <TableCell className={classes.tableCellBody} align="right">
                  {is_admin ? "Admin" : "Rider"}
                </TableCell>
                <TableCell className={classes.tableCellBody} align="right">
                  {active ? "Yes" : "No"}
                </TableCell>
                <TableCell className={classes.tableCellBody} align="right">
                  <EditUserForm user={user} onSubmit={props.onChange} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
