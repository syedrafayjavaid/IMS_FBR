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

    const date = new Date(state.purchaseItem.dataOfPurchase).toISOString().split('T')[0]

  return (
    <>
          <Card elevation={3} sx={{ pt: '20px', mb: 10 ,margin:"50px"}}>
                <CardHeader>
                <Title>PURCHASED ITEM DETAILS</Title>
                </CardHeader>
                    <hr></hr>
                <Grid container>
                <Grid item lg={5} md={5} sm={12} xs={12}  >
                            <ContentBox >
                                <IMG
                                src={config.base_url + '/' + imgeBaseUrl+state.purchaseItem?.attachment}
                                alt=""
                                />
                            </ContentBox>
                </Grid>
                <Grid item lg={7} md={7} sm={12} xs={12} style={{padding: "1rem 3rem"}}>
                <h3>{state.purchase?.purchaseOrder}</h3>
                    <br></br>
                    <Grid container >
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                            <span>Price: </span>
                            <span style={{color: 'green'}}><b>{state.purchaseItem?.price}</b></span>
                        </Grid>
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Quantity: </span>
                            <span style={{color: 'green'}}><b>{state.purchaseItem?.quantity}</b></span>
                        </Grid>
                    </Grid>
                    <hr></hr>
                    <Grid container >
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Ownership:   </span>
                            <span style={{color: 'green'}}><b>{state.purchaseItem?.ownership}</b></span>
                        </Grid>
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Date Of Purchase: </span>
                            <span style={{color: 'green'}}><b>{date}</b></span>
                        </Grid>
                    </Grid>
                    <hr></hr>
                    <Grid container >
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Model:   </span>
                            <span style={{color: 'green'}}><b>{state.purchaseItem?.model}</b></span>
                        </Grid>
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Status: </span>
                            <span style={{color: 'green'}}><b>{state.purchaseItem?.status}</b></span>
                        </Grid>
                    </Grid>
                    <hr></hr>
                    <Grid container >
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Vender:   </span>
                            <span style={{color: 'green'}}><b>{state.purchaseItem?.vender}</b></span>
                        </Grid>
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Created At: </span>
                            <span style={{color: 'green'}}><b>{moment(state.purchaseItem?.createdAt).format('LL')}</b></span>
                        </Grid>
                    </Grid>
                    <hr></hr>
                    <Grid container >
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>QR Code Text: </span>
                            <span style={{color: 'green'}}><b>{state.purchaseItem?.QRCode}</b></span>
                        </Grid>
                        <Grid item  lg={6} md={6} sm={6} xs={6} >
                        <span>Modified At:   </span>
                        <span style={{color: 'green'}}><b>{state.purchaseItem?.modifiedAt === undefined ? 'N/A' : moment(state.purchaseItem?.modifiedAt).format('LL')}</b></span>
                        </Grid>
                    </Grid>
                    <hr></hr>
                    <Box>
                    <h4>Qr Code: </h4>
                    <img src={state.purchaseItem?.QRCodeImage} alt="" srcset="" />
                    </Box>
                    <br></br>
                </Grid>
                </Grid>
            </Card>
            </>
  )
}
export default PurchaseItemDetail