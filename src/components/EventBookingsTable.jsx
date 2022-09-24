import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const EventBookingsTable = ({ eventBookings }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow className="!bg-primary/40">
            <TableCell className="!font-bold !text-lg !font-Lexend">
              Serial Num
            </TableCell>
            <TableCell
              className="!font-bold !text-lg !font-Lexend"
              align="right"
            >
              Name
            </TableCell>
            <TableCell
              className="!font-bold !text-lg !font-Lexend"
              align="right"
            >
              Email
            </TableCell>
            <TableCell
              className="!font-bold !text-lg !font-Lexend"
              align="right"
            >
              Date
            </TableCell>
            <TableCell
              className="!font-bold !text-lg !font-Lexend"
              align="right"
            >
              Timeslot
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventBookings.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                className="!font-normal !text-base !font-Lexend"
                component="th"
                scope="row"
              >
                {index + 1}
              </TableCell>
              <TableCell
                className="!font-normal !text-base !font-Lexend"
                align="right"
              >
                {row.name}
              </TableCell>
              <TableCell
                className="!font-normal !text-base !font-Lexend"
                align="right"
              >
                {row.email}
              </TableCell>
              <TableCell
                className="!font-normal !text-base !font-Lexend"
                align="right"
              >
                {row.date}
              </TableCell>
              <TableCell
                className="!font-normal !text-base !font-Lexend"
                align="right"
              >
                {row.ts}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventBookingsTable;
