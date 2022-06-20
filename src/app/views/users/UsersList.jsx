import React, { useEffect } from 'react'

// material
import AddIcon from '@mui/icons-material/Add'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import CloseIcon from '@mui/icons-material/Close'
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    Grid,
    IconButton,
    Snackbar,
    Switch,
    TextField,
    Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import axios from 'axios'
import config from 'config'
import UsersCard from './UsersCard'

const label = { inputProps: { 'aria-label': 'Switch demo' } }

const UsersList = () => {
    const [users, setUsers] = React.useState([])
    const [image, setImage] = React.useState('')
    const [snackBar, setSnackBar] = React.useState(false)
    const [userId, setUserId] = React.useState('')

    const [createEmployeeDialog, setCreateEmployeeDialog] =
        React.useState(false)
    const [editEmployeeDialog, setEditEmployeeDialog] = React.useState(false)

    const [createName, setCreateName] = React.useState('')
    const [createNameError, setCreateNameError] = React.useState(false)
    const [createOffice, setCreateOffice] = React.useState('')
    const [createOfficeError, setCreateOfficeError] = React.useState(false)
    const [createDescription, setCreateDescription] = React.useState('')
    const [createDescriptionError, setCreateDescriptionError] =
        React.useState(false)
    const [createCnic, setCreateCnic] = React.useState('')
    const [createCnicError, setCreateCnicError] = React.useState(false)
    const [createEmployeeId, setCreateEmployeeId] = React.useState('')
    const [createEmployeeIdError, setCreateEmployeeIdError] =
        React.useState(false)
    const [createChecked, setCreateChecked] = React.useState(true)

    const [editName, setEditName] = React.useState('')
    const [editNameError, setEditNameError] = React.useState(false)
    const [editOffice, setEditOffice] = React.useState('')
    const [editOfficeError, setEditOfficeError] = React.useState(false)
    const [editDescription, setEditDescription] = React.useState('')
    const [editDescriptionError, setEditDescriptionError] =
        React.useState(false)
    const [editCnic, setEditCnic] = React.useState('')
    const [editCnicError, setEditCnicError] = React.useState(false)
    const [editEmployeeId, setEditEmployeeId] = React.useState('')
    const [editEmployeeIdError, setEditEmployeeIdError] = React.useState(false)
    const [editChecked, setEditChecked] = React.useState(true)

    const Input = styled('input')({
        display: 'none',
    })

    const handleCreateChange = (event) => {
        setCreateChecked(event.target.checked)
    }

    const handleEditChange = (event) => {
        setEditChecked(event.target.checked)
    }

    useEffect(() => {
        getAlldata()
    }, [])
    const getAlldata = () => {
        axios
            .get(`${config.base_url}/api/v1/employee`)
            .then((res) => {
                console.log(res)
                setUsers(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const handleCreateClose = () => {
        setCreateEmployeeDialog(false)
    }

    const handleEditClose = () => {
        setEditEmployeeDialog(false)
    }

    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)
        console.log(e.target.name, e.target.value)
        errorFunc(false)
    }

    const handleImage = (e) => {
        setImage(e.target.files[0])
        console.log(e.target.files[0], 'e.target.files[0]')
    }

    const handleCreateClickOpen = () => {
        if (
            createName === '' ||
            createOffice === '' ||
            createCnic === '' ||
            createDescription === '' ||
            createEmployeeId === ''
        ) {
            if (createName === '') {
                setCreateNameError(true)
            }
            if (createOffice === '') {
                setCreateOfficeError(true)
            }
            if (createCnic === '') {
                setCreateCnicError(true)
            }
            if (createDescription === '') {
                setCreateDescriptionError(true)
            }
            if (createEmployeeId === '') {
                setCreateEmployeeIdError(true)
            }
        } else {
            createHandler()
        }
    }

    const handleEditClickOpen = () => {
        if (
            editName === '' ||
            editOffice === '' ||
            editCnic === '' ||
            editDescription === '' ||
            editEmployeeId === ''
        ) {
            if (editName === '') {
                setEditNameError(true)
            }
            if (editOffice === '') {
                setEditOfficeError(true)
            }
            if (editCnic === '') {
                setEditCnicError(true)
            }
            if (editDescription === '') {
                setEditDescriptionError(true)
            }
            if (editEmployeeId === '') {
                setEditEmployeeIdError(true)
            }
        } else {
            editHandler()
        }
    }

    const createHandler = () => {
        let data = new FormData()
        data.append('name', createName)
        data.append('photo', image)
        data.append('office', createOffice)
        data.append('CNIC', createCnic)
        data.append('detail', createDescription)
        data.append('employeeId', createEmployeeId)
        data.append('purchase', createChecked)

        const userNameExist = users.find((user) => {
            return user.name === createName
        })

        if (userNameExist) {
            setSnackBar(true)
            return
        }

        axios
            .post(`${config.base_url}/api/v1/employee`, data)
            .then((res) => {
                console.log(res.data.data)
                if (res) {
                    handleCreateClose()
                    getAlldata()
                }

                setCreateName('')
                setCreateOffice('')
                setCreateCnic('')
                setCreateEmployeeId('')
                setCreateDescription('')
                setImage('')
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const editHandler = () => {
        let data = new FormData()
        data.append('name', editName)
        data.append('photo', image)
        data.append('office', editOffice)
        data.append('CNIC', editCnic)
        data.append('detail', editDescription)
        data.append('employeeId', editEmployeeId)
        data.append('purchase', editChecked)

        const userNameExist = users.find((user) => {
            return user.name === editName
        })

        if (userNameExist) {
            setSnackBar(true)
            return;
        }

        axios
            .put(`${config.base_url}/api/v1/employee/${userId}`, data)
            .then((res) => {
                console.log(res.msg)
                if (res) {
                    getAlldata()
                    handleEditClose()
                }
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const onEditHandler = (id, user) => {
        console.log(user.purchase)
        setEditEmployeeDialog(true)
        setEditName(user.name)
        setEditOffice(user.office)
        setEditCnic(user.CNIC)
        setImage(user.photo)
        setEditEmployeeId(user.employeeId)
        setEditDescription(user.detail)
        setEditChecked(user.purchase)
        setUserId(id)
    }

    const handleCreateClosed = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setCreateEmployeeDialog(false)
    }

    const handleEditClosed = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setEditEmployeeDialog(false)
    }

    const createAction = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleCreateClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCreateClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const editAction = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleEditClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleEditClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    const onDeleteHandler = (id) => {
        axios
            .delete(`${config.base_url}/api/v1/employee/${id}`)
            .then((res) => {
                console.log(res.msg)
                getAlldata()
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    return (
        <>
            <Container>
                <br></br>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Employes
                </Typography>
                <Grid container spacing={3}>
                    {users.map((user) => (
                        <Grid key={user.id} item xs={12} sm={6} md={3}>
                            <UsersCard
                                user={user}
                                onDelete={onDeleteHandler}
                                onEdit={onEditHandler}
                            />
                        </Grid>
                    ))}
                </Grid>
                <br></br>
                <br></br>
                <br></br>
            </Container>
            <Tooltip title="Add Employee">
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
                    onClick={() => setCreateEmployeeDialog(true)}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Dialog
                open={createEmployeeDialog}
                onClose={handleCreateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'ADD EMPLOYEE'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    error={createNameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
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
                                    error={createOfficeError}
                                    id="office"
                                    label="Office"
                                    placeholder="Enter Office"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        createOfficeError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={createOffice}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setCreateOffice,
                                            setCreateOfficeError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    error={createCnicError}
                                    id="cnic"
                                    label="CNIC"
                                    placeholder="Enter CNIC"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        createCnicError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={createCnic}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setCreateCnic,
                                            setCreateCnicError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    error={createEmployeeIdError}
                                    id="employeeId"
                                    label="Employee ID"
                                    placeholder="Enter Employee ID"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        createEmployeeIdError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={createEmployeeId}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setCreateEmployeeId,
                                            setCreateEmployeeIdError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                <label htmlFor="contained-button-file">
                                    <Input
                                        accept="image/*"
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        onChange={handleImage}
                                    />
                                    <Button
                                        variant="contained"
                                        component="span"
                                        startIcon={<AddAPhotoIcon />}
                                    >
                                        Upload
                                    </Button>
                                </label>
                            </Grid>
                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                <span>Purchase</span>
                                <Switch
                                    {...label}
                                    onChange={handleCreateChange}
                                    checked={createChecked}
                                    defaultChecked
                                />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Grid>
                            

                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    error={createDescriptionError}
                                    helperText={
                                        createDescriptionError &&
                                        'Field Required'
                                    }
                                    label="Detail"
                                    placeholder="Detail"
                                    style={{ textAlign: 'left' }}
                                    hintText="Message Field"
                                    floatingLabelText="MultiLine and FloatingLabel"
                                    multiline
                                    fullWidth
                                    rows={3}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setCreateDescription,
                                            setCreateDescriptionError
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateClose}>Cancel</Button>
                    <Button autoFocus onClick={handleCreateClickOpen}>
                        Confirm
                    </Button>
                </DialogActions>

                <Snackbar
                    open={snackBar}
                    autoHideDuration={5000}
                    onClose={handleCreateClosed}
                    message="Name Already Exists"
                    action={createAction}
                />
            </Dialog>
            <Dialog
                open={editEmployeeDialog}
                onClose={handleEditClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'ADD EMPLOYEE'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    error={editNameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
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
                                    error={editOfficeError}
                                    id="office"
                                    label="Office"
                                    placeholder="Enter Office"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        editOfficeError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={editOffice}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setEditOffice,
                                            setEditOfficeError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    error={editCnicError}
                                    id="cnic"
                                    label="CNIC"
                                    placeholder="Enter CNIC"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        editCnicError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={editCnic}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setEditCnic,
                                            setEditCnicError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    error={editEmployeeIdError}
                                    id="employeeId"
                                    label="Employee ID"
                                    placeholder="Enter Employee ID"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        editEmployeeIdError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={editEmployeeId}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setEditEmployeeId,
                                            setEditEmployeeIdError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                <label htmlFor="contained-button-file">
                                    <Input
                                        accept="image/*"
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        onChange={handleImage}
                                    />
                                    <Button
                                        variant="contained"
                                        component="span"
                                        startIcon={<AddAPhotoIcon />}
                                    >
                                        Upload
                                    </Button>
                                </label>
                            </Grid>
                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                <span>Purchase</span>
                                <Switch
                                    {...label}
                                    onChange={handleEditChange}
                                    checked={editChecked}
                                    defaultChecked
                                />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Grid>
                            

                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    error={editDescriptionError}
                                    helperText={
                                        editDescriptionError && 'Field Required'
                                    }
                                    label="Detail"
                                    placeholder="Detail"
                                    style={{ textAlign: 'left' }}
                                    hintText="Message Field"
                                    floatingLabelText="MultiLine and FloatingLabel"
                                    multiline
                                    fullWidth
                                    rows={3}
                                    value={editDescription}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setEditDescription,
                                            setEditDescriptionError
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button autoFocus onClick={handleEditClickOpen}>
                        Confirm
                    </Button>
                </DialogActions>

                <Snackbar
                    open={snackBar}
                    autoHideDuration={5000}
                    onClose={handleEditClosed}
                    message="Name Already Exists"
                    action={editAction}
                />
            </Dialog>
        </>
    )
}

export default UsersList
