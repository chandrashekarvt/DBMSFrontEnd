import axios from "axios";
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  




const Admin = () => {


    const [VD, setVD] = useState(null);


    const fetch = async ()=>{
        await axios.get('http://127.0.0.1:5000/adminDetails')
        .then((resp)=>{
            console.log(resp.data)
            setVD(resp.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        fetch()
    },[])

    return (
        <div style={{justifyContent: 'center', textAlign: 'center', alignItems:'center'}}>
            <h2>Vote Information</h2>

            {VD ? 
            <div style={{padding : '60px'}}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>USER</StyledTableCell>
                            <StyledTableCell align="right">LEADER</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {VD.map((row, keyI) => (
                        <StyledTableRow key={keyI}>
                        <StyledTableCell component="th" scope="row">
                            {row.user}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.leader}</StyledTableCell>
      
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
            : null }
        </div>
    )
}

export default Admin;