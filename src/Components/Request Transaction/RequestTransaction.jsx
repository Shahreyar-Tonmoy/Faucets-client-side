import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Table } from "react-bootstrap";
import { useQuery, useQueryClient } from "@tanstack/react-query"; // Import useQuery and useQueryClient
import axios from "axios";

export default function RequestTransaction() {
  const [value, setValue] = React.useState("1");
  const queryKey = ["repoData"];
  const queryClient = useQueryClient(); // Access the query client

  // Use React Query's useQuery hook to fetch data
  const { data } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetch("https://job-task-server-side-gules.vercel.app/api/getrequests");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json(); // Assuming the response is JSON
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const convertTo12HourFormat = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Convert hours to 12-hour format
    const formattedHours = hours % 12 || 12;

    // Add leading zero if minutes or seconds are less than 10
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    // Determine if it's AM or PM
    const period = hours < 12 ? "AM" : "PM";

    // Form the final time string in 12-hour format
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
  };





  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Typography sx={{ mt: "25px", fontSize: "18px", fontWeight: "medium" }}>
        Request History
      </Typography>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, width: "50%", borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="ETH Transaction History" value="1" />
            <Tab label="TestLink Transaction History" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <TableContainer sx={{ width: "50%" }} component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Sr</TableCell>
                  <TableCell align="center">Time,</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Hash</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{convertTo12HourFormat(row?.createdAt)}</TableCell>
                    <TableCell align="center">{row?.requestType2}</TableCell>
                    <TableCell align="center">{row?.hash}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value="2">
          <TableContainer sx={{ width: "50%" }} component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
              <TableRow>
                  <TableCell align="center">Sr</TableCell>
                  <TableCell align="center">Time,</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Hash</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {data?.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{convertTo12HourFormat(row?.createdAt)}</TableCell>
                    <TableCell align="center">{row?.requestType2}</TableCell>
                    <TableCell align="center">{row?.hash}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
