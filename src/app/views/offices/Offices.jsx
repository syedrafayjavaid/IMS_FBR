import AddIcon from '@mui/icons-material/Add'
import {
    Card,
    CircularProgress,
    Fab,
    Grid,
    IconButton,
    Skeleton,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { makeStyles } from '@mui/styles'
import { Box, styled } from '@mui/system'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import OfficeCard from './OfficeCard'
import CloseIcon from '@mui/icons-material/Close'
import config from 'config'
import { ConfirmationDialog } from 'app/components'
import SummarizeIcon from '@mui/icons-material/Summarize'
import { CSVLink } from 'react-csv'
import '../users/user.css'
import ReactPaginate from 'react-paginate'

const BrandTable = styled(Table)(() => ({
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

const Offices = () => {
    // Form validation errors State Setting
    const [brandError, setbrandError] = React.useState(false)

    // Setting States
    const [offices, setOffices] = React.useState([])
    const [createName, setCreateName] = React.useState('')
    const [createNameError, setCreateNameError] = React.useState(false)
    const [createAddress, setCreateAddress] = React.useState('')
    const [createAddressError, setCreateAddressError] = React.useState(false)
    const [createCity, setCreateCity] = React.useState('')
    const [createCityError, setCreateCityError] = React.useState(false)
    const [createContact, setCreateContact] = React.useState('')
    const [createContactError, setCreateContactError] = React.useState(false)
    const [createEmail, setCreateEmail] = React.useState('')
    const [createEmailError, setCreateEmailError] = React.useState(false)

    const [editName, setEditName] = React.useState('')
    const [editNameError, setEditNameError] = React.useState(false)
    const [editAddress, setEditAddress] = React.useState('')
    const [editAddressError, setEditAddressError] = React.useState(false)
    const [editCity, setEditCity] = React.useState('')
    const [editCityError, setEditCityError] = React.useState(false)
    const [editContact, setEditContact] = React.useState('')
    const [editContactError, setEditContactError] = React.useState(false)
    const [editEmail, setEditEmail] = React.useState('')
    const [editEmailError, setEditEmailError] = React.useState(false)
    const [officeId, setOfficeId] = React.useState('')
    const [snackBar, setSnackBar] = React.useState(false)
    const [open, setOpen] = React.useState(false)

    const [pageNumber, setPageNumber] = React.useState(0)
    const OfficesPerPage = 8
    const pagesVisited = pageNumber * OfficesPerPage
    const pageCount = Math.ceil(offices.length / OfficesPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)

        errorFunc(false)
    }

    const [createOfficeDialog, setCreateOfficeDialog] = React.useState(false)
    const [editOfficeDialog, setEditOfficeDialog] = React.useState(false)

    const handleCreateClose = () => {
        setSnackBar(false)
        setCreateOfficeDialog(false)
    }
    const handleEditClose = () => {
        setEditOfficeDialog(false)
    }

    useEffect(() => {
        getAlldata()
    }, [])
    const getAlldata = () => {
        axios
            .get(`${config.base_url}/api/v1/office`)
            .then((res) => {
                setOffices(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const onDelhandler = (id) => {
        setOfficeId(id)
        setOpen(true)
        if (open && officeId) {
            axios
                .delete(`${config.base_url}/api/v1/office/${officeId}`)
                .then((res) => {
                    getAlldata()
                    setOpen(false)
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
        }
    }

    const onEdithandler = (id, name, city, address, email, contact) => {
        setEditOfficeDialog(true)
        setEditName(name)
        setEditAddress(address)
        setEditCity(city)
        setEditContact(contact)
      
        setEditEmail(email)
        setOfficeId(id)
    }

    const navigate = useNavigate()

    //Validation Check After Button Click
    const handleCreateClickOpen = () => {
        // Check if any field of Form is Empty
        if (
            createName === '' ||
            createAddress === '' ||
            createCity === '' ||
            createContact === '' ||
            createEmail === ''
        ) {
            if (createName === '') {
                setCreateNameError(true)
            }
            if (createAddress === '') {
                setCreateAddressError(true)
            }
            if (createCity === '') {
                setCreateCityError(true)
            }
            if (createContact === '') {
                setCreateContactError(true)
            }
            if (createEmail === '') {
                setCreateEmailError(true)
            }
        } else {
            createHandler()
        }
    }

    const handleEditClickOpen = () => {
        // Check if any field of Form is Empty
        if (
            editName === '' ||
            editAddress === '' ||
            editCity === '' ||
            editContact === '' ||
            editEmail === ''
        ) {
            if (editName === '') {
                setEditNameError(true)
            }
            if (editAddress === '') {
                setEditAddressError(true)
            }
            if (editCity === '') {
                setEditCityError(true)
            }
            if (editContact === '') {
                setEditContactError(true)
            }
            if (editEmail === '') {
                setEditEmailError(true)
            }
        } else {
            editHandler()
        }
    }

    const createHandler = () => {
        let data = new FormData()

        data.append('name', createName)
        data.append('address', createAddress)
        data.append('city', createCity)
        data.append('phone', createContact)
        data.append('email', createEmail)

        const officeNameExist = offices.find((office) => {
            return office.name === createName
        })

        if (officeNameExist) {
            setSnackBar(true)
            return
        }

        setSnackBar(false)

        axios
            .post(`${config.base_url}/api/v1/office`, data)
            .then((res) => {
                if (res) {
                    handleCreateClose()
                    getAlldata()
                }
                setCreateName('')
                setCreateCity('')
                setCreateAddress('')
                setCreateContact('')
                setCreateEmail('')
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const editHandler = () => {
        let data = new FormData()

        data.append('name', editName)
        data.append('address', editAddress)
        data.append('city', editCity)
        data.append('phone', editContact)
        data.append('email', editEmail)

        // const officeNameExist = offices.find((office) => {
        //     return office.name === editName
        // })

        // if (officeNameExist) {
        //     setSnackBar(true)
        //     return
        // }

        axios
            .put(`${config.base_url}/api/v1/office/${officeId}`, data)
            .then((res) => {
                if (res) {
                    getAlldata()
                    handleEditClose()
                }
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setSnackBar(false)
    }

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const headers = [
        { label: 'Office Name', key: 'name' },
        { label: 'Office Id', key: 'officeId' },
        { label: 'Email', key: 'email' },
        { label: 'Phone', key: 'phone' },
        { label: 'Address', key: 'address' },
        { label: 'City', key: 'city' },
        { label: 'Creation Date', key: 'createdAt' },
    ]

    return (
        <>
            {open && (
                <ConfirmationDialog
                    open={open}
                    onConfirmDialogClose={() => {
                        setOpen(false)
                    }}
                    title={`Are You Sure?`}
                    text={`Are You Sure You Want To Delete This Office?`}
                    onYesClick={onDelhandler}
                />
            )}
            <Typography variant="h4" sx={{ m: 5 }}>
                Offices
            </Typography>
            {/* {offices.length === 0 && <CircularProgress />} */}
            {offices.length > 0 && (
                <Card elevation={3} sx={{ pt: '20px', mx: 5 }}>
                    <Box overflow="auto">
                        <BrandTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        sx={{ px: 3 }}
                                        align="left"
                                        colSpan={3}
                                    >
                                        Name
                                    </TableCell>
                                    <TableCell
                                        sx={{ px: 0 }}
                                        align="center"
                                        colSpan={3}
                                    >
                                        Address
                                    </TableCell>
                                    <TableCell
                                        sx={{ px: 0 }}
                                        align="center"
                                        colSpan={1}
                                    >
                                        City
                                    </TableCell>
                                    <TableCell
                                        sx={{ px: 0 }}
                                        align="center"
                                        colSpan={2}
                                    >
                                        Email Address
                                    </TableCell>
                                    <TableCell
                                        sx={{ px: 0 }}
                                        align="center"
                                        colSpan={1}
                                    >
                                        Contact
                                    </TableCell>
                                    <TableCell
                                        sx={{ px: 0 }}
                                        align="center"
                                        colSpan={1}
                                    >
                                        Edit
                                    </TableCell>
                                    <TableCell
                                        sx={{ px: 0 }}
                                        align="center"
                                        colSpan={1}
                                    >
                                        Delete
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {offices
                                    .slice(
                                        pagesVisited,
                                        pagesVisited + OfficesPerPage
                                    )
                                    .map((office, index) => (
                                        <OfficeCard
                                            key={index}
                                            office={office}
                                            onEdit={onEdithandler}
                                            onDelete={onDelhandler}
                                        />
                                    ))}
                            </TableBody>
                        </BrandTable>
                    </Box>
                </Card>
            )}
            <br></br>
            {
                offices.length> 0 && <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'paginationBttns'}
                previousLinkClassName={'previousBttn'}
                nextLinkClassName={'nextBttn'}
                disabledClassName={'paginationDisabled'}
                activeClassName={'paginationActive'}
            />
            }
            
            <Tooltip title="Generate Report">
                <Fab
                    color="primary"
                    aria-label="Add"
                    size="medium"
                    style={{
                        zIndex: 999,
                        right: '4vw',
                        top: '11vh',
                        position: 'fixed',
                    }}
                >
                    <CSVLink
                        filename={'all-offices.csv'}
                        data={offices}
                        headers={headers}
                    >
                        <div style={{ marginTop: '8px' }}>
                            <SummarizeIcon />
                        </div>
                    </CSVLink>
                </Fab>
            </Tooltip>
            <Dialog
                open={createOfficeDialog}
                onClose={handleCreateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'ADD OFFICE'}
                </DialogTitle>
                <DialogContent>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={createNameError}
                                id="name"
                                label="Name"
                                placeholder="Enter Name"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    createNameError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={createName}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCreateName,
                                        setCreateNameError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={createCityError}
                                id="city"
                                label="City"
                                placeholder="Enter City"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    createCityError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={createCity}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCreateCity,
                                        setCreateCityError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={createContactError}
                                id="contact"
                                label="Contact No"
                                placeholder="Enter Contact No"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    createContactError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={createContact}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCreateContact,
                                        setCreateContactError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={createEmailError}
                                id="address"
                                label="Email Address"
                                placeholder="Enter Address"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    createEmailError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={createEmail}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCreateEmail,
                                        setCreateEmailError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField
                                error={createAddressError}
                                id="address"
                                label="Address"
                                placeholder="Enter Address"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    createAddressError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={createAddress}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setCreateAddress,
                                        setCreateAddressError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateClose}>Cancel</Button>
                    <Button autoFocus onClick={handleCreateClickOpen}>
                        Confirm
                    </Button>
                </DialogActions>
                <Snackbar
                    open={snackBar}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Name already exists"
                    action={action}
                />
            </Dialog>
            <Dialog
                open={editOfficeDialog}
                onClose={handleEditClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'EDIT OFFICE'}
                </DialogTitle>
                <DialogContent>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={editNameError}
                                id="name"
                                label="Name"
                                placeholder="Enter Name"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    editNameError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={editName}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setEditName,
                                        setEditNameError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={editCityError}
                                id="city"
                                label="City"
                                placeholder="Enter City"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    editCityError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={editCity}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setEditCity,
                                        setEditCityError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={editContactError}
                                id="contact"
                                label="Contact No"
                                placeholder="Enter Contact No"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    editContactError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={editContact}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setEditContact,
                                        setEditContactError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={editEmailError}
                                id="address"
                                label="Email Address"
                                placeholder="Enter Address"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    editEmailError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={editEmail}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setEditEmail,
                                        setEditEmailError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <TextField
                                error={editAddressError}
                                id="address"
                                label="Address"
                                placeholder="Enter Address"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    editAddressError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={editAddress}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setEditAddress,
                                        setEditAddressError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button autoFocus onClick={handleEditClickOpen}>
                        Confirm
                    </Button>
                </DialogActions>

                <Snackbar
                    open={snackBar}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Name already exists"
                    action={action}
                />
            </Dialog>

            <Tooltip title="Add Office">
                <Fab
                    color="secondary"
                    aria-label="Add"
                    size="medium"
                    style={{
                        zIndex: 999,
                        right: '4vw',
                        bottom: '8vh',
                        position: 'fixed',
                    }}
                    onClick={() => setCreateOfficeDialog(true)}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    conatiner: {
        marginTop: 10,
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#3f51b5',
        color: '#fff',
        padding: 20,
    },
    btn: {
        marginTop: 10,
        marginBottom: 20,
    },
}))

export default Offices
