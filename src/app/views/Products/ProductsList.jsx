// import React ,{useState, useEffect} from 'react'

// material
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import {
    Container,
    Fab,
    FormHelperText,
    Grid,
    IconButton,
    Snackbar,
    Typography,
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../../components/products/ProductCard'

import { makeStyles } from '@material-ui/core/styles'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { CardContent } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/system'
import axios from 'axios'
import QRCode from 'qrcode'
import CloseIcon from '@mui/icons-material/Close'
import config from '../../../config'
import { identity } from 'lodash'
import { ConfirmationDialog } from 'app/components'
import SummarizeIcon from '@mui/icons-material/Summarize'
import { CSVLink } from 'react-csv'

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
const Input = styled('input')({
    display: 'none',
})

const ProductsList = () => {
    const userName = localStorage.getItem('username')

    const [imageUrl, setImageUrl] = React.useState('')
    const [text, setText] = React.useState('')

    const [productId, setProductId] = React.useState('')

    const [snackBar, setSnackBar] = React.useState(false)

    // Form validation errors State Setting
    const [createName, setCreateName] = React.useState('')
    const [createNameError, setCreateNameError] = React.useState(false)
    const [createProductTypeName, setCreateProductTypeName] = React.useState('')
    const [createProductTypeNameError, setCreateProductTypeNameError] =
        React.useState(false)
    const [createProductCategory, setCreateProductCategory] = React.useState('')
    const [createProductCategoryError, setCreateProductCategoryError] =
        React.useState(false)
    const [createModel, setCreateModel] = React.useState('')
    const [createModelError, setCreateModelError] = React.useState(false)
    const [createBrandName, setCreateBrandName] = React.useState('')
    const [createBrandNameError, setCreateBrandNameError] =
        React.useState(false)
    const [createDescription, setCreateDescription] = React.useState('')
    const [createDescriptionError, setCreateDescriptionError] =
        React.useState(false)

    const [editName, setEditName] = React.useState('')
    const [editNameError, setEditNameError] = React.useState(false)
    const [editProductTypeName, setEditProductTypeName] = React.useState('')
    const [editProductTypeNameError, setEditProductTypeNameError] =
        React.useState(false)
    const [editProductCategory, setEditProductCategory] = React.useState('')
    const [editProductCategoryError, setEditProductCategoryError] =
        React.useState(false)
    const [editModel, setEditModel] = React.useState('')
    const [editModelError, setEditModelError] = React.useState(false)
    const [editBrandName, setEditBrandName] = React.useState('')
    const [editBrandNameError, setEditBrandNameError] = React.useState(false)
    const [editDescription, setEditDescription] = React.useState('')
    const [editDescriptionError, setEditDescriptionError] =
        React.useState(false)

    const [image, setImage] = React.useState('')
    const [imageError, setImageError] = React.useState(false)
    const [createdBy, setCreatedBy] = React.useState(userName)
    const [createdByError, setCreatedByError] = React.useState(false)
    const [modifiedBy, setModifiedBy] = React.useState(userName)
    const [modifiedByError, setModifiedByError] = React.useState(false)

    const [createProductDialog, setCreateProductDialog] = React.useState(false)
    const [editProductDialog, setEditProductDialog] = React.useState(false)

    // Setting States
    const [quantity, setQuantity] = React.useState([])
    const [category, setCategory] = React.useState([])
    const [product1, setProduct1] = React.useState([])
    const [brands, setBrands] = React.useState([])

    // web came code

    const [text1, setText1] = useState('')
    const [open, setOpen] = React.useState(false)
    const [imageUrl1, setImageUrl1] = useState('')
    const [scanResultFile, setScanResultFile] = useState('')
    const classes = useStyles()

    const generateQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(text1)
            setImageUrl1(response)
        } catch (error) {
            console.log(error)
        }
    }
    const handleErrorFile = (error) => {
        console.log(error)
    }
    const handleScanFile = (result) => {
        if (result) {
            setScanResultFile(result)
        }
    }
    const handleErrorWebCam = (error) => {
        console.log(error)
    }

    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)

        errorFunc(false)
    }

    const handleCreateType = (event) => {
        setCreateProductTypeName(event.target.value)
    }

    const handleCreateType2 = (event) => {
        setCreateProductCategory(event.target.value)
    }

    const handleCreateType3 = (event) => {
        setCreateBrandName(event.target.value)
    }

    const handleEditType = (event) => {
        setEditProductTypeName(event.target.value)
    }

    const handleEditType2 = (event) => {
        setEditProductCategory(event.target.value)
    }

    const handleEditType3 = (event) => {
        setEditBrandName(event.target.value)
    }

    const handleCreateClickOpen = () => {
        // Check if any field of Form is Empty
        if (
            createName === '' ||
            createProductTypeName === '' ||
            createProductCategory === '' ||
            createBrandName === '' ||
            createDescription === '' ||
            createModel === ''
        ) {
            if (createName === '') {
                setCreateNameError(true)
            }
            if (createDescription === '') {
                setCreateDescriptionError(true)
            }
            if (createProductTypeName === '') {
                setCreateProductTypeNameError(true)
            }
            if (createProductCategory === '') {
                setCreateProductCategoryError(true)
            }
            if (createBrandName === '') {
                setCreateBrandNameError(true)
            }
            if (createModel === '') {
                setCreateModelError(true)
            }
        } else {
            checking()
        }
    }

    const handleEditClickOpen = () => {
        // Check if any field of Form is Empty
        if (
            editName === '' ||
            editProductTypeName === '' ||
            editProductCategory === '' ||
            editBrandName === '' ||
            editDescription === '' ||
            editModel === ''
        ) {
            if (editName === '') {
                setEditNameError(true)
            }
            if (editDescription === '') {
                setEditDescriptionError(true)
            }
            if (editProductTypeName === '') {
                setEditProductTypeNameError(true)
            }
            if (editProductCategory === '') {
                setEditProductCategoryError(true)
            }
            if (editBrandName === '') {
                setEditBrandNameError(true)
            }
            if (editModel === '') {
                setEditModelError(true)
            }
        } else {
            editHandler()
        }
    }

    const handleCreateClose = () => {
        setCreateProductDialog(false)
    }

    const handleEditClose = () => {
        setEditProductDialog(false)
    }

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    useEffect(() => {
        getAlldata()
    }, [])
    const getAlldata = () => {
        axios
            .get(`${config.base_url}/api/v1/products`)
            .then((res) => {
                setProduct1(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        axios
            .get(config.base_url + '/api/v1/category')
            .then((res) => {
                setCategory(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        axios
            .get(config.base_url + '/api/v1/productType ')
            .then((res) => {
                setQuantity(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        axios
            .get(config.base_url + '/api/v1/brand')
            .then((res) => {
                setBrands(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const checking = () => {
        let data = new FormData()

        data.append('name', createName)
        data.append('productTypeId', createProductTypeName)
        data.append('categoryId', createProductCategory)
        data.append('model', createModel)
        data.append('brandId', createBrandName)
        data.append('file', image)
        data.append('createdBy', createdBy)
        data.append('detail', createDescription)

        const productNameExist = product1.find((product) => {
            return product.name === createName
        })

        if (productNameExist) {
            setSnackBar(true)
            return
        }

        axios
            .post(config.base_url + '/api/v1/products ', data)
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

    const onEditHandler = (id, product) => {
        setEditProductDialog(true)
        setEditName(product.name)
        setEditProductTypeName(product.productTypeId)
        setEditProductCategory(product.categoryId)
        setEditModel(product.model)
        setEditBrandName(product.brandId)
        setImage(product.photo)
        setModifiedBy(product.createdBy)
        setEditDescription(product.detail)
        setProductId(id)
    }

    const editHandler = () => {
        let data = new FormData()
        data.append('name', editName)
        data.append('productTypeId', editProductTypeName)
        data.append('categoryId', editProductCategory)
        data.append('model', editModel)
        data.append('brandId', editBrandName)
        data.append('photo', image)
        data.append('modifiedBy', modifiedBy)
        data.append('detail', editDescription)

        // const productNameExist = product1.find((product) => {
        //     return product.name === editName
        // })

        // if (productNameExist) {
        //     setSnackBar(true)
        //     return
        // }

        axios
            .put(config.base_url + `/api/v1/products/${productId}`, data)
            .then((res) => {
                if (res) {
                    getAlldata()
                    handleEditClose()
                }
            })
            .catch((error) => {
                if (error.message === 'Request failed with status code 400') {
                    setSnackBar(true)
                }
            })
    }

    const onDelhandler = (id) => {
        setProductId(id)
        setOpen(true)
        if (open && productId) {
            axios
                .delete(config.base_url + `/api/v1/products/${productId}`)
                .then((res) => {
                    getAlldata()
                    setOpen(false)
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
        }
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
        { label: 'Product Name', key: 'name' },
        { label: 'Product Id', key: 'productId' },
        { label: 'Model', key: 'model' },
        { label: 'Detail', key: 'detail' },
        { label: 'Quantity', key: 'quantity' },
        { label: 'Average Price', key: 'averagePrice' },
        { label: 'Modification Date', key: 'modifiedAt' },
        { label: 'Modified By', key: 'modifiedBy' },
        { label: 'Created By', key: 'createdBy' },
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
                    text={`Are You Sure You Want To Delete This Product?`}
                    onYesClick={onDelhandler}
                />
            )}
            <Tooltip title="Add Product">
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
                    onClick={() => setCreateProductDialog(true)}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>

            <Tooltip title="Generate Report">
                <Fab
                    color="primary"
                    aria-label="Add"
                    size="medium"
                    style={{
                        zIndex: 999,
                        right: '4vw',
                        top: '9vh',
                        position: 'fixed',
                    }}
                >
                    <CSVLink
                        filename={'all-products.csv'}
                        data={product1}
                        headers={headers}
                    >
                        <div style={{ marginTop: '8px' }}>
                            <SummarizeIcon />
                        </div>
                    </CSVLink>
                </Fab>
            </Tooltip>

            <Container>
                <br></br>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Assets / Items
                </Typography>
                <Grid container spacing={3}>
                    {product1.map((product) => (
                        <Grid
                            key={product._id}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                        >
                            <ProductCard
                                product={product}
                                onDelete={onDelhandler}
                                onEdit={onEditHandler}
                            />
                        </Grid>
                    ))}
                </Grid>
                <br></br>
                <br></br>
                <br></br>
            </Container>

            <Dialog
                open={createProductDialog}
                fullWidth={true}
                onClose={handleCreateClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'ADD ASSETS / ITEMS'}
                </DialogTitle>
                <DialogContent>
                    <br></br>

                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={createNameError}
                                    id="name"
                                    label="Product Name"
                                    placeholder="Product Name"
                                    autoComplete="off"
                                    helperText={
                                        createNameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={createName}
                                    size="small"
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

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl
                                        size="small"
                                        error={createProductTypeNameError}
                                        fullWidth
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Product Type
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={createProductTypeName}
                                            label="Product Type"
                                            onChange={handleCreateType}
                                        >
                                            {quantity.map((productType) => {
                                                return (
                                                    <MenuItem
                                                        key={productType._id}
                                                        value={productType._id}
                                                    >
                                                        {productType.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                        <FormHelperText>
                                            {' '}
                                            {createProductTypeNameError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl
                                        size="small"
                                        error={createProductCategoryError}
                                        fullWidth
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Product Category
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={createProductCategory}
                                            label="Product Category"
                                            onChange={handleCreateType2}
                                        >
                                            {category.map((productCategory) => {
                                                return (
                                                    <MenuItem
                                                        key={
                                                            productCategory._id
                                                        }
                                                        value={
                                                            productCategory._id
                                                        }
                                                    >
                                                        {productCategory.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                        <FormHelperText>
                                            {createProductCategoryError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    error={createModelError}
                                    id="name"
                                    label="Model"
                                    placeholder="Model"
                                    autoComplete="off"
                                    helperText={
                                        createModelError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={createModel}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setCreateModel,
                                            setCreateModelError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl
                                        size="small"
                                        error={createBrandNameError}
                                        fullWidth
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Brand
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={createBrandName}
                                            label="Brand"
                                            onChange={handleCreateType3}
                                        >
                                            {brands.map((brand) => {
                                                return (
                                                    <MenuItem
                                                        key={brand._id}
                                                        value={brand._id}
                                                    >
                                                        {brand.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                        <FormHelperText>
                                            {createBrandNameError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid
                                item
                                lg={4}
                                md={4}
                                sm={4}
                                xs={4}
                                style={{ justifyContent: 'center' }}
                            >
                                <Box>
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
                                </Box>
                            </Grid>
                        </Grid>
                        <br></br>

                        <Grid container spacing={3}>
                            <Grid item lg={7} md={7} sm={7} xs={7}>
                                <TextField
                                    disabled
                                    error={createdByError}
                                    id="name"
                                    label="Created By"
                                    placeholder="Created By"
                                    autoComplete="off"
                                    helperText={
                                        setCreatedByError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={createdBy}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setCreatedBy,
                                            setCreatedByError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    label="Detail"
                                    placeholder="Detail"
                                    style={{ textAlign: 'left' }}
                                    hinttext="Message Field"
                                    floatinglabeltext="MultiLine and FloatingLabel"
                                    multiline
                                    fullWidth
                                    rows={3}
                                    value={createDescription}
                                    error={createDescriptionError}
                                    helperText={
                                        createDescriptionError &&
                                        'Field Required'
                                    }
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
                    </CardContent>
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
                open={editProductDialog}
                fullWidth={true}
                onClose={handleEditClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'EDIT ASSETS / ITEMS'}
                </DialogTitle>
                <DialogContent>
                    <br></br>

                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={editNameError}
                                    id="name"
                                    label="Product Name"
                                    placeholder="Product Name"
                                    autoComplete="off"
                                    helperText={
                                        editNameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={editName}
                                    size="small"
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

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl
                                        size="small"
                                        error={editProductTypeNameError}
                                        fullWidth
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Product Type
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={editProductTypeName}
                                            label="Product Type"
                                            onChange={handleEditType}
                                        >
                                            {quantity.map((productType) => {
                                                return (
                                                    <MenuItem
                                                        key={productType._id}
                                                        value={productType._id}
                                                    >
                                                        {productType.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                        <FormHelperText>
                                            {' '}
                                            {editProductTypeNameError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl
                                        size="small"
                                        error={editProductCategoryError}
                                        fullWidth
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Product Category
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={editProductCategory}
                                            label="Product Category"
                                            onChange={handleEditType2}
                                        >
                                            {category.map((productCategory) => {
                                                return (
                                                    <MenuItem
                                                        key={
                                                            productCategory._id
                                                        }
                                                        value={
                                                            productCategory._id
                                                        }
                                                    >
                                                        {productCategory.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                        <FormHelperText>
                                            {editProductCategoryError &&
                                                'Field Required'}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    error={editModelError}
                                    id="name"
                                    label="Model"
                                    placeholder="Model"
                                    autoComplete="off"
                                    helperText={
                                        editModelError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={editModel}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setEditModel,
                                            setEditModelError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl
                                        size="small"
                                        error={editBrandNameError}
                                        fullWidth
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Brand
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={editBrandName}
                                            label="Brand"
                                            onChange={handleEditType3}
                                        >
                                            {brands.map((brand) => {
                                                return (
                                                    <MenuItem
                                                        key={brand._id}
                                                        value={brand._id}
                                                    >
                                                        {brand.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                        <FormHelperText>
                                            {editBrandNameError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid
                                item
                                lg={4}
                                md={4}
                                sm={4}
                                xs={4}
                                style={{ justifyContent: 'center' }}
                            >
                                <Box>
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
                                </Box>
                            </Grid>
                        </Grid>
                        <br></br>

                        <Grid container spacing={3}>
                            <Grid item lg={7} md={7} sm={7} xs={7}>
                                <TextField
                                    disabled
                                    error={modifiedByError}
                                    id="name"
                                    label="Modified By"
                                    placeholder="Modified By"
                                    autoComplete="off"
                                    helperText={
                                        modifiedByError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={modifiedBy}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setModifiedBy,
                                            setModifiedByError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    label="Detail"
                                    placeholder="Detail"
                                    style={{ textAlign: 'left' }}
                                    hinttext="Message Field"
                                    floatinglabeltext="MultiLine and FloatingLabel"
                                    multiline
                                    fullWidth
                                    rows={3}
                                    value={editDescription}
                                    error={editDescriptionError}
                                    helperText={
                                        editDescriptionError && 'Field Required'
                                    }
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
                    </CardContent>
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
        </>
    )
}

// qrcode

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

export default ProductsList
