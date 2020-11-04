import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditHorseForm from "./EditHorseForm";

// Material ui customization
const useStyles = makeStyles({
  table: {
    width: "90%",
    margin: "auto",
  },
  tableHead: {
    backgroundColor: "#a47638",
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
  },
});

export default function HorsesTable(props) {
  const classes = useStyles();
  const { horses, onChange } = props;

  // console.log("horses: ", horses);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow className={classes.tableHead}>
            <TableCell className={classes.tableCellHead}>
              Profile Picture
            </TableCell>
            <TableCell className={classes.tableCellHead} align="right">
              Name
            </TableCell>
            <TableCell className={classes.tableCellHead} align="right">
              Breed
            </TableCell>
            <TableCell className={classes.tableCellHead} align="right">
              Date of Birth
            </TableCell>
            <TableCell className={classes.tableCellHead} align="right">
              Active
            </TableCell>
            <TableCell className={classes.tableCellHead} align="center">
              Edit
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {horses.map((horse) => {
            const {
              name,
              breed,
              date_of_birth,
              active,
              profile_picture,
            } = horse.attributes;
            return (
              <TableRow key={horse.id}>
                <TableCell>
                  <img src={profile_picture} />
                </TableCell>
                <TableCell
                  className={classes.tableCellBody}
                  align="right"
                  component="th"
                  scope="row"
                >
                  {name}
                </TableCell>
                <TableCell className={classes.tableCellBody} align="right">
                  {breed}
                </TableCell>
                <TableCell className={classes.tableCellBody} align="right">
                  {date_of_birth}
                </TableCell>
                <TableCell className={classes.tableCellBody} align="right">
                  {active ? "Yes" : "No"}
                </TableCell>
                <TableCell>
                  <EditHorseForm
                    horse={horse}
                    onSubmit={onChange}
                  ></EditHorseForm>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
