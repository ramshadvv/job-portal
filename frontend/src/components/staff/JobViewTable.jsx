import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';

function JobViewTable(props) {
  const { viewJob } = props;

  return (
    <Box>
      <TableContainer>
        <Table sx={{ minWidth: 550 }}>
          {/* <TableHead>
          <TableRow sx={{ fontSize: '25px', fontWeight: 500 }}>
            <TableCell>Title</TableCell>
            <TableCell>Task Type</TableCell>
            
          </TableRow>
        </TableHead> */}
          <TableBody>
            <TableRow key={'1'}>
              <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
              <TableCell>{viewJob.job_title}</TableCell>
            </TableRow>
            <TableRow key={'1'}>
              <TableCell sx={{ fontWeight: 700 }}>Salary</TableCell>
              <TableCell>{viewJob.job_salary + '-' +viewJob.job_salaryto}</TableCell>
            </TableRow>
            <TableRow key={'1'}>
              <TableCell sx={{ fontWeight: 700 }}>Job Type</TableCell>
              <TableCell>{viewJob.job_type}</TableCell>
            </TableRow>
            <TableRow key={'1'}>
              <TableCell sx={{ fontWeight: 700 }}>Qualification</TableCell>
              <TableCell>{viewJob.job_qualif}</TableCell>
            </TableRow>
            <TableRow key={'1'}>
              <TableCell sx={{ fontWeight: 700 }}>Job Description</TableCell>
              <TableCell>{viewJob.job_descri}</TableCell>
            </TableRow>
            <TableRow key={'1'}>
              <TableCell sx={{ fontWeight: 700 }}>Responsibilities</TableCell>
              <TableCell>{viewJob.job_respon}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default JobViewTable;