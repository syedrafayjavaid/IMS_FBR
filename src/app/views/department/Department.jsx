import AddIcon from '@mui/icons-material/Add'
import {
    Card,
    Fab,
    Grid,
    IconButton,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
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
import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DepartmentCard from './DepartmentCard'
import CloseIcon from '@mui/icons-material/Close'
import config from '../../../config'

const DepartmentTable = styled(Table)(() => ({
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

const Department = () => {
    // Form validation errors State Setting
    const [createBrandName, setCreateBrandName] = React.useState('')
    const [createBrandNameError, setCreateBrandNameError] =
        React.useState(false)
    const [editBrandName, setEditBrandName] = React.useState('')
    const [editBrandNameError, setEditBrandNameError] = React.useState(false)

    // Setting States
    const [quantity, setQuantity] = React.useState([])
    const [brand, setBrand] = React.useState([])
    const [brandId, setBrandId] = React.useState('')
    const [image, setImage] = React.useState('')
    const [snackBar, setSnackBar] = React.useState(false)

    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)
   
        errorFunc(false)
    }

    const handleType = (event) => {
   
        setQuantity(event.target.value)
    }

    const handleType2 = (event) => {
     
        setBrand(event.target.value)
    }

    const [createBrandDialog, setCreateBrandDialog] = React.useState(false)
    const [editBrandDialog, setEditBrandDialog] = React.useState(false)

    const handleCreateClose = () => {
        setCreateBrandDialog(false)
        setCreateBrandNameError(false)
    }
    const handleEditClose = () => {
        setEditBrandDialog(false)
        setEditBrandNameError(false)
    }
    const handleClosed = () => {
        setSnackBar(false)
    }

    const handleCreateClickOpen = () => {
        // Check if any field of Form is Empty
        if (createBrandName === '') {
            setCreateBrandNameError(true)
        } else {
            createHandler()
        }
    }

    const handleEditClickOpen = () => {
        // Check if any field of Form is Empty
        if (editBrandName === '') {
            setEditBrandName(true)
        } else {
            editHandler()
        }
    }

    const handleOpen = (id) => {
     
        setCreateBrandDialog(true)
    }
    const handleClickOpen2 = () => {
        setCreateBrandDialog(true)
    }

    const handleImage = (e) => {
        setImage(e.target.files[0])
     
    }

    useEffect(() => {
        getAlldata()
    }, [])
    const getAlldata = () => {
        axios
            .get(`${config.base_url}/api/v1/department`)
            .then((res) => {
           
                setBrand(res.data.data)
      
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const onDelhandler = (editData) => {
     
        axios
            .delete(`${config.base_url}/api/v1/department/${editData}`)
            .then((res) => {
             
                getAlldata()
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const onEdithandler = (editDataId, editDataName) => {
        setEditBrandDialog(true)
    
        setEditBrandName(editDataName)
        setBrandId(editDataId)
    }

    const navigate = useNavigate()

    const createHandler = () => {
        let data = new FormData()
        data.append('name', createBrandName)

        const brandNameExist = brand.find((brand) => {
            return brand.name === createBrandName
        })

        if (brandNameExist) {
            setSnackBar(true)
            return
        }

        axios
            .post(`${config.base_url}/api/v1/department`, data)
            .then((res) => {
                if (res) {
                    getAlldata()
                    handleCreateClose()
                }

                setCreateBrandName('')
            })
            .catch((error) => {
              
            })
    }

    const editHandler = () => {
        let data = new FormData()
        data.append('name', editBrandName)

        const brandNameExist = brand.find((brand) => {
            return brand.name === editBrandName
        })

        if (brandNameExist) {
            setSnackBar(true)
            return
        }

        axios
            .put(`${config.base_url}/api/v1/department/${brandId}`, data)
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

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClosed}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClosed}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    return (
        <>
            <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
                <Box overflow="auto">
                    <DepartmentTable>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ px: 3 }} colSpan={4}>
                                    Name
                                </TableCell>
                                <TableCell sx={{ px: 0 }} colSpan={2}>
                                    Edit
                                </TableCell>
                                <TableCell sx={{ px: 0 }} colSpan={1}>
                                    Delete
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {brand.map((brand, index) => (
                                <DepartmentCard
                                    key={index}
                                    brand={brand}
                                    onEdit={onEdithandler}
                                    onDelete={onDelhandler}
                                />
                            ))}
                        </TableBody>
                    </DepartmentTable>
                </Box>
            </Card>

            <Dialog
                open={createBrandDialog}
                onClose={handleCreateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'ADD DEPARTMENT'}
                </DialogTitle>
                <DialogContent>
                 
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    error={createBrandNameError}
                                    id="brandname"
                                    label="Department Name"
                                    placeholder="Enter Department Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        createBrandNameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={createBrandName}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setCreateBrandName,
                                            setCreateBrandNameError
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
                    onClose={handleClosed}
                    message="Name already exists"
                    action={action}
                />
            </Dialog>

            <Dialog
                open={editBrandDialog}
                onClose={handleEditClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'EDIT DEPARTMENT'}
                </DialogTitle>
                <DialogContent>
                 
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    error={editBrandNameError}
                                    id="brandname"
                                    label="Department Name"
                                    placeholder="Enter Department Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        editBrandNameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={editBrandName}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setEditBrandName,
                                            setEditBrandNameError
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
                    onClose={handleClosed}
                    message="Name already exists"
                    action={action}
                />
            </Dialog>

            <Tooltip title="Add department">
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
                    onClick={() => setCreateBrandDialog(true)}
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

export default Department
