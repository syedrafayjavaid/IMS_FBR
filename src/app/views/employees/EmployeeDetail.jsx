import { Card, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { Box, styled } from '@mui/system';
import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AllEmployeesTable from './AllEmployeesTable';

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


const EmployeeDetail = () => {

    const { state } = useLocation();

    console.log(state);

    const navigate = useNavigate()

    // States
    const [showTable, setShowTable] = React.useState(false);



const showTbl = () => {
   
    setShowTable(true)

    
}


const myRef = useRef(null)
const executeScroll = () => scrollToRef(myRef)




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
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                alt=""
                                />
                            </ContentBox>

                </Grid>
                <Grid item lg={7} md={7} sm={12} xs={12} style={{padding: "1rem 3rem"}}>
                <h3>genesis engineering</h3>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box style={{marginRight: "9.9rem"}}>
                            <span>Office:</span>
                            <span>Islamabad</span>
                        </Box>
                        <Box>
                            <span>CNIC:</span>
                            <span>2323-2323-3</span>
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
                            <span style={{color: 'green'}}><b>12-26-2021</b></span>
                        </Box>
                        <Box>
                            <span>Modification Date: </span>
                            <span style={{color: 'green'}}><b>12-26-2021</b></span>
                        </Box>
                    </Box>

                    <hr></hr>
                    <Box>
                    <h4>Description: </h4>    
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, totam alias porro fugit maiores error non voluptate optio quis consectetur, veniam autem ea, commodi numquam placeat nulla aliquam. Sit, eum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos tempora blanditiis dignissimos voluptates accusantium odio nisi recusandae error iste accusamus doloremque doloribus itaque, quam totam? Maxime molestiae repudiandae delectus sed!
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
            <AllEmployeesTable></AllEmployeesTable>
            </Card>
                
                :""}
            
   
   
            </>
  


   
  )
}

export default EmployeeDetail