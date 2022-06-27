import axios from 'axios'
import React, { useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { Container, Fab, Grid, Switch, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/system'
import CategoryCard from 'app/components/categories/CategoryCard'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import config from 'config'
import { ConfirmationDialog } from 'app/components'

const label = { inputProps: { 'aria-label': 'Switch demo' } }

const modifiedBy = 'noor'
const createdBy = 'imad'

const CategoriesList = () => {
    const [categories, setCategories] = React.useState([])
    const [open, setOpen] = React.useState(false)

    const [imge, setImage] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [categoryError, setCategoryError] = React.useState(false)
    const [categoryId, setCategoryId] = React.useState('')

    const [createSnackBar, setCreateSnackBar] = React.useState(false)
    const [editSnackBar, setEditSnackBar] = React.useState(false)
    const [createCategoryDialog, setCreateCategoryDialog] =
        React.useState(false)
    const [editCategoryDialog, setEditCategoryDialog] = React.useState(false)

    const handleCreateClose = () => {
        setCreateCategoryDialog(false)
        setCategory('')
        setCategoryError(false)
    }

    const handleCreateSnackBarClose = () => {
        setCreateSnackBar(false)
    }

    const handleEditClose = () => {
        setEditCategoryDialog(false)
        setCategory('')
        setCategoryError(false)
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
        if (category === '') {
            setCategoryError(true)
        } else {
            createHandler()
        }
    }

    const handleEditClickOpen = () => {
        if (category === '') {
            setCategoryError(true)
        } else {
            editHandler()
        }
    }

    const handleCreateClosed = (event, reason) => {
        if (reason === 'clickaway') {
            console.log('Edit Button Clicked')
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

    const Input = styled('input')({
        display: 'none',
    })

    useEffect(() => {
        getAlldata()
    }, [])

    const getAlldata = () => {
        axios
            .get(`${config.base_url}/api/v1/category`)
            .then((res) => {
                setCategories(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const createHandler = () => {
        let data = new FormData()
        data.append('file', imge)
        data.append('name', category)
        data.append('modifiedBy', modifiedBy)
        data.append('createdBy', createdBy)

        const categoryNameExist = categories.find((categoryData) => {
            return categoryData.name === category
        })

        if (categoryNameExist) {
            setCreateSnackBar(true)
            return
        }

        axios
            .post(`${config.base_url}/api/v1/category`, data)
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
        data.append('name', category)
        data.append('file', imge)

        axios
            .put(`${config.base_url}/api/v1/category/${categoryId}`, data)
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

    const onDelhandler = (id) => {
        setCategoryId(id)
        setOpen(true)
        if (open && categoryId) {

            axios
                .delete(`${config.base_url}/api/v1/category/${categoryId}`)
                .then((res) => {
                    console.log(res.msg)
                    getAlldata()
                    setOpen(false)
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
        }
    }

    const onEdithandler = (id, category) => {
        console.log(category)
        setEditCategoryDialog(true)
        setCategory(category)
        setImage(category.photo)
        setCategoryId(id)
    }

    return (
        <>

        {
            categories.length === 0 &&<div>
                    code is here

            </div>
        }
        {
                    categories.length>0 && 
          
          <div>

           
            {open && (
                <ConfirmationDialog
                    open={open}
                    onConfirmDialogClose={() => {
                        setOpen(false)
                    }}
                    title={`Are You Sure?`}
                    text={`Are You Sure You Want To Delete This Category?`}
                    onYesClick={onDelhandler}
                />
            )}
            <Tooltip title="Add Category">
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
                    onClick={() => setCreateCategoryDialog(true)}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Container>
                <br></br>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Categories
                </Typography>
                <Grid container spacing={3}>
                    {categories.map((category) => (
                        <Grid key={category._id} item xs={12} sm={6} md={3}>
                            <CategoryCard
                                category={category}
                                onEdit={onEdithandler}
                                onDelete={onDelhandler}
                            />
                        </Grid>
                    ))}
                </Grid>
                <br></br>
                <br></br>
                <br></br>
            </Container>

            <Dialog
                open={createCategoryDialog}
                onClose={handleCreateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'ADD CATEGORY'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={5} md={5} sm={5} xs={5}>
                                <TextField
                                    error={categoryError}
                                    id="category"
                                    label="Category Name"
                                    placeholder="Category Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        categoryError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={category}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setCategory,
                                            setCategoryError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                <span>Active</span>
                                <Switch {...label} defaultChecked />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
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
                    autoHideDuration={2000}
                    onClose={handleCreateClosed}
                    message="Name already exists"
                    action={createAction}
                />
            </Dialog>

            <Dialog
                open={editCategoryDialog}
                onClose={handleEditClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Edit Category'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={7} md={7} sm={7} xs={7}>
                                <TextField
                                    error={categoryError}
                                    id="category"
                                    label="Category Name"
                                    placeholder="Category Name"
                                    size="small"
                                    autoComplete="off"
                                    helperText={
                                        categoryError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={category}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setCategory,
                                            setCategoryError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={5} md={5} sm={5} xs={5}>
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
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button
                        autoFocus
                        onClick={() => {
                            handleEditClickOpen()
                        }}
                    >
                        Confirm
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
            </div>
        }
        </>
    )
}

export default CategoriesList
