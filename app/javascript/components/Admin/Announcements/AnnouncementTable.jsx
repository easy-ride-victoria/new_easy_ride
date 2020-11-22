import React from 'react';
import { Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import EditAnnouncement from './EditAnnouncement';
import DeleteAnnouncement from './DeleteAnnouncement';

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
  avatar: {
    backgroundColor: "#004578",
    width: "35px",
    height:"35px"
  },
  avatarDelete: {
    backgroundColor: "#780e0c",
    width: "35px",
    height:"35px",
  },
  icons: {
    width: "25px",
    height: "25px"
  },
});

const AnnouncementTable = (props) => {
  const classes = useStyles();
  const { announcements, onChange } = props;

  let today = new Date().toLocaleDateString('en-CA');
  console.log("today is:", today); //today is: 11/21/2020 -- AnnouncementTable.jsx:56 today is: 2020-11-21

  const convertDate = (date) => {
    return moment.utc(date).format("MMM/DD/yyyy").toString();
  };

  const isActive = (start, end) => {
    return moment(today).isBetween(start, end) || today === start || today === end;
  };
  
  const isFinished = (date) => {
    return moment(date).isBefore(today);
  };

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell className={classes.tableCellHead} align="center">Title</TableCell>
              <TableCell className={classes.tableCellHead} align="center">Start Date</TableCell>
              <TableCell className={classes.tableCellHead} align="center">End Date</TableCell>
              <TableCell className={classes.tableCellHead} align="center">Status</TableCell>
              <TableCell className={classes.tableCellHead} align="center">Edit</TableCell>
              <TableCell className={classes.tableCellHead} align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {announcements.map((announcement) => {
              const { title, start_date, end_date } = announcement.attributes;
              return (
                <TableRow key={announcement.id}>
                  <TableCell className={classes.tableCellBody} align="center" component="th" scope="row">
                    {title}
                  </TableCell>
                  <TableCell className={classes.tableCellBody} align="center">
                    {convertDate(start_date)}
                  </TableCell>
                  <TableCell className={classes.tableCellBody} align="center">
                    {convertDate(end_date)}
                  </TableCell>
                  <TableCell className={classes.tableCellBody} align="center">
                    {isActive(start_date, end_date) ? <Button variant="contained" color="primary" >Active</Button> :
                      (isFinished(end_date) ? <Button disabled variant="contained" >Finished</Button> : <Button variant="contained" color="secondary" >Upcoming</Button>)}
                  </TableCell>
                  <TableCell className={classes.tableCellBody} align="right">
                    <EditAnnouncement
                      announcement={announcement}
                      onSubmit={onChange}
                    />
                  </TableCell>
                  <TableCell className={classes.tableCellBody} align="right">
                    <DeleteAnnouncement
                      announcement={announcement}
                      onSubmit={onChange}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AnnouncementTable;