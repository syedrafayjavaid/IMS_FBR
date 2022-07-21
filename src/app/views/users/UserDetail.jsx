import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material'
import { Box, styled } from '@mui/system'
import axios from 'axios'
import config from 'config'
import moment from 'moment'
import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import AllUsersTable from './AllUserTable'
import avatar from '../AppUsers/a.png'
import { BiTransfer } from 'react-icons/bi'
import { Paragraph } from 'app/components/Typography'
import CloseIcon from '@mui/icons-material/Close'
import { CSVLink } from 'react-csv'

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
    const [employeeProducts, setEmployeeProducts] = React.useState([])

    const [quantity, setQuantity] = React.useState('')
    const [quantityError, setQuantityError] = React.useState(false)
    const [snackBar, setSnackBar] = React.useState(false)

    const [custodianIds, setCustodianIds] = React.useState([])
    const [custodianId, setCustodianId] = React.useState('')
    const [custodianIdError, setCustodianIdError] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [employeeProductDetail, setEmployeeProductDetail] = React.useState()
    const [transferTo, setTransferTo] = React.useState()

    const { state } = useLocation()

    const imgeBaseUrl = 'uploads/'

    const EmployeeTable = styled(Table)(() => ({
        minWidth: 400,
        whiteSpace: 'pre',
        '& small': {
            height: 15,
            width: 50,
            borderRadius: 500,
            boxShadow:
                '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
        },
        '& td': {
            borderBottom: 'none',
        },
        '& td:first-of-type': {
            paddingLeft: '16px !important',
        },
    }))

    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)
        errorFunc(false)
    }

    const handleClickOpen = () => {
        if (custodianId === '' || quantity === '') {
            if (custodianId === '') {
                setCustodianIdError(true)
            }
            if (quantity === '') {
                setQuantityError(true)
            }
        } else {
            productTransferHandler()
        }
    }

    const productTransferHandler = () => {
        // getTransferTo(custodianId)

        let data = new FormData()

        data.append('itemId', employeeProductDetail?.itemId)
        data.append('employId', custodianId)
        data.append('productId', employeeProductDetail?.productId)
        data.append('quantity', quantity)
        data.append('_id', employeeProductDetail?._id)

        if (custodianId === state.user._id) {
            alert("You Can't Transfer Product To Yourself")
        } else if (quantity < 1) {
            alert(`Quantity Must Be Greater Than ${quantity}`)
        } else if (quantity > employeeProductDetail?.quantity) {
            alert(
                `Quantity Must Be Smaller or Equal To ${employeeProductDetail?.quantity}`
            )
        } else {
            axios
                .post(
                    `${config.base_url}/api/v1/productTransfer/transfer`,
                    data
                )
                .then((res) => {
                    if (res) {
                        setOpen(false)
                    }
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
        }
    }

    useEffect(() => {
        getEmployee()
        if (custodianId) {
            getTransferTo(custodianId)
        }
        // getData()
    }, [custodianId])

    const getTransferTo = (id) => {
        axios
            .get(`${config.base_url}/api/v1/employee/${id}`)
            .then((res) => {
                setTransferTo(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const getEmployee = () => {
        axios
            .get(`${config.base_url}/api/v1/employee`)
            .then((res) => {
                setCustodianIds(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setSnackBar(false)
    }

    const action = (
        <React.Fragment>
            <Button
                color="secondary"
                size="small"
                onClick={handleSnackBarClose}
            >
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackBarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const transferProduct = (item) => {
        setOpen(true)

        setEmployeeProductDetail(item)
    }

    const getEmployeeDetails = () => {
        axios
            .get(
                `${config.base_url}/api/v1/employee/currentProducts/${state.user._id}`
            )
            .then((res) => {
                setEmployeeProducts(res.data.data)
                setShowTable(true)
            })
            .catch((error) => {
                console.log(error, 'error')
                alert('Record Not Found')
                setShowTable(false)
            })
    }

    const officeName = state.user.office[0]?.name

    const headers = [
        { label: 'Employee Code', key: 'employeeId' },
        { label: 'Name', key: 'name' },
        { label: 'Phone', key: 'mobileNumber' },
        //TODO Date Of Birth
        { label: 'CNIC', key: 'cnic' },
        //TODO Gender
        { label: 'Joining Date', key: 'dateOfJoining' },
        { label: 'Official Email', key: 'emailAddress' },
        { label: 'Place Of Posting', key: 'office[0].city' },
        { label: 'Branch', key: 'office[0].name' },
        { label: 'Grade', key: 'pg' },
        { label: 'Wing', key: 'wing' },
        { label: 'Department', key: 'department' },
        { label: 'Designation', key: 'designation' },
        //TODO Job Title
        // { label: 'Remarks', key: 'remarks' },
        // { label: 'Creation Date', key: 'createdAt' },
    ]

    console.log(state.user)

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
                                    state.user.photo === 'no-image' ||
                                    state.user.photo === undefined
                                        ? avatar
                                        : config.base_url +
                                          '/' +
                                          imgeBaseUrl +
                                          state.user.photo
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
                        <h3>
                            {state.user.name === undefined
                                ? 'N/A'
                                : state.user.name}
                        </h3>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Email Address: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.emailAddress === undefined
                                            ? 'N/A'
                                            : state.user.emailAddress}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Mobile Number: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.mobileNumber === undefined
                                            ? 'N/A'
                                            : state.user.mobileNumber}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Department: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.department === undefined
                                            ? 'N/A'
                                            : state.user.department}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Designation: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.designation === undefined
                                            ? 'N/A'
                                            : state.user.designation}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Pg: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.pg === undefined
                                            ? 'N/A'
                                            : state.user.pg}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Wing: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.wing.length < 1
                                            ? 'N/A'
                                            : state.user.wing}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Office: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.office === undefined
                                            ? 'N/A'
                                            : officeName}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>CNIC: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.cnic === undefined
                                            ? 'N/A'
                                            : state.user.cnic}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Created Date: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {moment(state.user.createdAt).format(
                                            'LL'
                                        )}
                                    </b>
                                </span>
                            </Grid>

                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Modification Date: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.modifiedAt === undefined
                                            ? 'N/A'
                                            : moment(
                                                  state.user.modifiedAt
                                              ).format('LL')}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Gender </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.gender === undefined
                                            ? 'N/A'
                                            : state.user.gender}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Date of Birth: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.dob === undefined
                                            ? 'N/A'
                                            : state.user.dob}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr />
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Date Of Joining: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.dateOfJoining === undefined
                                            ? 'N/A'
                                            : state.user.dateOfJoining}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Reporting Manager: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.reportingManager ===
                                        undefined
                                            ? 'N/A'
                                            : state.user.reportingManager}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Employee Id: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.employeeId === undefined
                                            ? 'N/A'
                                            : state.user.employeeId}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Job Title: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.user.jobTitle === undefined
                                            ? 'N/A'
                                            : state.user.jobTitle}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Box sx={{ marginBottom: '5px' }}>
                            <h4>Detail: </h4>
                            {state.user.remarks === undefined
                                ? 'N/A'
                                : state.user.remarks}
                        </Box>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                <Button
                                    variant="contained"
                                    type="button"
                                    onClick={getEmployeeDetails}
                                >
                                    Employee Details
                                </Button>
                            </Grid>
                            {showTable && (
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <CSVLink
                                        filename={'product-details.csv'}
                                        data={employeeProducts}
                                    >
                                        <Button
                                            variant="contained"
                                            type="button"
                                        >
                                            Product Details Report
                                        </Button>
                                    </CSVLink>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
            {showTable && (
                <Card
                    elevation={3}
                    sx={{ pt: '20px', mAllUsersTableb: 10, margin: '50px' }}
                >
                    <Box overflow="auto">
                        <EmployeeTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 3 }}
                                        colSpan={2}
                                    >
                                        Product Name
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 3 }}
                                        colSpan={2}
                                    >
                                        Quantity
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 3 }}
                                        colSpan={2}
                                    >
                                        Serial Number
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 3 }}
                                        colSpan={2}
                                    >
                                        Tag Number
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 3 }}
                                        colSpan={2}
                                    >
                                        Transfered From
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 3 }}
                                        colSpan={2}
                                    >
                                        Transfer
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employeeProducts.length > 0
                                    ? employeeProducts.map(
                                          (employeeProduct) => {
                                              return (
                                                  <TableRow hover>
                                                      <TableCell
                                                          align="center"
                                                          colSpan={2}
                                                      >
                                                          {
                                                              employeeProduct
                                                                  .products[0]
                                                                  .name
                                                          }
                                                      </TableCell>
                                                      <TableCell
                                                          align="center"
                                                          colSpan={2}
                                                          sx={{
                                                              px: 0,
                                                              textTransform:
                                                                  'capitalize',
                                                          }}
                                                      >
                                                          {
                                                              employeeProduct.quantity
                                                          }
                                                      </TableCell>
                                                      <TableCell
                                                          align="center"
                                                          colSpan={2}
                                                          sx={{
                                                              px: 0,
                                                              textTransform:
                                                                  'capitalize',
                                                          }}
                                                      >
                                                          {
                                                              employeeProduct
                                                                  .PurchaseProduct[0]
                                                                  .srNo
                                                          }
                                                      </TableCell>
                                                      <TableCell
                                                          align="center"
                                                          colSpan={2}
                                                          sx={{
                                                              px: 0,
                                                              textTransform:
                                                                  'capitalize',
                                                          }}
                                                      >
                                                          {
                                                              employeeProduct
                                                                  .PurchaseProduct[0]
                                                                  .tagNo
                                                          }
                                                      </TableCell>
                                                      <TableCell
                                                          align="center"
                                                          colSpan={2}
                                                          sx={{
                                                              px: 0,
                                                              textTransform:
                                                                  'capitalize',
                                                          }}
                                                      >
                                                          {employeeProduct.transferedFrom ===
                                                          'store'
                                                              ? 'Store'
                                                              : employeeProduct
                                                                    .transferedFromEmploy
                                                                    .length ===
                                                                0
                                                              ? 'N/A'
                                                              : employeeProduct
                                                                    .transferedFrom[
                                                                    'name'
                                                                ]}
                                                      </TableCell>

                                                      <TableCell
                                                          sx={{ px: 0 }}
                                                          align="center"
                                                          colSpan={2}
                                                      >
                                                          <Button
                                                              onClick={() => {
                                                                  transferProduct(
                                                                      employeeProduct
                                                                  )
                                                              }}
                                                          >
                                                              <BiTransfer
                                                                  size={22}
                                                              />
                                                          </Button>
                                                      </TableCell>
                                                  </TableRow>
                                              )
                                          }
                                      )
                                    : ''}
                            </TableBody>
                        </EmployeeTable>
                    </Box>
                </Card>
            )}
            <Dialog
                open={open}
                fullWidth={true}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'TRANSFER ITEMS'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={4}>
                        <Grid
                            item
                            lg={5}
                            md={5}
                            sm={5}
                            xs={5}
                            sx={{ marginTop: '10px' }}
                        >
                            <TextField
                                type={`number`}
                                error={quantityError}
                                id="quantity"
                                label="Quantity"
                                placeholder="Enter Quantity"
                                autoComplete="off"
                                helperText={
                                    quantityError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={quantity}
                                size="small"
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setQuantity,
                                        setQuantityError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid
                            item
                            lg={7}
                            md={7}
                            sm={7}
                            xs={7}
                            sx={{ marginTop: '10px' }}
                        >
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth error={custodianIdError}>
                                    <InputLabel
                                        size="small"
                                        id="demo-simple-select-label"
                                    >
                                        Transfer To
                                    </InputLabel>
                                    <Select
                                        size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={custodianId}
                                        label="Transfer To"
                                        onChange={(event) => {
                                            setCustodianId(event.target.value)
                                        }}
                                    >
                                        {custodianIds.map((custodianId) => {
                                            return (
                                                <MenuItem
                                                    key={custodianId._id}
                                                    value={custodianId._id}
                                                >
                                                    {custodianId.employeeId}
                                                    &nbsp;/&nbsp;
                                                    {custodianId.name}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                    <FormHelperText>
                                        {custodianIdError && 'Field Required'}
                                    </FormHelperText>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button autoFocus onClick={handleClickOpen}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UserDetail
