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
    const [createSnackBar, setCreateSnakBar] = React.useState(false)
    const [editSnackBar, setEditSnackBar] = React.useState(false)
    const [userId, setUserId] = React.useState('')

    const [createEmployeeDialog, setCreateEmployeeDialog] =
        React.useState(false)
    const [editEmployeeDialog, setEditEmployeeDialog] = React.useState(false)

    const [name, setName] = React.useState('')
    const [nameError, setNameError] = React.useState(false)
    const [office, setOffice] = React.useState('')
    const [officeError, setOfficeError] = React.useState(false)
    const [description, setDescription] = React.useState('')
    const [descriptionError, setDescriptionError] = React.useState(false)
    const [cnic, setCnic] = React.useState('')
    const [cnicError, setCnicError] = React.useState(false)
    const [employeeId, setEmployeeId] = React.useState('')
    const [employeeIdError, setEmployeeIdError] = React.useState(false)
    const [checked, setChecked] = React.useState(true)

    const Input = styled('input')({
        display: 'none',
    })

    const handleCreateChange = (event) => {
        setChecked(event.target.checked)
    }

    const handleEditChange = (event) => {
        setChecked(event.target.checked)
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
        setName('')
        setOffice('')
        setCnic('')
        setEmployeeId('')
        setDescription('')
        setImage('')
        setNameError(false)
        setOfficeError(false)
        setCnicError(false)
        setEmployeeIdError(false)
        setDescriptionError(false)
        setChecked(true)
    }

    const handleCreateSnackBarClose = () => {
        setCreateSnakBar(false)
    }

    const handleEditClose = () => {
        setEditEmployeeDialog(false)
        setName('')
        setOffice('')
        setCnic('')
        setEmployeeId('')
        setDescription('')
        setImage('')
        setNameError(false)
        setOfficeError(false)
        setCnicError(false)
        setEmployeeIdError(false)
        setDescriptionError(false)
        setChecked(true)
    }

    const handleEditSnackBarClose = () => {
        setEditSnackBar(false)
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
            name === '' ||
            office === '' ||
            cnic === '' ||
            description === '' ||
            employeeId === ''
        ) {
            if (name === '') {
                setNameError(true)
            }
            if (office === '') {
                setOfficeError(true)
            }
            if (cnic === '') {
                setCnicError(true)
            }
            if (description === '') {
                setDescriptionError(true)
            }
            if (employeeId === '') {
                setEmployeeIdError(true)
            }
        } else {
            createHandler()
        }
    }

    const handleEditClickOpen = () => {
        if (
            name === '' ||
            office === '' ||
            cnic === '' ||
            description === '' ||
            employeeId === ''
        ) {
            if (name === '') {
                setNameError(true)
            }
            if (office === '') {
                setOfficeError(true)
            }
            if (cnic === '') {
                setCnicError(true)
            }
            if (description === '') {
                setDescriptionError(true)
            }
            if (employeeId === '') {
                setEmployeeIdError(true)
            }
        } else {
            editHandler()
        }
    }

    const createHandler = () => {
        let data = new FormData()
        data.append('name', name)
        data.append('photo', image)
        data.append('office', office)
        data.append('CNIC', cnic)
        data.append('detail', description)
        data.append('employeeId', employeeId)
        data.append('purchase', checked)

        const userNameExist = users.find((user) => {
            return user.employeeId === employeeId
        })

        if (userNameExist) {
            setCreateSnakBar(true)
            return
        }

        axios
            .post(`${config.base_url}/api/v1/employee`, data)
            .then((res) => {
                if (res) {
                    handleCreateClose()
                    getAlldata()
                }

                setName('')
                setOffice('')
                setCnic('')
                setEmployeeId('')
                setDescription('')
                setImage('')
                setChecked(true)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const editHandler = () => {
        let data = new FormData()
        data.append('name', name)
        data.append('photo', image)
        data.append('office', office)
        data.append('CNIC', cnic)
        data.append('detail', description)
        data.append('employeeId', employeeId)
        data.append('purchase', checked)

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
                if (error.message === 'Request failed with status code 400') {
                    setEditSnackBar(true)
                }
            })
    }

    const onEditHandler = (id, user) => {
        console.log(user.purchase)
        setEditEmployeeDialog(true)
        setName(user.name)
        setOffice(user.office)
        setCnic(user.CNIC)
        setImage(user.photo)
        setEmployeeId(user.employeeId)
        setDescription(user.detail)
        setChecked(user.purchase)
        setUserId(id)
    }

    const handleCreateClosed = (event, reason) => {
        if (reason === 'clickaway') {
            console.log('Edit Button Clicked')
            return
        }
    }

    const handleEditClosed = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
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
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    error={officeError}
                                    id="office"
                                    label="Office"
                                    placeholder="Enter Office"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        officeError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={office}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setOffice,
                                            setOfficeError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    error={cnicError}
                                    id="cnic"
                                    label="CNIC"
                                    placeholder="Enter CNIC"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        cnicError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={cnic}
                                    onChange={(e) =>
                                        handleChange(e, setCnic, setCnicError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    error={employeeIdError}
                                    id="employeeId"
                                    label="Employee ID"
                                    placeholder="Enter Employee ID"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        employeeIdError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={employeeId}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setEmployeeId,
                                            setEmployeeIdError
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
                                    checked={checked}
                                    defaultChecked
                                />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Grid>

                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    error={descriptionError}
                                    helperText={
                                        descriptionError && 'Field Required'
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
                                            setDescription,
                                            setDescriptionError
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
                    open={createSnackBar}
                    autoHideDuration={5000}
                    onClose={handleCreateClosed}
                    message="Employee with same Id already exists"
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
                    {'EDIT EMPLOYEE'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    error={nameError}
                                    id="category"
                                    label="Name"
                                    placeholder="Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        nameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={name}
                                    onChange={(e) =>
                                        handleChange(e, setName, setNameError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    error={officeError}
                                    id="office"
                                    label="Office"
                                    placeholder="Enter Office"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        officeError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={office}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setOffice,
                                            setOfficeError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    error={cnicError}
                                    id="cnic"
                                    label="CNIC"
                                    placeholder="Enter CNIC"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        cnicError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={cnic}
                                    onChange={(e) =>
                                        handleChange(e, setCnic, setCnicError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    error={employeeIdError}
                                    id="employeeId"
                                    label="Employee ID"
                                    placeholder="Enter Employee ID"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        employeeIdError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={employeeId}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setEmployeeId,
                                            setEmployeeIdError
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
                                    checked={checked}
                                    defaultChecked
                                />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Grid>

                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    error={descriptionError}
                                    helperText={
                                        descriptionError && 'Field Required'
                                    }
                                    label="Detail"
                                    placeholder="Detail"
                                    style={{ textAlign: 'left' }}
                                    hintText="Message Field"
                                    floatingLabelText="MultiLine and FloatingLabel"
                                    multiline
                                    fullWidth
                                    rows={3}
                                    value={description}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setDescription,
                                            setDescriptionError
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
                    open={editSnackBar}
                    autoHideDuration={5000}
                    onClose={handleEditClosed}
                    message="Employee with same Id already exists"
                    action={editAction}
                />
            </Dialog>
        </>
    )
}

export default UsersList
