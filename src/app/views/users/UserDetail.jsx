import { Card, Grid } from '@mui/material'
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

    const showTbl = () => {
        setShowTable(true)
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

    return (
        <>
            <Card elevation={3} sx={{ pt: '20px', mb: 10, margin: '50px' }}>
                <CardHeader>
                    <Title>USER DETAILS</Title>
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
                                <span>Office:</span>
                                <span style={{ color: 'green' }}>
                                    <b>{userData?.office}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>CNIC:</span>
                                <span style={{ color: 'green' }}>
                                    <b>{userData?.CNIC}</b>
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
                                <span>Purchase: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {userData?.purchase ? 'true' : 'false'}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Box>
                            <h4>Detail: </h4>
                            {userData?.detail}
                        </Box>
                    </Grid>
                </Grid>
            </Card>
            {showTable === true ? (
                <Card elevation={3} sx={{ pt: '20px', mb: 10, margin: '50px' }}>
                    <AllUsersTable></AllUsersTable>
                </Card>
            ) : (
                ''
            )}
        </>
    )
}

export default UserDetail
