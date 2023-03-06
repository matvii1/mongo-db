import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { AuthContainer } from '../common/AuthContainer';

export const LinksList = ({ links }) => {
  if (links.length < 1) {
    return (
      <AuthContainer>
        <Typography variant='h5'>No links yet</Typography>
      </AuthContainer>
    )
  }

  return (
    <>
      <Table aria-label="simple table" sx={{ maxWidth: 700, m: "2rem auto"}}>
        <TableHead>
          <TableRow>
            <TableCell>&#8470;</TableCell>
            <TableCell align="left">Your link</TableCell>
            <TableCell align="left">Short link</TableCell>
            <TableCell align="right">Open</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links.map((link, i) => (
            <TableRow
              key={link._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="left">{link.from}</TableCell>
              <TableCell align="left">{link.to}</TableCell>
              <TableCell align="right"><Link to={`/detail/${link._id}`} style={{ color: "black", textDecoration: "underline"}}>Open</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
