import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits(props) {
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Typography component="p" variant="h4">
        {props.values}
      </Typography>
      {/* <Typography color="text.secondary" sx={{ flex: 1 }}>
        {props.dateupdate}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}