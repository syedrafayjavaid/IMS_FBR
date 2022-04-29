import React ,{ useRef }  from 'react'
import { Box, styled } from '@mui/system'
import { Card,CardContent,Grid } from '@mui/material'
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import { Fab  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import ALLProductsTable from 'app/components/products/AllProductTable';
import { Tune } from '@mui/icons-material';






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


const ProductDetail = () => {

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
    
            <Tooltip title="Add Product">
                <Fab color="secondary" aria-label="Add" size="medium"  style={{zIndex:999,right:"4vw",bottom:"10vh",position:"fixed"}} onClick={()=>navigate('/products/add')} >
                        <AddIcon />
                    </Fab>
                </Tooltip>


          <Card elevation={3} sx={{ pt: '20px', mb: 10 ,margin:"50px"}}>
                <CardHeader>
                <Title>PRODUCT DETAILS</Title>
                </CardHeader>
                    <hr></hr>
                <Grid container>
                <Grid item lg={5} md={5} sm={12} xs={12}  >
                            <ContentBox >
                                <IMG
                                src="https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg"
                                alt=""
                                />
                            </ContentBox>

                </Grid>
                <Grid item lg={7} md={7} sm={12} xs={12} style={{padding: "1rem 3rem"}}>
                <h3>Apple MacBook X512FL-EJ723T 10th Gen Intel Core i9</h3>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box style={{marginRight: "9.9rem"}}>
                            <span>Product type:</span>
                            <span>Saleable</span>
                        </Box>
                        <Box>
                            <span>Average Price:</span>
                            <span>$250</span>
                        </Box>  
                    </Box>
                    
                    <hr></hr>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                    </Box>
                    
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
                    I have ved not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
                    I have ved not only five centuries, but also the leap i essentially unchanged. It was popularised in the 1960s with the release of Le.
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
            <ALLProductsTable ></ALLProductsTable>
            </Card>
                
                :""}
            
   
   
            </>
  


   
  )
}

export default ProductDetail