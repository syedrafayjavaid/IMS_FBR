// material
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'

import Tooltip from '@mui/material/Tooltip'
import { Fab, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import { Paragraph } from 'app/components/Typography'
import { Box, styled, useTheme } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import {
    Switch,
    Grid,
    Card,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
} from '@mui/material'
import ProductTypeCard from 'app/components/productType/ProductTypeCard'
import axios from 'axios'
import config from 'config'
import { ConfirmationDialog } from 'app/components'
import { CSVLink } from 'react-csv'
import SummarizeIcon from '@mui/icons-material/Summarize'
import ReactPaginate from 'react-paginate'
import '../users/user.css'

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
}))

const ProductTable = styled(Table)(() => ({
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

const Small = styled('small')(({ bgcolor }) => ({
    height: 15,
    width: 50,
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '4px',
    overflow: 'hidden',
    background: bgcolor,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}))

const ProductTypeList = () => {
    const [productList, setProductList] = React.useState([])
    const [snackBar, setSnackBar] = React.useState(false)

    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)
    const [mopen, setMopen] = React.useState(false)
    const [category, setCategory] = React.useState('')
    // const [prodectTypeName,setProdectTypeName]=React.useState("");
    const [demo, setDemo] = React.useState(false)
    const [categoryError, setcategoryError] = React.useState(false)
    const [catogoryId, setCatogoryId] = React.useState('')
    const [confirmationDialogOpen, setConfirmationDialogOpen] =
        React.useState(false)

    const [pageNumber, setPageNumber] = React.useState(0)
    const ProductTypesPerPage = 8
    const pagesVisited = pageNumber * ProductTypesPerPage
    const pageCount = Math.ceil(productList.length / ProductTypesPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    useEffect(() => {
        getAlldata()
    }, [])

    const getAlldata = () => {
        axios
            .get(`${config.base_url}/api/v1/productType`)
            .then((res) => {
                setProductList(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const createHandler = () => {
        setSnackBar(false)
        if (catogoryId === '') {
            let data = new FormData()
            data.append('name', category)
            data.append('demo', demo)

            const producst = productList.find((index) => {
                return index.name === category
            })
            if (producst) {
                setSnackBar(true)

                return
            }

            axios
                .post(`${config.base_url}/api/v1/productType`, data)
                .then((res) => {
                    if (res) {
                        handleClose()
                        getAlldata()
                    }
                    setCatogoryId('')
                })
                .catch((error) => {
                    if (
                        error.message === 'Request failed with status code 400'
                    ) {
                        setSnackBar(true)
                    }
                })
        } else {
            let data = new FormData()
            data.append('name', category)

            axios
                .put(
                    `${config.base_url}/api/v1/productType/${catogoryId}`,
                    data
                )
                .then((res) => {
                    if (res) {
                        getAlldata()
                        handleClose()
                    }
                })
                .catch((error) => {
                    if (
                        error.message === 'Request failed with status code 400'
                    ) {
                        setSnackBar(true)
                    }
                })
        }
    }

    const handleClose = () => {
        setCategory('')
        setCatogoryId('')
        setOpen(false)
    }

    const handleOpen = (id) => {
        setOpen(true)
    }

    const handleButton = () => {}
    // snackbar
    const handleMopen = () => {
        setMopen(true)
    }
    const handleClosed = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setMopen(false)
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

    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)

        errorFunc(false)
    }

    const label = { inputProps: { 'aria-label': 'Switch demo' } }

    const Input = styled('input')({
        display: 'none',
    })

    const onDelhandler = (id) => {
        setConfirmationDialogOpen(true)
        setCatogoryId(id)
        if (confirmationDialogOpen && catogoryId) {
            axios
                .delete(`${config.base_url}/api/v1/productType/${catogoryId}`)
                .then((res) => {
                    if (res) {
                        getAlldata()
                        setConfirmationDialogOpen(false)
                    }
                })
                .catch((error) => {})
        }
    }
    const onEdithandler = (editIde, name) => {
        setCategory(name)
        setOpen(true)

        setCatogoryId(editIde)
    }

    const handleOpenClick = () => {
        if (category === '') {
            setcategoryError(true)
        } else {
            createHandler()
        }
    }

    const headers = [
        { label: 'Product Type Name', key: 'name' },
        { label: 'Product Type Id', key: 'productTypeId' },
        { label: 'Demo', key: 'demo' },
        { label: 'Creation Date', key: 'createdAt' },
    ]

    return (
        <>
            {confirmationDialogOpen && (
                <ConfirmationDialog
                    open={confirmationDialogOpen}
                    onConfirmDialogClose={() => {
                        setConfirmationDialogOpen(false)
                    }}
                    title={`Are You Sure?`}
                    text={`Are You Sure You Want To Delete This Product Type?`}
                    onYesClick={onDelhandler}
                />
            )}
            <Typography variant="h4" sx={{ m: 5 }}>
                Product Types
            </Typography>
            <Card elevation={3} sx={{ pt: '20px', mx: 5 }}>
                <Box overflow="auto">
                    <ProductTable>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{ px: 3 }}
                                    align="left"
                                    colSpan={5}
                                >
                                    Name
                                </TableCell>
                                <TableCell
                                    sx={{ px: 0 }}
                                    align="center"
                                    colSpan={3}
                                >
                                    Demo
                                </TableCell>
                                <TableCell
                                    sx={{ px: 0 }}
                                    align="center"
                                    colSpan={2}
                                >
                                    Edit
                                </TableCell>
                                <TableCell
                                    sx={{ px: 0 }}
                                    align="center"
                                    colSpan={2}
                                >
                                    Delete
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productList
                                .slice(
                                    pagesVisited,
                                    pagesVisited + ProductTypesPerPage
                                )
                                .map((product, index) => (
                                    <ProductTypeCard
                                        key={index}
                                        product={product}
                                        onEdit={onEdithandler}
                                        onDelete={onDelhandler}
                                    />
                                ))}
                        </TableBody>
                    </ProductTable>
                </Box>
            </Card>
            <br></br>
            <ReactPaginate
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
                        filename={'all-product-types.csv'}
                        data={productList}
                        headers={headers}
                    >
                        <div style={{ marginTop: '8px' }}>
                            <SummarizeIcon />
                        </div>
                    </CSVLink>
                </Fab>
            </Tooltip>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'ADD PRODUCT LIST'}
                </DialogTitle>
                <DialogContent>
                    <br></br>
                    <Grid container spacing={3}>
                        <Grid item lg={5} md={5} sm={5} xs={5}>
                            <TextField
                                required
                                error={categoryError}
                                id="producttype"
                                label="Product Type Name"
                                placeholder="Type Name"
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
                                        setcategoryError
                                    )
                                }
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item lg={3} md={3} sm={3} xs={3}>
                            <span>Demo</span>
                            <Switch {...label} defaultChecked />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={4}>
                            {/* <label htmlFor="contained-button-file">
                  <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleImage} />
                  <Button variant="contained" component="span" startIcon={<AddAPhotoIcon />}>
                    Upload
                  </Button>
                </label> */}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button autoFocus onClick={handleOpenClick}>
                        Confirm
                    </Button>
                </DialogActions>

                {/* snackbar */}
                {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
                {/* <Snackbar
        open={sopen}
        autoHideDuration={5000}
        onClose={handleClosed}
        message="Note archived"
        action={action}
      /> */}

                <Snackbar
                    open={mopen}
                    autoHideDuration={2000}
                    onClose={handleClosed}
                    message="CREATE PRODUCT"
                    action={action}
                />
                <Snackbar
                    open={snackBar}
                    autoHideDuration={2000}
                    onClose={handleClosed}
                    message="Name already exists"
                    action={action}
                />
            </Dialog>

            <Tooltip title="ADD PRODUCT LIST">
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
                    onClick={() => {
                        setOpen(true)
                        handleMopen()
                    }}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
        </>
    )
}

export default ProductTypeList
