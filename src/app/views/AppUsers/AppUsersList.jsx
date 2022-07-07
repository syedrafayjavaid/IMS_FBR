import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { Container, Fab, FormHelperText, Grid, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { Box, styled } from '@mui/system'
import { ConfirmationDialog } from 'app/components'
import CategoryCard from 'app/components/categories/CategoryCard'
import AppUserCaerd from 'app/views/AppUsers/AppUserCard'
import axios from 'axios'
import config from 'config'
import React, { useEffect } from 'react'
import { CSVLink } from 'react-csv'
import SummarizeIcon from '@mui/icons-material/Summarize'

const label = { inputProps: { 'aria-label': 'Switch demo' } }

const modifiedBy = 'noor'
const createdBy = 'imad'
const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(JustifyBox)(() => ({
    height: '100%',
    padding: '32px',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const JWTRegister = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100vh !important',
    '& .card': {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const AppUsersList = () => {
    const [users, setUsers] = React.useState([])
    const [userName, setUserName] = React.useState('')
    const [userNameError, setUserNameError] = React.useState(false)

    const [emailAddress, setEmailAddress] = React.useState('')
    const [emailAddressError, setEmailAddressError] = React.useState(false)
    const [superEmailAddress, setSuperEmailAddress] = React.useState('')
    const [superPassword, setSuperPassword] = React.useState('')
    const [superEmailAddressError, setSuperEmailAddressError] =
        React.useState(false)
    const [superPasswordError, setSuperPasswordError] = React.useState(false)
    const [password, setPassword] = React.useState('')
    const [passwordError, setPasswordError] = React.useState(false)
    const [role, setRole] = React.useState('')
    // const [userRole, setUserRole] = React.useState('')
    const [roleError, setRoleError] = React.useState(false)

    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [open3, setOpen3] = React.useState(false)
    const [open4, setOpen4] = React.useState(false)
    const [userId, setUserId] = React.useState('')

    const [createSnackBar, setCreateSnackBar] = React.useState(false)
    const [emailSnackBar, setEmailSnackBar] = React.useState(false)
    const [editSnackBar, setEditSnackBar] = React.useState(false)
    const [createUserDialog, setCreateUserDialog] = React.useState(false)
    const [editUserDialog, setEditUserDialog] = React.useState(false)

    const handleCreateClose = () => {
        setCreateUserDialog(false)
        setUserName('')
        setEmailAddress('')
        setPassword('')
        setRole('')
        setUserNameError(false)
        setEmailAddressError(false)
        setPasswordError(false)
        setRoleError(false)
    }

    const handleCreateSnackBarClose = () => {
        setCreateSnackBar(false)
    }

    const handleEmailSnackBarClose = () => {
        setEmailSnackBar(false)
    }

    const handleEditClose = () => {
        setEditUserDialog(false)
        setUserName('')
        setEmailAddress('')
        setPassword('')
        setRole('')
        setUserNameError(false)
        setEmailAddressError(false)
        setPasswordError(false)
        setRoleError(false)
    }

    const handleEditSnackBarClose = () => {
        setEditSnackBar(false)
    }

    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)

        errorFunc(false)
    }

    const handleCreateClickOpen = () => {
        if (
            userName === '' ||
            emailAddress === '' ||
            password === '' ||
            role === ''
        ) {
            if (userName === '') {
                setUserNameError(true)
            }
            if (emailAddress === '') {
                setEmailAddressError(true)
            }
            if (password === '') {
                setPasswordError(true)
            }
            if (role === '') {
                setRoleError(true)
            }
        } else {
            setOpen2(true)
        }
    }

    const handleEditClickOpen = () => {
        if (
            userName === '' ||
            emailAddress === '' ||
            password === '' ||
            role === ''
        ) {
            if (userName === '') {
                setUserNameError(true)
            }
            if (emailAddress === '') {
                setEmailAddressError(true)
            }
            if (password === '') {
                setPasswordError(true)
            }
            if (role === '') {
                setRoleError(true)
            }
        } else {
            editHandler()
        }
    }

    const handleCreateClosed = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setCreateSnackBar(false)
    }

    const handleEditClosed = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setEditSnackBar(false)
    }

    const handleFormSubmit = async (event) => {
        try {
            // await register(state.email, state.username, state.password)
            // navigate('/')
        } catch (e) {
            if (e.error == 'Duplicate field value entered') {
                alert('Username Already exists, try different username')
            } else {
                alert(e.error)
            }
        }
    }

    const handleMessageClose = () => {
        setOpen4(false)
    }
    const createAction = (
        <React.Fragment>
            <Button
                color="secondary"
                size="small"
                onClick={handleCreateSnackBarClose}
            >
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCreateSnackBarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const emailAction = (
        <React.Fragment>
            <Button
                color="secondary"
                size="small"
                onClick={handleEmailSnackBarClose}
            >
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleEmailSnackBarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const editAction = (
        <React.Fragment>
            <Button
                color="secondary"
                size="small"
                onClick={handleEditSnackBarClose}
            >
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleEditSnackBarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const Input = styled('input')({
        display: 'none',
    })

    useEffect(() => {
        getAlldata()
    }, [])

    const getAlldata = () => {
        axios
            .get(`${config.base_url}/api/v1/auth/users`)
            .then((res) => {
                setUsers(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const createHandler = () => {
        let data = new FormData()
        data.append('userName', userName)
        data.append('email', emailAddress)
        data.append('password', password)
        data.append('role', role)

        users.find((userData) => {
            if (userData.userName === userName) {
                setCreateSnackBar(true)
                // setEmailSnackBar(true)
                return
            }
            if (userData.email === emailAddress) {
                setEmailSnackBar(true)
                return
            }
        })

        axios
            .post(`${config.base_url}/api/v1/auth/register`, data)
            .then((res) => {
                if (res) {
                    handleCreateClose()
                    getAlldata()
                }
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const editHandler = () => {
        let data = new FormData()
        data.append('userName', userName)
        data.append('email', emailAddress)
        data.append('password', password)
        data.append('role', role)
        axios
            .put(`${config.base_url}/api/v1/auth/${userId}`, data)
            .then((res) => {
                if (res) {
                    getAlldata()
                    handleEditClose()
                }
            })
            .catch((error) => {
                if (error.message === 'Request failed with status code 400') {
                    setEditSnackBar(true)
                }
            })
    }

    const onDelhandler = (user) => {
        setUserId(user._id)

        setOpen(true)

        if (open3 && user.role !== 'SA') {
            axios
                .delete(`${config.base_url}/api/v1/auth/${userId}`)
                .then((res) => {
                    getAlldata()
                    setOpen(false)
                    setOpen3(false)
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
        } else if (user.role === 'SA') {
            setOpen4(true)
            setOpen(false)
            setOpen3(false)
        }
    }

    const onEdithandler = (id, user) => {
        setEditUserDialog(true)
        setUserName(user.userName)
        setEmailAddress(user.email)
        setPassword(user.password)
        setRole(user.role)
        setUserId(id)
    }

    const open2Close = () => {
        setOpen2(false)
    }
    const open3Close = () => {
        setOpen3(false)
    }
    const handleSuperAdmin = () => {
        let data = {}

        data.email = superEmailAddress
        data.password = superPassword

        axios
            .post(`${config.base_url}/api/v1/auth/SA`, data)
            .then((res) => {
                if (res.data.grantAccess) {
                    setOpen2(false)
                    createHandler()
                }
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const headers = [
        { label: 'User Name', key: 'userName' },
        { label: 'Email', key: 'email' },
        { label: 'Employee Id', key: 'employeeId' },
        { label: 'Role', key: 'role' },
        { label: 'Creation Date', key: 'createdAt' },
    ]

    return (
        <>
            {open && (
                <ConfirmationDialog
                    open={open}
                    onConfirmDialogClose={() => {
                        setOpen(false)
                        setOpen3(false)
                    }}
                    title={`Are You Sure?`}
                    text={`Are You Sure You Want To Delete This User?`}
                    onYesClick={() => {
                        setOpen3(true)
                    }}
                />
            )}
            <Tooltip title="Create User">
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
                    onClick={() => setCreateUserDialog(true)}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Container>
                <br></br>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Users
                    </Typography>
                    <CSVLink
                        separator=","
                        filename={'all-users.csv'}
                        data={users}
                        headers={headers}
                    >
                        <div
                            style={{
                                backgroundColor: '#1976d2',
                                borderRadius: '50%',
                            }}
                        >
                            <IconButton
                                style={{ color: '#FFFFFF' }}
                                size="medium"
                            >
                                <SummarizeIcon />
                            </IconButton>
                        </div>
                    </CSVLink>
                </div>
                <Grid container spacing={3}>
                    {users.map((category) => (
                        <Grid key={category._id} item xs={12} sm={6} md={3}>
                            <AppUserCaerd
                                user={category}
                                onEdit={onEdithandler}
                                onDelete={onDelhandler}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Dialog
                open={createUserDialog}
                onClose={handleCreateClose}
                maxWidth="xs"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'ADD NEW APP USER'}
                </DialogTitle>
                <DialogContent>
                    {/* <ValidatorForm onSubmit={handleFormSubmit} style={{ marginTop: "12px" }}>
                        <TextValidator
                            sx={{ mb: 3, width: '100%' }}
                            variant="outlined"
                            size="small"
                            label="Username"
                            onChange={handleChange}
                            type="text"
                            name="username"
                            value={username || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextValidator
                            sx={{ mb: 3, width: '100%' }}
                            variant="outlined"
                            size="small"
                            label="Email"
                            onChange={handleChange}
                            type="email"
                            name="email"
                            value={email || ''}
                            validators={['required', 'isEmail']}
                            errorMessages={[
                                'this field is required',
                                'email is not valid',
                            ]}
                        />
                        <TextValidator
                            sx={{ mb: '16px', width: '100%' }}
                            label="Password"
                            variant="outlined"
                            size="small"
                            onChange={handleChange}
                            name="password"
                            type="password"
                            value={password || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <FormControlLabel
                            sx={{ mb: '16px' }}
                            name="agreement"
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: 'agreement',
                                        value: e.target.checked,
                                    },
                                })
                            }
                            control={
                                <Checkbox
                                    size="small"
                                    checked={agreement || false}
                                />
                            }
                            label="I have read and agree to the terms of service."
                        />
                        <FlexBox>
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                sx={{ textTransform: 'capitalize' }}
                            >
                                Sign up
                            </Button>
                            <Span sx={{ mr: 1, ml: '20px' }}>or</Span>
                            <Button
                                sx={{ textTransform: 'capitalize' }}
                            // onClick={() => navigate("/session/signin")}
                            >
                                Sign in
                            </Button>
                        </FlexBox>
                    </ValidatorForm> */}

                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={userNameError}
                                id="User Name"
                                label="User Name"
                                placeholder="Enter User Name"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    userNameError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={userName}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setUserName,
                                        setUserNameError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={emailAddressError}
                                id="Email"
                                label="Email Address"
                                placeholder="Email Address"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    emailAddressError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={emailAddress}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setEmailAddress,
                                        setEmailAddressError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={passwordError}
                                id="Password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    passwordError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={password}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setPassword,
                                        setPasswordError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <FormControl fullWidth>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    labelId="Role"
                                    id="Role"
                                    value={role}
                                    label="Role"
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(e, setRole, setRoleError)
                                    }
                                >
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="Manager">Manager</MenuItem>
                                    <MenuItem value="HR">HR</MenuItem>
                                </Select>
                                <FormHelperText>
                                    {roleError && 'Field Required'}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateClose}>Cancel</Button>
                    <Button autoFocus onClick={handleCreateClickOpen}>
                        Create User
                    </Button>
                </DialogActions>
                <Snackbar
                    open={createSnackBar}
                    autoHideDuration={2000}
                    onClose={handleCreateClosed}
                    message="Name already exists"
                    action={createAction}
                />

                <Snackbar
                    open={emailSnackBar}
                    autoHideDuration={2000}
                    onClose={handleCreateClosed}
                    message="Email already exists"
                    action={emailAction}
                />
            </Dialog>

            <Dialog
                open={open2}
                onClose={open2Close}
                maxWidth="xs"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Super Admin Confirmation'}
                </DialogTitle>
                <DialogContent>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={superEmailAddressError}
                                id="Email"
                                label="Email Address"
                                placeholder="Email Address"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    superEmailAddressError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={superEmailAddress}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setSuperEmailAddress,
                                        setSuperEmailAddressError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={superPasswordError}
                                id="Password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    superPasswordError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={superPassword}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setSuperPassword,
                                        setSuperPasswordError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={open2Close}>Cancel</Button>
                    <Button autoFocus onClick={handleSuperAdmin}>
                        Confirm
                    </Button>
                </DialogActions>
                <Snackbar
                    open={createSnackBar}
                    autoHideDuration={2000}
                    onClose={handleCreateClosed}
                    message="Name already exists"
                    action={createAction}
                />
            </Dialog>

            <Dialog
                open={editUserDialog}
                onClose={handleEditClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Edit Category'}
                </DialogTitle>
                <DialogContent>
                    {/* <ValidatorForm onSubmit={handleFormSubmit} style={{ marginTop: "12px" }}>
                        <TextValidator
                            sx={{ mb: 3, width: '100%' }}
                            variant="outlined"
                            size="small"
                            label="Username"
                            onChange={handleChange}
                            type="text"
                            name="username"
                            value={username || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextValidator
                            sx={{ mb: 3, width: '100%' }}
                            variant="outlined"
                            size="small"
                            label="Email"
                            onChange={handleChange}
                            type="email"
                            name="email"
                            value={email || ''}
                            validators={['required', 'isEmail']}
                            errorMessages={[
                                'this field is required',
                                'email is not valid',
                            ]}
                        />
                        <TextValidator
                            sx={{ mb: '16px', width: '100%' }}
                            label="Password"
                            variant="outlined"
                            size="small"
                            onChange={handleChange}
                            name="password"
                            type="password"
                            value={password || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <FormControlLabel
                            sx={{ mb: '16px' }}
                            name="agreement"
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: 'agreement',
                                        value: e.target.checked,
                                    },
                                })
                            }
                            control={
                                <Checkbox
                                    size="small"
                                    checked={agreement || false}
                                />
                            }
                            label="I have read and agree to the terms of service."
                        />
                        <FlexBox>
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                sx={{ textTransform: 'capitalize' }}
                            >
                                Sign up
                            </Button>
                            <Span sx={{ mr: 1, ml: '20px' }}>or</Span>
                            <Button
                                sx={{ textTransform: 'capitalize' }}
                            // onClick={() => navigate("/session/signin")}
                            >
                                Sign in
                            </Button>
                        </FlexBox>
                    </ValidatorForm> */}

                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={userNameError}
                                id="User Name"
                                label="User Name"
                                placeholder="Enter User Name"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    userNameError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={userName}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setUserName,
                                        setUserNameError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={emailAddressError}
                                id="Email"
                                label="Email Address"
                                placeholder="Email Address"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    emailAddressError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={emailAddress}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setEmailAddress,
                                        setEmailAddressError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={passwordError}
                                id="Password"
                                label="Password"
                                placeholder="Password"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    passwordError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={password}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setPassword,
                                        setPasswordError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <FormControl fullWidth error={roleError}>
                                <InputLabel id="demo-simple-select-label">
                                    Role
                                </InputLabel>
                                <Select
                                    labelId="Role"
                                    id="Role"
                                    value={role}
                                    label="Role"
                                    size="small"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="Manager">Manager</MenuItem>
                                    <MenuItem value="HR">HR</MenuItem>
                                </Select>
                                <FormHelperText>
                                    {roleError && 'Field Required'}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button autoFocus onClick={handleEditClickOpen}>
                        Create User
                    </Button>
                </DialogActions>
                <Snackbar
                    open={editSnackBar}
                    autoHideDuration={2000}
                    onClose={handleEditClosed}
                    message="Name already exists"
                    action={editAction}
                />
            </Dialog>

            {/* Delete Confirmation Box */}
            <Dialog
                open={open3}
                onClose={open3Close}
                maxWidth="xs"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Delete User Confirmation'}
                </DialogTitle>
                <DialogContent>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={superEmailAddressError}
                                id="Email"
                                label="Email Address"
                                placeholder="Email Address"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    superEmailAddressError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={superEmailAddress}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setSuperEmailAddress,
                                        setSuperEmailAddressError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <TextField
                                error={superPasswordError}
                                id="Password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                size="small"
                                autoComplete="off"
                                helperText={
                                    superPasswordError === true
                                        ? 'Field Required'
                                        : ''
                                }
                                value={superPassword}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        setSuperPassword,
                                        setSuperPasswordError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={open3Close}>Cancel</Button>
                    <Button autoFocus onClick={onDelhandler}>
                        Confirm
                    </Button>
                </DialogActions>
                <Snackbar
                    open={createSnackBar}
                    autoHideDuration={2000}
                    onClose={handleCreateClosed}
                    message="Name already exists"
                    action={createAction}
                />
            </Dialog>

            {/* Delete the SuperAdmin message */}

            <Dialog
                open={open4}
                onClose={handleMessageClose}
                maxWidth="xs"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'You Can Not Delete The SuperAdmin User'}
                </DialogTitle>
                <DialogContent></DialogContent>
                <DialogActions>
                    <Button onClick={handleMessageClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AppUsersList
