import React from 'react';
import { Button, Avatar, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

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
  const { announcements, setAnnouncements } = props;
  const classes = useStyles();
  console.log(Object.values(announcements));
  let today = new Date().toLocaleString();
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
            {Object.values(announcements).map((i) => {
              const { title, start_date, end_date } = i;
              // console.log(i.key);
              return (
                <TableRow key={i.key}>
                  <TableCell className={classes.tableCellBody} align="center">
                    {title}
                  </TableCell>
              
                  <TableCell className={classes.tableCellBody} align="center">
                    {start_date}
                  </TableCell>
                  <TableCell className={classes.tableCellBody} align="center">
                    {end_date}
                  </TableCell>
                  <TableCell className={classes.tableCellBody} align="center">
                    <Button disabled variant="contained" color="primary" >Active</Button>
                  </TableCell>
                  <TableCell className={classes.tableCellBody} align="right">
                    <Avatar className={classes.avatar}>
                      <EditIcon className={classes.icons} />
                    </Avatar>
                  </TableCell>
                  <TableCell className={classes.tableCellBody} align="right">
                    <Avatar className={classes.avatarDelete}>
                      <DeleteOutlineIcon className={classes.icons} />
                    </Avatar>
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