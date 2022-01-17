import axios from "axios";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
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
  


const VoteView = ()=>{

    const [leaders, setLeaders] = useState(null);
    const [message, setMessage] = useState(null);


    const username = localStorage.getItem("USERNAME");

    const getLeaders = async ()=>{
        await axios.get('http://127.0.0.1:5000/leaders')
        .then((resp)=>{
            console.log(resp)
            setLeaders(resp.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    const voteHandler = (leaderId)=>{
        const userId = localStorage.getItem("USER_ID");
        const data = {
            user_id: userId,
            leader_id: leaderId
        }

        axios.post('http://127.0.0.1:5000/vote', data)
        .then((resp)=>{
            const msg = resp.data.message
            setMessage(msg + ' !')
            console.log(msg);
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    useEffect(()=>{
        getLeaders()
    },[])

    return (
        <div style={{justifyContent : 'center', textAlign: 'center'}}>
            <h3>Welcome {username}</h3>
             {message ? <h3 style={{color : 'red'}}>{message}</h3> : null }
            {leaders ? 
            <div style={{padding : '60px', paddingTop: '0px'}}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Leader Name</StyledTableCell>
                            <StyledTableCell align="right">Cast your vote</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {leaders.map((row, keyI) => (
                        <StyledTableRow key={keyI}>
                        <StyledTableCell component="th" scope="row">
                            {row.first_name}  {row.last_name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <Button variant="contained" color='error' onClick={()=> voteHandler(row.id)}>Vote</Button>
                        </StyledTableCell>
      
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
            : null }

           
     

        </div>
    )

}


export default VoteView;