import React ,{ useEffect, useRef }  from 'react'
import { Box, styled } from '@mui/system'
import { Card,CardContent,Grid } from '@mui/material'
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import { Fab  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Router, useLocation, useNavigate, useParams } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import ALLProductsTable from 'app/components/products/AllProductTable';
import { Tune } from '@mui/icons-material';
import AllUsersTable from './AllUserTable';
import axios from 'axios';
import moment from 'moment';






const label = { inputProps: { 'aria-label': 'Switch demo' } };

const CardHeader = styled('div')(() => ({
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
    display:"flex",
 
}))

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))


const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))


const ContentBox = styled(JustifyBox)(() => ({
    padding: '32px',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
    height:'100%'
}))





const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop) 


const UserDetail = () => {

    const navigate = useNavigate()

    // States
    const [showTable, setShowTable] = React.useState(false);



const showTbl = () => {
   
    setShowTable(true)

    
}


const myRef = useRef(null)
const executeScroll = () => scrollToRef(myRef)


const {state} = useLocation();

const [userData, setUserData] = React.useState(null)

useEffect(() => {
    getAlldata();
  }, []);
  const getAlldata = () => {
    axios.get(`http://192.168.18.117:5000/api/v1/employee/${state.id}`).then((res) => {
      setUserData(res.data.data);
    }).catch((error) => {
      console.log(error, 'error');
    })
  }

  const url='http://192.168.18.117:5000/';
  const imgeBaseUrl='uploads/';

  return (
            <>
    
          <Card elevation={3} sx={{ pt: '20px', mb: 10 ,margin:"50px"}}>
                <CardHeader>
                <Title>USER DETAILS</Title>
                </CardHeader>
                    <hr></hr>
                <Grid container>
                <Grid item lg={5} md={5} sm={12} xs={12}>
                            <ContentBox >
                                <IMG
                                src={url+imgeBaseUrl+userData?.photo}
                                alt=""
                                />
                            </ContentBox>

                </Grid>
                <Grid item lg={7} md={7} sm={12} xs={12} style={{padding: "1rem 3rem"}}>
                <h3>{userData?.name}</h3>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box style={{marginRight: "9.9rem"}}>
                            <span>Office:</span>
                            <span>{userData?.office}</span>
                        </Box>
                        <Box>
                            <span>CNIC:</span>
                            <span>{userData?.CNIC}</span>
                        </Box>  
                    </Box>
                    
                    {/* <hr></hr> */}
                    
                    {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <span>Categoery Name: </span>
                            <h4 style={{color: "rgba(52, 49, 76, 0.54)", margin: "0rem", paddingLeft: "0.8rem"}}>LAPTOPS</h4>
                        </Box>
                        <Box>
                            <span>Quantity: </span>
                            <span><b>23</b></span>
                        </Box>
                        <Box>
                            <span>Active</span>
                            <Switch {...label} defaultChecked />
                        </Box>
                    </Box> */}
                    
                    <hr></hr>
                    <Box sx={{ display: 'flex'}} style={{paddingTop: "1rem"}}>
                        <Box style={{marginRight: "8rem"}}>
                            <span>Created Date: </span>
                            <span style={{color: 'green'}}><b>{ moment(userData?.createdAt).format('MMMM d, YYYY') }</b></span>
                        </Box>
                        <Box>
                            <span>Modification Date: </span>
                            <span style={{color: 'green'}}><b>{userData?.modifiedAt === undefined ? moment(userData?.createdAt).format('MMMM d, YYYY') : moment(userData?.modifiedAt).format('MMMM d, YYYY')}</b></span>
                        </Box>
                    </Box>

                    <hr></hr>
                    <Box>
                    <h4>Description: </h4>    
                    {userData?.detail}
                    </Box>
                    <Box>
                        <br></br>
                        <Button variant='contained'  onClick={showTbl} >Inventory Details</Button>
                        
                    </Box>
                </Grid>

            
                </Grid>
            </Card>



   
    { showTable ===true ? 

   

            <Card  elevation={3} sx={{ pt: '20px', mb: 10 ,margin:"50px"}}>
            <AllUsersTable ></AllUsersTable>
            </Card>
                
                :""}
            
   
   
            </>
  


   
  )
}

export default UserDetail