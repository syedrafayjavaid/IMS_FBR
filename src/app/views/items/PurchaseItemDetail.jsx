import { Box, styled } from '@mui/system'
import React from 'react'
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';


import { Card } from '@mui/material';
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

const PurchaseItemDetail = () => {

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
    

  return (
    <>
    
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
                            <span style={{color: 'green'}}><b>{`productTypeName`}</b></span>
                        </Grid>
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Categoery Name: </span>
                            <span style={{color: 'green'}}><b>{`categoryName`}</b></span>
                        </Grid>  
                    </Grid>
                    
                    <hr></hr>

                    <Grid container >
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Avg Price:   </span>
                            <span style={{color: 'green'}}><b>{state.product.avgPrice === undefined ? `notAvailable` : state.product.avgPrice}</b></span>
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
                            <span style={{color: 'green'}}><b>{`brandName`}</b></span>
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
                    {`state.product.detail`}
                    </Box>
    
                    <br></br>
                   
                </Grid>
                </Grid>
            </Card>
   
            </>
  )
}

export default PurchaseItemDetail