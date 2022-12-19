import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Spinner () {
  return (
    <Box sx={{ display: 'flex', justifyContent:'center', backgroundColor:'black', height:'50vh', paddingTop:'50vh' }}>
      <CircularProgress />
    </Box>
  );
}
