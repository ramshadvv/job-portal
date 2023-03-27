import React from 'react';
import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';

function StaffViewTable(props) {
  const { viewJob } = props;

  return (
    <Box>
      <TableContainer>
        <Table sx={{ minWidth: 550 }}>
          <TableBody>
            <TableRow key={'1'}>
              <TableCell sx={{ fontWeight: 700 }}>Company ID</TableCell>
              <TableCell>{viewJob.company_id}</TableCell>
            </TableRow>
            <TableRow key={'1'}>
              <TableCell sx={{ fontWeight: 700 }}>Username</TableCell>
              <TableCell>{viewJob.username}</TableCell>
            </TableRow>
            <TableRow key={'1'}>
              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
              <TableCell>{viewJob.email}</TableCell>
            </TableRow>
            <TableRow key={'1'}>
              <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
              <TableCell>{viewJob.phone}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default StaffViewTable;