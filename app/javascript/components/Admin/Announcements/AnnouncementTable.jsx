import React from 'react';
import { Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import moment from "moment";
import EditAnnouncement from './EditAnnouncement';

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

  console.log(Object.values(announcements));
  console.log("announcements array:", announcements);

  let today = new Date().toLocaleDateString();
  console.log("today is:",today);

  const convertDate = (date) => {
    console.log("date", date);
    return moment.utc(date).format("MM/DD/yyyy").toString();
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
              console.log(announcement);
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
                    {/* {const checking = moment(start_date).isBefore(today);
                    today } */}
                    {today === convertDate(start_date) || today === convertDate(end_date) ?
                      (<Button variant="contained" color="primary" >Active</Button>)
                      : (<Button disabled variant="contained" >Inactive</Button>) }
                  </TableCell>
                  <TableCell className={classes.tableCellBody} align="right">
                    <EditAnnouncement
                      announcement={announcement}
                      onSubmit={onChange}
                    />
                  </TableCell>
                  <TableCell className={classes.tableCellBody} align="right">
                    {/* <Avatar className={classes.avatarDelete}>
                      <DeleteOutlineIcon className={classes.icons} />
                    </Avatar> */}
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