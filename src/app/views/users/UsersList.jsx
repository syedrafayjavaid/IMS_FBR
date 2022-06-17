import React, { useEffect } from 'react'

// material
import { Container, Stack, Typography,Grid } from '@mui/material';
import { Fab  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import UsersCard from './UsersCard';
import axios from 'axios';

const UsersList = () => {
    const navigate = useNavigate()

    const [users, setUsers] = React.useState([]);

    useEffect(() => {
      getAlldata();
    }, []);
    const getAlldata = () => {
      axios.get('http://192.168.18.117:5000/api/v1/employee').then((res) => {
        console.log(res)
        setUsers(res.data.data);
      }).catch((error) => {
        console.log(error, 'error');
      })
    }

    console.log(users)
      
    return (
      <>
  
  
       <Container>
            <br></br>
          <Typography variant="h4" sx={{ mb: 5 }}>
          Employee
          </Typography>
          <Grid container spacing={3} >
        {users.map((user) => (
          <Grid key={user.id} item xs={12} sm={6} md={3}  >
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
