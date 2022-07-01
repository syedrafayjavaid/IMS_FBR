import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import {
    Button,
    Card,
    CardContent,
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
    Select,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box, styled } from '@mui/system'
import { Paragraph } from 'app/components/Typography'
import axios from 'axios'
import config from 'config'
import moment from 'moment'
import QRCode from 'qrcode'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import { BiTransfer } from 'react-icons/bi'

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
    display: 'flex',
}))
const Input = styled('input')({
    display: 'none',
})
const CardHeader = styled('div')(() => ({
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))
const PurchaseItemDetail = () => {
    const { state } = useLocation()

    const userName = localStorage.getItem('username')

    const [showTable, setShowTable] = React.useState(false)
    const [showCard, setShowCard] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [editDialogOpen, setEditDialogOpen] = React.useState(false)
    const [duplicateDialogOpen, setDuplicateDialogOpen] = React.useState(false)
    const [quantity, setQuantity] = React.useState('')
    const [quantityError, setQuantityError] = React.useState(false)
    const [snackBar, setSnackBar] = React.useState(false)

    const [custodianIds, setCustodianIds] = React.useState([])
    const [custodianId, setCustodianId] = React.useState('')
    const [custodianIdError, setCustodianIdError] = React.useState(false)
    const [statusError, setStatusError] = React.useState(false)
    const [ownerShipError, setOwnerShipError] = React.useState(false)
    const [modelError, setModelError] = React.useState(false)
    const [dateOfPurchaseError, setDateOfPurchaseError] = React.useState(false)
    const [officeNameError, setOfficeNameError] = React.useState(false)
    const [UserError, setUserError] = React.useState(false)
    const [purchasedOrderError, setPurchasedOrderError] = React.useState(false)
    const [productIdError, setProductIdError] = React.useState(false)
    // Setting States
    const [productQuantity, setProductQuantity] = React.useState('')
    const [productQuantityError, setProductQuantityError] =
        React.useState(false)
    const [price, setPrice] = React.useState('')
    const [priceError, setPriceError] = React.useState(false)
    const [productId, setproductId] = React.useState('')
    const [purchaseOrder, setPurchaseOrder] = React.useState('')
    const [image, setImage] = React.useState('')

    ///
    //API For the dialogbox
    ///dialog state
    const [model, setModel] = React.useState('')

    // web came code

    const [qrCode, setQrCode] = useState('')
    const [imageUrl1, setImageUrl1] = useState('')
    const classes = useStyles()
    const qrRef = useRef(null)

    ///dialog
    const [statusValue, setStatusValue] = React.useState('')
    const [officeNameList, setOfficeNameList] = React.useState('')
    const [ownerShip, setOwnerShip] = React.useState('')
    const [venderName, setVenderName] = React.useState('')
    const [venderNameError, setVenderNameError] = React.useState(false)
    const [venderEmail, setVenderEmail] = React.useState('N/A')
    const [venderEmailError, setVenderEmailError] = React.useState(false)
    const [venderNumber, setVenderNumber] = React.useState('')
    const [venderNumberError, setVenderNumberError] = React.useState(false)

    const date = new Date().toISOString().split('T')[0]

    const [dataOfPurchase, setDateOfPurchase] = React.useState(date)
    const [user, setUser] = React.useState('')
    const [tagdata, setTagdata] = React.useState('')
    const [tagdataError, setTagdataError] = React.useState(false)
    const [srno, setSrNo] = React.useState('')
    const [srnoError, setSrNoError] = React.useState(false)
    const [product, setProduct] = React.useState()
    const [office, setOffice] = React.useState()

    const [productTransferDetails, setProductTransferDetails] = React.useState()
    const [productData, setProductData] = React.useState()
    const [currentData, setCurrentData] = React.useState()

    const generateQrCode = async () => {
        try {
            const qrProduct = productId === '' ? 'N/A' : productId

            const qrModel = model === '' ? 'N/A' : model

            const qrPrice = price === '' ? 'N/A' : price

            const qrPurchaseOrder = purchaseOrder === '' ? 'N/A' : purchaseOrder

            const qrProductQuantity =
                productQuantity === '' ? 'N/A' : productQuantity

            const qrStatus = statusValue === '' ? 'N/A' : statusValue

            const qrOffice = officeNameList === '' ? 'N/A' : officeNameList

            const qrDateOfPurchase =
                dataOfPurchase === '' ? 'N/A' : dataOfPurchase

            const qrUser = user === '' ? 'N/A' : user

            const qrOwnerShip = ownerShip === '' ? 'N/A' : ownerShip

            const qrVenderName = venderName === '' ? 'N/A' : venderName

            const qrVenderEmail = venderEmail === '' ? 'N/A' : venderEmail

            const qrVenderNumber = venderNumber === '' ? 'N/A' : venderNumber

            const qrTag = tagdata === '' ? 'N/A' : tagdata

            const qrSrNo = srno === '' ? 'N/A' : srno

            const qrCode = `Product Name: ${qrProduct}\nModel: ${qrModel}\nPrice: ${qrPrice}\nPurchase Order: ${qrPurchaseOrder}\nQuantity: ${qrProductQuantity}\nStatus: ${qrStatus}\nOffice: ${qrOffice}\nDate Of Purchase: ${qrDateOfPurchase}\nCustodian Id: ${qrUser}\nOwnership: ${qrOwnerShip}\nVender Name: ${qrVenderName}\nVender Email: ${qrVenderEmail}\nVender Number: ${qrVenderNumber}\nTag: ${qrTag}\nSr No: ${qrSrNo}`

            setQrCode(qrCode)
            const response = await QRCode.toDataURL(qrCode)
            setImageUrl1(response)
        } catch (error) {
            console.log(error)
        }
    }

    // const handleClick = () => {
    //     setSnackBar(true)
    // }

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

    const FlexBox = styled(Box)(() => ({
        display: 'flex',
        alignItems: 'center',
    }))
    const JustifyBox = styled(FlexBox)(() => ({
        justifyContent: 'center',
    }))
    const IMG = styled('img')(() => ({
        width: '100%',
        height: '100%',
    }))
    const ContentBox = styled(JustifyBox)(() => ({
        padding: '32px',
        background: 'rgba(0, 0, 0, 0.01)',
    }))

    const imgeBaseUrl = 'uploads/'

    const handleClose = () => {
        setOpen(false)
    }

    const handleEditClose = () => {
        setEditDialogOpen(false)
    }

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
        let data = new FormData()

        data.append('employId', custodianId)
        // data.append('productId', state.purchaseItem.productId)
        data.append('ItemId', state.purchaseItem._id)
        data.append('quantity', quantity)
        data.append('status', 'valid')
        data.append('createdBy', userName)
        data.append('transferedTo', 'N/A')
        data.append('transferedFrom', 'N/A')
        // data.append('employName')
        // data.append('employName')
        data.append('productTagNo', state.purchaseItem.tagNo)
        data.append('productSrNo', state.purchaseItem.srNo)
        data.append('productName', productData?.name)

        if (quantity > state.purchaseItem.quantity) {
            setSnackBar(true)
            return
        }

        axios
            .post(`${config.base_url}/api/v1/productTransfer`, data)
            .then((res) => {
                if (res) {
                    // handleCreateClose()
                    console.log(res.data.data)
                    getData()
                    setOpen(false)
                }
            })
            .catch((error) => {
                console.log(error, 'error')
                // handleClick()
            })
    }

    useEffect(() => {
        getEmployee()
        getData()
    }, [])

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

    const getData = () => {
        axios
            .get(
                `${config.base_url}/api/v1/products/${state.purchaseItem.productId}`
            )
            .then((res) => {
                setProductData(res.data.data)
                // setProduct1(res.data.data)
                // console.log(product1, 'setProduct1')
            })
            .catch((error) => {
                // console.log(error, 'error');
            })
        axios
            .get(
                `${config.base_url}/api/v1/productTransfer/${state.purchaseItem._id}`
            )
            .then((res) => {
                setProductTransferDetails(res.data.data)
                // setProduct1(res.data.data)
                // console.log(product1, 'setProduct1')
            })
            .catch((error) => {
                // console.log(error, 'error');
            })
    }

    const handlePhoto = (event) => {
        setImage(event.target.files)
    }

    const handleProduct = (event) => {
        setproductId(event.target.value)
    }

    const dateOfPurchase = new Date(state.purchaseItem.dataOfPurchase)
        .toISOString()
        .split('T')[0]

    const PurchaseItemTable = styled(Table)(() => ({
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

    const editHandler = (id) => {
        console.log(id)
    }

    const editfunction = (item) => {
        setCurrentData(item)
        setEditDialogOpen(true)

        setCustodianId(item.employId)

        setQuantity(item.quantity)
    }

    const UpdateRecord = () => {
        let data = {}
        data = currentData
        data.quantity = quantity

        axios
            .put(`${config.base_url}/api/v1/productTransfer/update`, data)
            .then((res) => {
                if (res) {
                    getData()
                    setEditDialogOpen(false)
                    setCustodianId('')
                    setQuantity('')
                    // handleEditDialogClose()
                }
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    return (
        <>
            <Card elevation={3} sx={{ pt: '20px', mb: 10, margin: '50px' }}>
                <CardHeader>
                    <Title>PURCHASED ITEM DETAILS</Title>
                </CardHeader>
                <hr></hr>
                <Grid container>
                    <Grid item lg={5} md={5} sm={12} xs={12}>
                        <ContentBox>
                            <IMG src={state.purchaseItem.QRCodeImage} alt="" />
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
                        <h3>{state.purchase?.purchaseOrder}</h3>
                        <br></br>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Price: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.price}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Quantity: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.quantity}</b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Ownership: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.ownership}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Date Of Purchase: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{date}</b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Model: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.model}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Status: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.status}</b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Vender Name: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.venderName}</b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Purchase Order: </span>
                                <span style={{ color: 'green' }}>
                                    <b>{state.purchaseItem?.purchaseOrder}</b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Vender Email: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.purchaseItem.venderEmail ===
                                        undefined
                                            ? 'N/A'
                                            : state.purchaseItem?.venderEmail}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Vender Contact: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.purchaseItem.venderContact ===
                                        undefined
                                            ? 'N/A'
                                            : state.purchaseItem?.venderContact}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Serial Number: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.purchaseItem.srNo === ''
                                            ? 'N/A'
                                            : state.purchaseItem?.srNo}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Tag Number: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.purchaseItem.tagNo === undefined
                                            ? 'N/A'
                                            : state.purchaseItem?.tagNo}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Created At: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {moment(
                                            state.purchaseItem?.createdAt
                                        ).format('LL')}
                                    </b>
                                </span>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <span>Modified At: </span>
                                <span style={{ color: 'green' }}>
                                    <b>
                                        {state.purchaseItem?.modifiedAt ===
                                        undefined
                                            ? 'N/A'
                                            : moment(
                                                  state.purchaseItem?.modifiedAt
                                              ).format('LL')}
                                    </b>
                                </span>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Box>
                            <h4>Qr Code: </h4>
                            <img src={state.purchaseItem?.QRCodeImage} alt="" />
                        </Box>
                        <Grid container>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Button
                                    variant="contained"
                                    type="button"
                                    onClick={() => {
                                        setOpen(true)
                                    }}
                                >
                                    Allocate Items
                                </Button>
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Button
                                    variant="contained"
                                    type="button"
                                    onClick={() => {
                                        setShowTable(true)
                                    }}
                                >
                                    Track History
                                </Button>
                            </Grid>
                            {state.purchaseItem.quantity === 1 && (
                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                    <Button
                                        variant="contained"
                                        type="button"
                                        onClick={() => {
                                            setDuplicateDialogOpen(true)
                                        }}
                                    >
                                        Duplicate
                                    </Button>
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
                        <PurchaseItemTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 3 }}
                                        colSpan={2}
                                    >
                                        Employee Id
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 3 }}
                                        colSpan={2}
                                    >
                                        Employee Name
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 3 }}
                                        colSpan={2}
                                    >
                                        Allocation Date
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
                                        Transferred From
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ px: 3 }}
                                        colSpan={2}
                                    >
                                        Edit
                                    </TableCell>
                                    {/* <TableCell
                                        align="center"
                                        sx={{ px: 3 }}
                                        colSpan={2}
                                    >
                                        Transfer
                                    </TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productTransferDetails &&
                                    productTransferDetails.map(
                                        (productTransfer) => (
                                            <TableRow
                                                key={productTransfer._id}
                                                hover
                                            >
                                                <TableCell
                                                    align="center"
                                                    colSpan={2}
                                                >
                                                    <Paragraph>
                                                        {
                                                            productTransfer.employID
                                                        }
                                                    </Paragraph>
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
                                                    {productTransfer.employName}
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
                                                    {date}
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
                                                    {productTransfer.quantity}
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
                                                        productTransfer.transferedFrom
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
                                                    <Button
                                                        onClick={() => {
                                                            editfunction(
                                                                productTransfer
                                                            )
                                                        }}
                                                    >
                                                        <EditIcon />
                                                    </Button>
                                                </TableCell>

                                                {/* <TableCell
                                                    sx={{ px: 0 }}
                                                    align="center"
                                                    colSpan={2}
                                                >
                                                    <Button onClick={() => {}}>
                                                        <BiTransfer size={22} />
                                                    </Button>
                                                </TableCell> */}
                                            </TableRow>
                                        )
                                    )}
                            </TableBody>
                        </PurchaseItemTable>
                    </Box>
                </Card>
            )}
            {/* {showCard && (
                <Card elevation={3} sx={{ p: '20px', mb: 10, margin: '50px' }}>
                    <Box sx={{ maxWidth: 400 }}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel>{step.label}</StepLabel>
                                    <StepContent>
                                        <Typography>
                                            {step.description}
                                        </Typography>
                                        <Box sx={{ mb: 2 }}>
                                            <div>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleNext}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    {index === steps.length - 1
                                                        ? 'Finish'
                                                        : 'Continue'}
                                                </Button>
                                                <Button
                                                    disabled={index === 0}
                                                    onClick={handleBack}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    Back
                                                </Button>
                                            </div>
                                        </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} sx={{ p: 3 }}>
                                <Typography>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Button
                                    onClick={handleReset}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Reset
                                </Button>
                            </Paper>
                        )}
                    </Box>
                </Card>
            )} */}

            <Dialog
                open={open}
                fullWidth={true}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'ALLOCATE ITEMS'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={4}>
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
                                        Employee Id / Name
                                    </InputLabel>
                                    <Select
                                        size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={custodianId}
                                        label="Custodian Id"
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
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button autoFocus onClick={handleClickOpen}>
                        Confirm
                    </Button>
                </DialogActions>
                <Snackbar
                    open={snackBar}
                    autoHideDuration={6000}
                    onClose={handleSnackBarClose}
                    message={`Quantity Must Be Smaller Than ${state.purchaseItem.quantity}`}
                    action={action}
                />
            </Dialog>
            <Dialog
                open={editDialogOpen}
                fullWidth={true}
                onClose={handleEditClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'EDIT ALLOCATE ITEMS'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={4}>
                        {/* <Grid
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
                                        Employee Id / Name
                                    </InputLabel>
                                    <Select
                                        size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={custodianId}
                                        label="Custodian Id"
                                        onChange={(event) =>
                                            setCustodianId(event.target.value)
                                        }
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
                        </Grid> */}
                        <Grid
                            item
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
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
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button autoFocus onClick={UpdateRecord}>
                        Confirm
                    </Button>
                </DialogActions>
                <Snackbar
                    open={snackBar}
                    autoHideDuration={6000}
                    onClose={handleSnackBarClose}
                    message="Quantity Must Be Smaller Than 60"
                    action={action}
                />
            </Dialog>

            <Dialog
                open={duplicateDialogOpen}
                fullWidth={true}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'ADD PURCHASE ITEMS'}
                </DialogTitle>
                <DialogContent>
                    <br></br>

                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        error={productIdError}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Product
                                        </InputLabel>
                                        <Select
                                            disabled
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={state.purchaseItem.productId}
                                            label="Product Category"
                                            onChange={handleProduct}
                                        >
                                            <MenuItem value={product?._id}>
                                                {product?.name}
                                            </MenuItem>
                                        </Select>

                                        <FormHelperText>
                                            {' '}
                                            {productIdError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    disabled
                                    error={modelError}
                                    id="name"
                                    label="Model"
                                    placeholder="Model"
                                    autoComplete="off"
                                    helperText={
                                        modelError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={state.purchaseItem.model}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(e, setModel, setModelError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    disabled
                                    error={priceError}
                                    type={`number`}
                                    id="name"
                                    label="Price"
                                    placeholder="Price"
                                    autoComplete="off"
                                    helperText={
                                        priceError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={state.purchaseItem.price}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(e, setPrice, setPriceError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    disabled
                                    error={purchasedOrderError}
                                    id="name"
                                    label="Purchase Order(PO)"
                                    placeholder="Purchase Order(PO)"
                                    autoComplete="off"
                                    helperText={
                                        purchasedOrderError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={state.purchaseItem.purchaseOrder}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setPurchaseOrder,
                                            setPurchasedOrderError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    disabled
                                    error={productQuantityError}
                                    id="name"
                                    label="Product Quantity"
                                    placeholder="Product Quantity"
                                    autoComplete="off"
                                    helperText={
                                        productQuantityError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={state.purchaseItem.quantity}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setProductQuantity,
                                            setProductQuantityError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <Grid
                                item
                                lg={4}
                                md={4}
                                sm={4}
                                xs={6}
                                style={{
                                    justifyContent: 'center',
                                    marginLeft: '0px',
                                }}
                            >
                                <Box>
                                    {/* <span>Active</span>
                <Switch {...label} defaultChecked />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}

                                    <label htmlFor="contained-button-file">
                                        <Input
                                            accept="image/*"
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={handlePhoto}
                                        />
                                        <Button
                                            disabled
                                            variant="contained"
                                            component="span"
                                            startIcon={<AddAPhotoIcon />}
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            Upload
                                        </Button>
                                    </label>
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        error={statusError}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Status
                                        </InputLabel>
                                        <Select
                                            disabled
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={state.purchaseItem.status}
                                            label="Status"
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    setStatusValue,
                                                    setStatusError
                                                )
                                            }
                                        >
                                            <MenuItem value={`inuse`}>
                                                Inuse
                                            </MenuItem>
                                            <MenuItem value={`replacement`}>
                                                Replacement
                                            </MenuItem>
                                            <MenuItem value={`scrap`}>
                                                Scrap
                                            </MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            {' '}
                                            {statusError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        error={officeNameError}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Office
                                        </InputLabel>
                                        <Select
                                            disabled
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={state.purchaseItem.officeId}
                                            label="Office"
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    setOfficeNameList,
                                                    setOfficeNameError
                                                )
                                            }
                                        >
                                            <MenuItem value={office?._id}>
                                                {office?.name}
                                            </MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            {' '}
                                            {officeNameError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <form
                                    // className={myclass.container}
                                    noValidate
                                >
                                    <TextField
                                        disabled
                                        id="date"
                                        size="small"
                                        label="Date Of Purchase"
                                        type="date"
                                        value={dateOfPurchase}
                                        defaultValue="2017-05-24"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={dateOfPurchaseError}
                                        helperText={
                                            dateOfPurchaseError === true
                                                ? 'Field Required'
                                                : ''
                                        }
                                        onChange={(e) =>
                                            handleChange(
                                                e,
                                                setDateOfPurchase,
                                                setDateOfPurchaseError
                                            )
                                        }
                                    />
                                </form>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        error={UserError}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Custodian Id
                                        </InputLabel>
                                        <Select
                                            disabled
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={state.purchaseItem.custodian}
                                            label="Custodian Id / Name"
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    setUser,
                                                    setUserError
                                                )
                                            }
                                        >
                                            {custodianIds.map((employee) => {
                                                // setEmployeeId(
                                                //     employee.employeeId
                                                // )
                                                return (
                                                    <MenuItem
                                                        key={employee._id}
                                                        value={employee._id}
                                                    >
                                                        {employee.employeeId}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                        <FormHelperText>
                                            {' '}
                                            {UserError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Box sx={{ minWidth: 145 }}>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        error={ownerShipError}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            OwnerShip
                                        </InputLabel>
                                        <Select
                                            disabled
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={state.purchaseItem.ownership}
                                            label="OwnerShip"
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    setOwnerShip,
                                                    setOwnerShipError
                                                )
                                            }
                                        >
                                            <MenuItem value={`PRAL`}>
                                                PRAL
                                            </MenuItem>
                                            <MenuItem value={`FBR`}>
                                                FBR
                                            </MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            {' '}
                                            {ownerShipError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    disabled
                                    error={venderNameError}
                                    id="name"
                                    label="Vendor Name"
                                    placeholder="Enter Vendor Name"
                                    autoComplete="off"
                                    helperText={
                                        venderNameError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={state.purchaseItem.venderName}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setVenderName,
                                            setVenderNameError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>

                            <br></br>

                            {/* this is the qr code of the PRAL */}

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    disabled
                                    error={venderEmailError}
                                    id="name"
                                    label="Vendor Email"
                                    placeholder="Enter Vendor Email"
                                    autoComplete="off"
                                    helperText={
                                        venderEmailError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={state.purchaseItem.venderEmail}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setVenderEmail,
                                            setVenderEmailError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    disabled
                                    error={venderNumberError}
                                    id="name"
                                    label="Vendor Number"
                                    placeholder="Enter Vendor Number"
                                    autoComplete="off"
                                    helperText={
                                        venderNumberError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={state.purchaseItem.venderContact}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setVenderNumber,
                                            setVenderNumberError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    error={tagdataError}
                                    id="name"
                                    label="Tag"
                                    placeholder="Tag"
                                    autoComplete="off"
                                    helperText={
                                        tagdataError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={state.purchaseItem.tagNo}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            setTagdata,
                                            setTagdataError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField
                                    error={srnoError}
                                    id="name"
                                    label="Serial Number"
                                    placeholder="Enter Serial Number"
                                    autoComplete="off"
                                    helperText={
                                        srnoError === true
                                            ? 'Field Required'
                                            : ''
                                    }
                                    value={state.purchaseItem.srNo}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(e, setSrNo, setSrNoError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={4}></Grid>
                        <Grid container spacing={2}>
                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                {/* <TextField
                                            label="Enter Text Here"
                                            onChange={(e) =>
                                                setText1(e.target.value)
                                            }
                                            style={{ marginLeft: '24px' }}
                                        /> */}
                                <Button
                                    className={classes.btn}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => generateQrCode()}
                                    style={{ marginLeft: '24px' }}
                                >
                                    Generate
                                </Button>
                                <br></br>
                                {state.purchaseItem.QRCodeImage ? (
                                    <a
                                        href={state.purchaseItem.QRCodeImage}
                                        download
                                    >
                                        <img
                                            src={state.purchaseItem.QRCodeImage}
                                            alt="img"
                                            style={{
                                                marginLeft: '24px',
                                            }}
                                        />
                                    </a>
                                ) : null}
                            </Grid>
                        </Grid>
                    </CardContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDuplicateDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        autoFocus
                        onClick={() => {
                            console.log('Button Clicked')
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
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

export default PurchaseItemDetail
