import React from 'react'
import { useNavigate } from 'react-router-dom'
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const EmployeesCard = (user) => {

  const navigate = useNavigate()
  const viewUser = (user)=>{
    navigate('/user/details')
  };

  const UserImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
  });
  

  return (
    // <div>Hello Card</div>
    <Card onClick={()=>viewUser(user)} >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <UserImgStyle alt="No Image" src={user.user.coverImage} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }} >
          <Typography variant="subtitle2" noWrap>
            {user.user.name}
          </Typography>
     

        <Stack direction="row" alignItems="center" justifyContent="space-between"style={{marginTop:"10px"}}>
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text',
                textDecoration: ''
              }}
            >
              Office: &nbsp;
            {user.user.office}
            </Typography>
           
          </Typography>
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text',
                textDecoration: ''
              }}
            >
              CNIC: &nbsp;
            {user.user.cnic}
            </Typography>
            
          </Typography>
        </Stack>
      </Stack>
    </Card>
  )
}

export default EmployeesCard