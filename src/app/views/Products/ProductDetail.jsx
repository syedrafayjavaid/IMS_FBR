// import React ,{useState, useEffect} from 'react'

// material
import React from 'react';
import { Container, Stack, Typography,Grid } from '@mui/material';
import ProductCard from '../../components/products/ProductCard'
import { Fab  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState ,useRef} from 'react';


import { makeStyles } from '@material-ui/core/styles';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Card, CardContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/system'
import axios from 'axios';
import moment from 'moment';


const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
  display: "flex",

}))

const CardHeader = styled('div')(() => ({
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}))
const Input = styled('input')({
  display: 'none',
});





const ProductsList = () => {

  const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

  const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))


  const IMG = styled('img')(() => ({
    width: '100%',
    height:'100%'
}))

const ContentBox = styled(JustifyBox)(() => ({
  padding: '32px',
  background: 'rgba(0, 0, 0, 0.01)',
}))

const {state} = useLocation();

const url='http://192.168.18.117:5000/';
const imgeBaseUrl='uploads/';

const [categoryName, setCategoryName] = React.useState('');
const [productTypeName, setProductTypeName] = React.useState('');

useEffect(() => {
  getAlldata();
}, []);
const getAlldata = () => {
  axios.get(`http://192.168.18.117:5000/api/v1/category/${state.product.categoryId}`).then((res) => {
    setCategoryName(res.data.data.name);
  }).catch((error) => {
    console.log(error, 'error');
  })
  axios.get(`http://192.168.18.117:5000/api/v1/productType/${state.product.productTypeId}`).then((res) => {
    setProductTypeName(res.data.data.name);
  }).catch((error) => {
    console.log(error, 'error');
  })
}
    
  return (
    <>
    
            {/* <Tooltip title="Add Product">
                <Fab color="secondary" aria-label="Add" size="medium"  style={{zIndex:999,right:"4vw",bottom:"10vh",position:"fixed"}} onClick={()=>navigate('/products/add')} >
                        <AddIcon />
                    </Fab>
                </Tooltip> */}


          <Card elevation={3} sx={{ pt: '20px', mb: 10 ,margin:"50px"}}>
                <CardHeader>
                <Title>PRODUCT DETAILS</Title>
                </CardHeader>
                    <hr></hr>
                <Grid container>
                <Grid item lg={5} md={5} sm={12} xs={12}  >
                            <ContentBox >
                                <IMG
                                src={url+imgeBaseUrl+state.product.photo}
                                alt=""
                                />
                            </ContentBox>

                </Grid>
                <Grid item lg={7} md={7} sm={12} xs={12} style={{padding: "1rem 3rem"}}>
                <h3>{state.product.name}</h3>

                    


                    <br></br>

                    <Grid container >
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                            <span>Product Type: </span>
                            <span style={{color: 'green'}}><b>{productTypeName}</b></span>
                        </Grid>
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Categoery Name: </span>
                            <span style={{color: 'green'}}><b>{categoryName}</b></span>
                        </Grid>  
                    </Grid>
                    
                    <hr></hr>

                    <Grid container >
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Purchase Price:   </span>
                            <span style={{color: 'green'}}><b>Rs 10000</b></span>
                        </Grid>
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Quantity: </span>
                            <span style={{color: 'green'}}><b>23</b></span>
                        </Grid>  
                    </Grid>
                    <hr></hr>
                    <Grid container >
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Purchaser Name:   </span>
                            <span style={{color: 'green'}}><b>Asadullah Baig</b></span>
                        </Grid>
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Vendor Name: </span>
                            <span style={{color: 'green'}}><b>Syed Rafay Javaid</b></span>
                        </Grid>  
                    </Grid>
                    <hr></hr>
                    <Grid container >
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Comment's:   </span>
                            <span style={{color: 'green'}}><b>In Use</b></span>
                        </Grid>
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Modified By: </span>
                            <span style={{color: 'green'}}><b>N/A</b></span>
                        </Grid>  
                    </Grid>
                    <hr></hr>
                    <Grid container >
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Created Date: </span>
                            <span style={{color: 'green'}}><b>{ moment(state.product?.createdAt).format('MMMM d, YYYY') }</b></span>
                        </Grid>
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Last Modified: </span>
                            <span style={{color: 'green'}}><b>{state.product.modifiedAt === undefined ? moment(state.product.createdAt).format('MMMM d, YYYY') : moment(state.product.modifiedAt).format('MMMM d, YYYY')}</b></span>
                        </Grid>  
                    </Grid>
                    <hr></hr>
                    <Box>
                    <span>Office Address:</span>   
                    <span style={{color: 'green'}}> CA-265, 7th Rd, Block F Satellite Town, Rawalpindi, 46300</span> 
                    </Box>
                    <hr></hr>
                    {/* <Grid container >
                        <Grid item  lg={12} md={12} sm={12} xs={12} >
                        <span>Barcode: </span>
                        <div >
                        <Barcode  value={value}  height='30px' ></Barcode>
                        </div>
                        
                        
                      
                     
                        </Grid>  
                    </Grid> */}
                
    
                    <br></br>
                   
                </Grid>
                </Grid>
            </Card>
   
            </>
     

  )
}



// qrcode 

const useStyles = makeStyles((theme) => ({
  conatiner: {
    marginTop: 10
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems:  'center',
    background: '#3f51b5',
    color: '#fff',
    padding: 20
  },
  btn : {
    marginTop: 10,
    marginBottom: 20
  }
}));


export default ProductsList
