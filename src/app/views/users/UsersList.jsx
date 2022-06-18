import React from 'react'

// material
import { Container, Stack, Typography,Grid } from '@mui/material';
import { Fab  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import UsersCard from './UsersCard';

const UsersList = () => {
    const navigate = useNavigate()

    const users = [{
      id:1,
      name:"genesis engineering",
     office:"#312",
    cnic:"323-23332-3",
      coverImage:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    
    },{
      id:2,
      name:"genesis engineering",
      office:"#312",
      cnic:"323-23232-3",
      coverImage:'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    
    },{
      id:3,
      name:"genesis engineering",
      office:"#312",
      cnic:"323-233232-3",
      coverImage:'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  
    },{
      id:4,
      name:"genesis engineering",
      office:"#312",
      cnic:"3323-23332-3",
      coverImage:'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },]
      
    return (
      <>
  
  
       <Container>
            <br></br>
          <Typography variant="h4" sx={{ mb: 5 }}>
          Employee
          </Typography>
          <Grid container spacing={3} >
        {users.map((user) => (
          <Grid key={user.id} item lg={4} xs={12} sm={6} md={4}  >
            <UsersCard user={user} />
          </Grid>
        ))}
      </Grid>
          <br></br>
          <br></br>
          <br></br>
        </Container>
      </>
       
  
    )
  }


export default UsersList;
