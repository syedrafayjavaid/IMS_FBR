import React from 'react'

// material
import { Container, Stack, Typography,Grid } from '@mui/material';
import { Fab  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import UsersCard from './UsersCard';
import EmployeesCard from './EmployeesCard';

const EmployeesList = () => {
      
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
            <EmployeesCard user={user} />
          </Grid>
        ))}
      </Grid>
        </Container>
      </>
       
  
    )
  }


export default EmployeesList;
