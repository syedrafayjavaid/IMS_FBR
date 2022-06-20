// import React ,{useState, useEffect} from 'react'

// material
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import axios from 'axios';
import moment from 'moment';
import config from 'config';


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

const imgeBaseUrl='uploads/';

const [categoryName, setCategoryName] = React.useState('');
const [productTypeName, setProductTypeName] = React.useState('');
const [brandName, setBrandName] = React.useState('');

useEffect(() => {
  getAlldata();
}, []);
const getAlldata = () => {
  axios.get(`${config.base_url}/api/v1/category/${state.product.categoryId}`).then((res) => {
    setCategoryName(res.data.data.name);
  }).catch((error) => {
    console.log(error, 'error');
  })
  axios.get(`${config.base_url}/api/v1/productType/${state.product.productTypeId}`).then((res) => {
    setProductTypeName(res.data.data.name);
  }).catch((error) => {
    console.log(error, 'error');
  })
  axios.get(`${config.base_url}/api/v1/brand/${state.product.brandId}`).then((res) => {
    setBrandName(res.data.data.name);
  }).catch((error) => {
    console.log(error, 'error');
  })
}

const notAvailable = "N/A";
    
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
                                src={config.base_url + '/' + imgeBaseUrl+state.product.photo}
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
                        <span>Avg Price:   </span>
                            <span style={{color: 'green'}}><b>{state.product.avgPrice === undefined ? notAvailable : state.product.avgPrice}</b></span>
                        </Grid>
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Quantity: </span>
                            <span style={{color: 'green'}}><b>{state.product.productQuantity === undefined ? 'N/A' : state.product.productQuantity}</b></span>
                        </Grid>  
                    </Grid>
                    <hr></hr>
                    <Grid container >
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Model:   </span>
                            <span style={{color: 'green'}}><b>{state.product.model}</b></span>
                        </Grid>
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Brand: </span>
                            <span style={{color: 'green'}}><b>{brandName}</b></span>
                        </Grid>  
                    </Grid>
                    <hr></hr>
                    <Grid container >
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Created Date: </span>
                            <span style={{color: 'green'}}><b>{ moment(state.product?.createdAt).format('LL') }</b></span>
                        </Grid>
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Last Modified: </span>
                            <span style={{color: 'green'}}><b>{state.product.modifiedAt === undefined ? moment(state.product.createdAt).format('LL') : moment(state.product.modifiedAt).format('LL')}</b></span>
                        </Grid>  
                    </Grid>
                    <hr></hr>
                    <Box>
                    <h4>Detail: </h4>    
                    {state.product.detail}
                    </Box>
    
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
