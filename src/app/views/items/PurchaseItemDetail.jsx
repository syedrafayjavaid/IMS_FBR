import { Box, styled } from '@mui/system'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Grid, Paper, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material'
import { Card } from '@mui/material'
import moment from 'moment'
import config from 'config'
import AllUsersTable from '../users/AllUserTable'
const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
    display: 'flex',
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

    const [showTable, setShowTable] = React.useState(false)
    const [showCard, setShowCard] = React.useState(false)

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const showTbl = () => {
        setShowTable(true)
        setShowCard(false)
    }
    const showCrd = () => {
        setShowCard(true)
        setShowTable(false)
    }

    const FlexBox = styled(Box)(() => ({
        display: 'flex',
        alignItems: 'center',
    }))
    const JustifyBox = styled(FlexBox)(() => ({
        justifyContent: 'center',
    }))
    const IMG = styled('img')(() => ({
        width: '100%',
        height: '100%',
    }))
    const ContentBox = styled(JustifyBox)(() => ({
        padding: '32px',
        background: 'rgba(0, 0, 0, 0.01)',
    }))
    const { state } = useLocation()
    const imgeBaseUrl = 'uploads/'

    const date = new Date(state.purchaseItem.dataOfPurchase)
        .toISOString()
        .split('T')[0]

    const steps = [
        {
            label: 'Select campaign settings',
            description: `For each ad campaign that you create, you can control how much
                        you're willing to spend on clicks and conversions.`,
        },
        {
            label: 'Create an ad group',
            description:
                'An ad group contains one or more ads which target a shared set of keywords.',
        },
        {
            label: 'Create an ad',
            description: `Try out different ad text to see what brings in the most customers.`,
        },
        {
            label: 'Step 3',
            description: `Dummy Description.`,
        },
        {
            label: 'Step 4',
            description: `Dummy Name`,
        },
    ];

    return (
        <>
            <Card elevation={3} sx={{ pt: '20px', mb: 10, margin: '50px' }}>
                <CardHeader>
                    <Title>ITEM DETAILS</Title>
                </CardHeader>
                <hr></hr>
                <Grid container>
                    <Grid item lg={5} md={5} sm={12} xs={12}>
                        <ContentBox>
                            <IMG
                                src={
                                    config.base_url +
                                    '/' +
                                    imgeBaseUrl +
                                    state.purchaseItem?.attachment
                                }
                                alt=""
                            />
                        </ContentBox>
                    </Grid>
                    <Grid
                        item
                        lg={7}
                        md={7}
                        sm={12}
                        xs={12}
                        style={{ padding: '1rem 3rem' }}
                    >
                        <h3>{state.purchase?.purchaseOrder}</h3>
                        <br></br>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Price: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.price}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Quantity: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.quantity}</b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Ownership: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.ownership}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Date Of Purchase: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{date}</b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Model: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.model}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Status: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.status}</b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Vender: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.vender}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Created At: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {moment(
                                            state.purchaseItem?.createdAt
                                        ).format('LL')}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>QR Code Text: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.QRCode}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Modified At: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.purchaseItem?.modifiedAt ===
                                            undefined
                                            ? 'N/A'
                                            : moment(
                                                state.purchaseItem?.modifiedAt
                                            ).format('LL')}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Box>
                            <h4>Qr Code: </h4>
                            <img
                                src={state.purchaseItem?.QRCodeImage}
                                alt=""
                                srcset=""
                            />
                        </Box>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <Button
                                    variant="contained"
                                    type="button"
                                    onClick={showTbl}
                                >
                                    Purchased Item  Details
                                </Button>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <Button
                                    variant="contained"
                                    type="button"
                                    onClick={showCrd}
                                >
                                    Track History
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
            {showTable && (
                <AllUsersTable></AllUsersTable>
            )}
            {showCard && (
                <Card elevation={3} sx={{ p: '20px', mb: 10, margin: '50px' }}>
                    <Box sx={{ maxWidth: 400 }}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel
                                    //   optional={
                                    //     // index === 4 ? (
                                    //     //   <Typography variant="caption">Last step</Typography>
                                    //     // ) : null
                                    //   }
                                    >
                                        {step.label}
                                    </StepLabel>
                                    <StepContent>
                                        <Typography>{step.description}</Typography>
                                        <Box sx={{ mb: 2 }}>
                                            <div>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleNext}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                                </Button>
                                                <Button
                                                    disabled={index === 0}
                                                    onClick={handleBack}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    Back
                                                </Button>
                                            </div>
                                        </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} sx={{ p: 3 }}>
                                <Typography>All steps completed - you&apos;re finished</Typography>
                                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                    Reset
                                </Button>
                            </Paper>
                        )}
                    </Box>
                </Card>
            )}
        </>
    )
}
export default PurchaseItemDetail
