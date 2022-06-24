import { Button, Card, Grid, Paper, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material'
import { Box, styled } from '@mui/system'
import axios from 'axios'
import config from 'config'
import moment from 'moment'
import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import AllUsersTable from './AllUserTable'

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
    display: 'flex',
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
    height: '100%',
}))

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

const UserDetail = () => {
    // States
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
        setShowCard(false);
    }
    const showCrd = () => {
        setShowCard(true)
        setShowTable(false)
    }

    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)

    const { state } = useLocation()

    const [userData, setUserData] = React.useState(null)

    useEffect(() => {
        getAlldata()
    }, [])
    const getAlldata = () => {
        axios
            .get(`${config.base_url}/api/v1/employee/${state.id}`)
            .then((res) => {
                setUserData(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const imgeBaseUrl = 'uploads/'

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
      ];

    return (
        <>
            <Card elevation={3} sx={{ pt: '20px', mb: 10, margin: '50px' }}>
                <CardHeader>
                    <Title>EMPLOYEE DETAILS</Title>
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
                                    userData?.photo
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
                        <h3>{userData?.name}</h3>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Email Address: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{userData?.emailAddress}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Mobile Number: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{userData?.mobileNumber}</b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Department: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{userData?.department}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Designation: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{userData?.designation}</b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Pg: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{userData?.pg}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Wing: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{userData?.wing}</b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Office: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{userData?.officeId === undefined ? 'N/A' : userData?.officeId}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>CNIC: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{userData?.cnic === undefined ? 'N/A' : userData?.cnic}</b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Created Date: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {moment(userData?.createdAt).format(
                                            'LL'
                                        )}
                                    </b>
                                </span>
                            </Grid>

                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Modification Date: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {userData?.modifiedAt === undefined
                                            ? moment(
                                                  userData?.createdAt
                                              ).format('LL')
                                            : moment(
                                                  userData?.modifiedAt
                                              ).format('LL')}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Date Of Joining: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {userData?.dateOfJoining}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Reporting Manager: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {userData?.reportingManager === undefined ? 'N/A' : userData?.reportingManager}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        {/* <Grid container>
                            
                        </Grid> */}
                        <hr></hr>
                        <Box>
                            <h4>Detail: </h4>
                            {userData?.detail}
                        </Box>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                <Button
                                    variant="contained"
                                    type="button"
                                    onClick={showTbl}
                                >
                                    Employee Details
                                </Button>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={12}>
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
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
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

export default UserDetail
