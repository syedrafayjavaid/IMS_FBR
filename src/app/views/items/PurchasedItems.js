import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault'
import { useTheme } from '@mui/material/styles'
import * as React from 'react'

import Box from '@mui/material/Box'


import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import {
    Container, Fab, FormHelperText, Grid, Typography
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import QRCode from 'qrcode'

import { CardContent } from '@mui/material'
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
import config from 'config'
import moment from 'moment'
import PurchaseItemCard from './PurchaseItemCard'

/////

const dateStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}))

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

function valuetext(value) {
    return `${value}°C`
}
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
]
//brand
function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
}
const brands = [' Hansen', ' Henry', 'Tucker', 'Hubbard']

function getBrand(brand, brandName, themes) {
    return {
        fontWeight:
            brandName.indexOf(brand) === -1
                ? themes.typography.fontWeightRegular
                : themes.typography.fontWeightMedium,
    }
}

//status
const status = [' Hansen', ' Henry', 'Tucker', 'Hubbard']

function getStatu(statu, statuName, themestatus) {
    return {
        fontWeight:
            statuName.indexOf(statu) === -1
                ? themestatus.typography.fontWeightRegular
                : themestatus.typography.fontWeightMedium,
    }
}
//
const offices = [' Hansen', ' Henry', 'Tucker', 'Hubbard']
function getoffice(office, officeName, themesoffice) {
    return {
        fontWeight:
            officeName.indexOf(office) === -1
                ? themesoffice.typography.fontWeightRegular
                : themesoffice.typography.fontWeightMedium,
    }
}

const PurchasedItems = () => {
    const theme = useTheme()
    const themes = useTheme()
    const themestatu = useTheme()
    const themesoffice = useTheme()
    const [personName, setPersonName] = React.useState([])
    const [brandName, setBrandName] = React.useState([])
    const [statuName, setStatuName] = React.useState([])
    const [value, setValue] = React.useState([20, 37])
    const [officeName, setOfficeName] = React.useState([])

    const [imageUrl, setImageUrl] = React.useState('')
    const [text, setText] = React.useState('')

    const [editmodifyOnError, seteditModifyOnError] = React.useState(false)
    // Form validation errors State Setting
    const [priceError, setPriceError] = React.useState(false)
    const [productQuantityError, setProductQuantityError] =
        React.useState(false)
    const [statusError, setStatusError] = React.useState(false)
    const [officeError, setOfficeError] = React.useState(false)
    const [createdByError, setCreatedByError] = React.useState(false)
    const [createdAtError, setCreatedAtError] = React.useState(false)
    const [modifyByError, setModifyByError] = React.useState(false)
    const [modifyOnError, setModifyOnError] = React.useState(false)
    const [ownerShipError, setOwnerShipError] = React.useState(false)
    const [venderError, setVenderError] = React.useState(false)
    const [imageError, setImageError] = React.useState(false)
    const [modelError, setModelError] = React.useState(false)
    const [dateOfPurchaseError, setDateOfPurchaseError] = React.useState(false)
    const [custodienIdError, setCustodienIdError] = React.useState(false)
    const [purchasedError, setPurchasedError] = React.useState(false)
    const [officeNameError, setOfficeNameError] = React.useState(false)
    const [imageUrl1Error, setImageUrl1Error] = React.useState(false)
    const [UserError, setUserError] = React.useState(false)
    const [purchasedOrderError, setPurchasedOrderError] = React.useState(false)
    const [text1Error, setText1Error] = React.useState(false)
    const [productIdError, setProductIdError] = React.useState(false)
    // Setting States
    const [name, setName] = React.useState('')
    const [quantity, setQuantity] = React.useState([])
    const [productQuantity, setProductQuantity] = React.useState('')
    const [pcost, setPcost] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [productId, setproductId] = React.useState('')
    const [product, setProduct] = React.useState([])
    const [subCategory, setSubCategory] = React.useState('')
    const [color, setColor] = React.useState('')
    const [brand, setBrand] = React.useState('')
    const [purchaseOrder, setPurchaseOrder] = React.useState('')
    const [image, setImage] = React.useState('')
    const [QRCodeImage, setQRCodeImage] = React.useState('')
    const [categoryData, setCategoryData] = React.useState({})
    const [subcategoryData, setSubcategoryData] = React.useState({})
    const [product1, setProduct1] = React.useState([])
    const myclass = dateStyles()

    ///
    //API For the dialogbox
    const [purchaseBy, setPurchaseBy] = React.useState([])
    const [PurchaseBy1, setPurchaseBy1] = React.useState('')
    ///dialog state
    const [model, setModel] = React.useState('')

    // web came code

    const [qrCode, setQrCode] = useState('')
    const [imageUrl1, setImageUrl1] = useState('')
    const [scanResultFile, setScanResultFile] = useState('')
    const [scanResultWebCam, setScanResultWebCam] = useState('')
    const classes = useStyles()
    const qrRef = useRef(null)

    ///dialog
    const [statusDialog, setStatusDialog] = React.useState([])
    const [statusValue, setStatusValue] = React.useState('')
    const [officeDialog, setOfficeDialog] = React.useState([])
    const [officeNameList, setOfficeNameList] = React.useState('')
    const [purchasedDialog, setPurchasedDialog] = React.useState([])
    const [customerDialog, setCustomerDialog] = React.useState([])
    const [custodienId, setCustodienId] = React.useState([])
    const [createdBy, setCreatedBy] = React.useState('')
    const [createdAt, setCreatedAt] = React.useState('')
    const [modifyByDialog, setModifyByDialog] = React.useState([])
    const [modifyOnDialog, setModifyOnDialog] = React.useState([])
    const [purchasedItems, setPurchasedItems] = React.useState([])
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
    const [purchaseId, setPurchaseId] = React.useState('')
    const [handleEditDialog, setHandleEditDialog] = React.useState(false)
    ///search items
    const [searchItemsDialog, setSearchItemsDialog] = React.useState(false)
    const [vender, setVender] = React.useState('')
    const [custodienIdName, setCustodienIdName] = React.useState([])
    const [productName, setProductName] = React.useState([])
    const [tagsearch, setTagSearch] = React.useState('')
    const [srnosearch, setSrnoSearch] = React.useState('')
    const [allseachdata, setAllsearchdata] = React.useState([])
    const [tagdata, setTagdata] = React.useState('')
    const [tagdataError, setTagdataError] = React.useState(false)
    const [srno, setSrNo] = React.useState('')
    const [srnoError, setSrNoError] = React.useState(false)

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
    const handleErrorFile = (error) => {
        console.log(error)
    }
    const handleScanFile = (result) => {
        if (result) {
            setScanResultFile(result)
        }
    }
    const onScanFile = () => {
        qrRef.current.openImageDialog()
    }
    const handleErrorWebCam = (error) => {
        console.log(error)
    }
    const handleScanWebCam = (result) => {
        if (result) {
            setScanResultWebCam(result)
        }
    }

    const label = { inputProps: { 'aria-label': 'Switch demo' } }
    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)
        console.log(e.target.name, e.target.value)
        errorFunc(false)
    }

    // const handleModel = (e, func, errorFunc) => {
    //   func(e.target.value);
    //   console.log(e.target.model, e.target.value)
    //   errorFunc(false)
    // }

    const handleType = (event) => {
        console.log(quantity, 'event')
        setQuantity(event.target.value)
    }

    const handleProduct = (event) => {
        console.log(event.target, 'rula')
        setproductId(event.target.value)
    }
    const handleProductName = (event) => {
        console.log(event.target, 'rula')
        setProductName(event.target.value)
    }
    const handleModel = (event) => {
        console.log(event.target.value, 'rula')
        setModel(event.target.value)
    }
    const handleVender = (event) => {
        setVender(event.target.value)
    }
    const handlePrice = (event) => {
        console.log(event.target.value, 'rula')
        setPrice(event.target.value)
    }

    const handleStatusDialog = (event) => {
        console.log(event.target.value, 'rula')
        setStatusValue(event.target.value)
    }

    const handleOfficeDialog = (event) => {
        console.log(event.target.value, 'rula')
        setOfficeNameList(event.target.value)
    }

    const handlePurchasedDialog = (event) => {
        console.log(event.target.value, 'rula')
        setPurchaseBy1(event.target.value)
    }

    const handleCustomerDialog = (event) => {
        setUser(event.target.value)
    }
    const handleCustodianId = (event) => {
        setCustodienId(event.target.value)
    }

    const handleCreatedByDialog = (event) => {
        console.log(event.target.value, 'CreatedBy')
        setCreatedBy(event.target.value)
    }
    const handleCreatedOnDialog = (event) => {
        console.log(event.target.value, 'CreatedAt')
        setCreatedAt(event.target.value)
    }
    const handleModifyByDialog = (event) => {
        console.log(event.target, 'rula')
        setModifyByDialog(event.target.value)
    }
    const handleModifyOnDialog = (event) => {
        console.log(event.target, 'rula')
        setModifyOnDialog(event.target.value)
    }
    const handleOwenerShipeDialog = (event) => {
        console.log(event.target.value, 'owenerShip')
        setOwnerShip(event.target.value)
    }

    const handlePurchasedDate = (event) => {
        console.log(event.target.value, 'vender text value')
        setDateOfPurchase(event.target.value)
    }
    //   const attachment = (e) => {
    //     attachment(e.target.files)
    //     console.log(e.target.files[0], 'image upload')
    // }

    const handlePhoto = (event) => {
        console.log(event.target.files, 'handle the photo')
        setImage(event.target.files)
    }
    const [open, setOpen] = React.useState(false)

    const handleClose = () => {
        setOpen(false)
    }
    const handleCloseClick = () => {
        setSearchItemsDialog(false)
    }
    const handleEditDialogClose = () => {
        setHandleEditDialog(false)
    }

    const handleSearchDialogClose = () => {
        setSearchItemsDialog(false)
    }
    //  const handleOpen = (id) => {
    //   console.log(id,'id');
    //   setOpen(true);
    // };
    // const handleClickOpen2 = () => {
    //   setOpen(true);
    // };

    //   const handleImage=(e)=>{
    //     setImage(e.target.files[0])
    //     console.log(e.target.files[0],'e.target.files[0]');
    //   }

    useEffect(() => {
        getAlldata()
    }, [])
    const getAlldata = () => {
        axios
            .get(`${config.base_url}/api/v1/products`)
            .then((res) => {
                // console.log(res.data.data);

                setProduct1(res.data.data)
                console.log(product1, 'setProduct1')
            })
            .catch((error) => {
                // console.log(error, 'error');
            })

        //product name fetch from the api

        axios
            .get(`${config.base_url}/api/v1/productType`)
            .then((res) => {
                setProduct(res.data.data)
            })
            .catch((error) => {})
        axios
            .get(`${config.base_url}/api/v1/office`)
            .then((res) => {
                console.log(res.data.data)
                setOfficeDialog(res.data.data)
                console.log(model, 'model___model')
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        axios
            .get(`${config.base_url}/api/v1/auth/allUsers`)
            .then((res) => {
                console.log(res.data.data)
                setCustodienId(res.data.data)

                console.log(res.data.data, 'res.data.data customer data')
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        //customker by name

        axios
            .get(`${config.base_url}/api/v1/employee`)
            .then((res) => {
                const data = res.data.data
                const canPurchase = []
                var purcahedTrue = data.map((item) => {
                    if (item.purchase == true) {
                        canPurchase.push(item)
                    }
                })
                setPurchaseBy(canPurchase)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        axios
            .get(`${config.base_url}/api/v1/purchaseProduct`)
            .then((res) => {
                console.log(res.data.data)
                setPurchasedItems(res.data.data)
                //  console.log(purchaseBy, 'Purchase of the data');
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    ///this is the  api of the text fileds data send to the next data
    const createHandler = () => {
        let data = new FormData()

        data.append('productId', productId)
        data.append('price', price)
        data.append('dataOfPurchase', dataOfPurchase)
        data.append('ownership', ownerShip)
        data.append('officeId', officeNameList)
        data.append('status', statusValue)
        data.append('venderName', venderName)
        data.append('venderEmail', venderEmail)
        data.append('venderNumber', venderNumber)
        data.append('attachment', image)
        data.append('QRCodeImage', imageUrl1)
        data.append('custodian', user)
        data.append('model', model)
        data.append('purchaseOrder', purchaseOrder)
        data.append('quantity', productQuantity)
        data.append('QRCode', qrCode)

        // console.log(scanResultFile);

        axios
            .post(`${config.base_url}/api/v1/purchaseProduct`, data)
            .then((res) => {
                console.log(res.data.data, 'purchaseProduct ')
                if (res) {
                    // handleCreateClose()
                    getAlldata()
                    setOpen(false)
                }
                setStatusValue('')
                setproductId('')
                setPrice('')
                setDateOfPurchase('')
                setOwnerShip('')
                setOfficeNameList('')
                setPurchaseBy1('')
                data.append('venderName', venderName)
                data.append('venderEmail', venderEmail)
                data.append('venderNumber', venderNumber)
                setImage('')
                setImageUrl1('')
                setUser('')
                setModel('')
                setQrCode('')
                setProductQuantity('')
                setPurchaseOrder('')
            })
            .catch((error) => {
                console.log(error, 'error')
                // handleClick()
            })
    }

    //////
    //error handling
    const handleCreateClickOpen = () => {
        if (
            price === '' ||
            dataOfPurchase === '' ||
            officeNameList === '' ||
            ownerShip === '' ||
            statusValue === '' ||
            user === '' ||
            model === '' ||
            purchaseOrder === '' ||
            productQuantity === '' ||
            productId === '' ||
            venderName === '' ||
            venderNumber === '' ||
            tagdata === '' ||
            srno === ''
        ) {
            if (price === '') {
                setPriceError(true)
            }

            if (dataOfPurchase === '') {
                setDateOfPurchaseError(true)
            }
            if (ownerShip === '') {
                setOwnerShipError(true)
            }
            if (officeNameList === '') {
                setOfficeNameError(true)
            }
            if (statusValue === '') {
                setStatusError(true)
            }
            if (user === '') {
                setUserError(true)
            }
            if (model === '') {
                setModelError(true)
            }
            if (purchaseOrder === '') {
                setPurchasedOrderError(true)
            }
            if (productQuantity === '') {
                setProductQuantityError(true)
            }
            if (venderName === '') {
                setVenderNameError(true)
            }
            if (venderNumber === '') {
                setVenderNumberError(true)
            }
            if (productId === '') {
                setProductIdError(true)
            }
            if (tagdata === '') {
                setTagdataError(true)
            }
            if (srno === '') {
                setSrNoError(true)
            }
        } else {
            createHandler()
        }
    }

    const handleEdit = () => {
        if (
            price === '' ||
            dataOfPurchase === '' ||
            officeNameList === '' ||
            ownerShip === '' ||
            statusValue === '' ||
            user === '' ||
            model === '' ||
            purchaseOrder === '' ||
            productQuantity === '' ||
            productId === '' ||
            venderName === '' ||
            venderNumber === '' ||
            tagdata === '' ||
            srno === ''
        ) {
            if (price === '') {
                setPriceError(true)
            }

            if (dataOfPurchase === '') {
                setDateOfPurchaseError(true)
            }
            if (ownerShip === '') {
                setOwnerShipError(true)
            }
            if (officeNameList === '') {
                setOfficeNameError(true)
            }
            if (statusValue === '') {
                setStatusError(true)
            }
            if (user === '') {
                setUserError(true)
            }
            if (model === '') {
                setModelError(true)
            }
            if (purchaseOrder === '') {
                setPurchasedOrderError(true)
            }
            if (productQuantity === '') {
                setProductQuantityError(true)
            }
            if (venderName === '') {
                setVenderNameError(true)
            }
            if (venderNumber === '') {
                setVenderNumberError(true)
            }
            if (productId === '') {
                setProductIdError(true)
            }
            if (tagdata === '') {
                setTagdataError(true)
            }
            if (srno === '') {
                setSrNoError(true)
            }
        } else {
            editHandler()
        }
    }

    const onDelhandler = (editData) => {
        console.log(editData, 'id')
        axios
            .delete(`${config.base_url}/api/v1/purchaseProduct/${editData}`)
            .then((res) => {
                console.log(res.msg)
                getAlldata()
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const onEdithandler = (id, purchaseItem) => {
        setPurchaseId(id)

        setHandleEditDialog(true)

        setStatusValue(purchaseItem.status)

        setproductId(purchaseItem.productId)
        setPrice(purchaseItem.price)
        const date = new Date(purchaseItem.dataOfPurchase)
            .toISOString()
            .split('T')[0]
        setDateOfPurchase(date)
        setOwnerShip(purchaseItem.ownership)
        setOfficeNameList(purchaseItem.officeId)
        setPurchaseBy1(purchaseItem.purchasedBy)
        setVenderName(purchaseItem.venderName)
        setVenderEmail(purchaseItem.venderEmail)
        setVenderNumber(purchaseItem.venderContact)
        setImage(purchaseItem.image)
        setImageUrl1(purchaseItem.QRCodeImage)
        setUser(purchaseItem.custodian)
        setModel(purchaseItem.model)
        setPurchaseOrder(purchaseItem.purchaseOrder)
        setProductQuantity(purchaseItem.quantity)
        setTagdata(purchaseItem.tagData)
        setSrNo(purchaseItem.srNo)
        setQrCode(purchaseItem.QRCode)
        setCreatedBy(purchaseItem.createdBy)
        setCreatedAt(purchaseItem.createdAt)
        setModifyByDialog(purchaseItem.modifiedBy)
        setModifyOnDialog(purchaseItem.modifiedAt)
    }

    const navigate = useNavigate()

    //card set
    ////
    const handleBox = (event, newValue) => {
        setValue(newValue)
    }

    const handleChan = (event) => {
        const {
            target: { value },
        } = event
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        )
    }

    const handleBrand = (event) => {
        const {
            target: { value },
        } = event
        setBrandName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        )
    }

    const handleStatus = (event) => {
        const {
            target: { value },
        } = event
        setStatuName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        )
    }

    ///office

    const offceChange = (event) => {
        const {
            target: { value },
        } = event
        setOfficeName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        )
    }

    const editHandler = () => {
        let data = new FormData()
        data.append('productId', productId)
        data.append('price', price)
        data.append('dataOfPurchase', dataOfPurchase)
        data.append('ownership', ownerShip)
        data.append('officeId', officeNameList)
        data.append('status', statusValue)
        data.append('venderName', venderName)
        data.append('venderEmail', venderEmail)
        data.append('venderNumber', venderNumber)
        data.append('attachment', image)
        data.append('QRCodeImage', imageUrl1)
        data.append('custodian', user)
        data.append('purchaseOrder', purchaseOrder)
        data.append('model', model)
        data.append('quantity', productQuantity)
        data.append('QRCode', qrCode)
        data.append('tagData', tagdata)
        data.append('srNo', srno)
        data.append('createdBy', createdBy)
        data.append('createdAt', createdAt)
        data.append('modifiedBy', modifyByDialog)
        data.append('modifiedAt', modifyOnDialog)

        axios
            .put(
                `${config.base_url}/api/v1/purchaseProduct/${purchaseId}`,
                data
            )
            .then((res) => {
                console.log(res.msg)
                if (res) {
                    getAlldata()
                    handleEditDialogClose()
                }
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }
    const marks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 500,
            label: '500',
        },
        {
            value: 1000,
            label: '1000',
        },
    ]

    ///this the API OF THE Search filter
    useEffect(() => {
        getSearchdata()
    }, [])
    const getSearchdata = () => {
        axios
            .get(`${config.base_url} `)
            .then((res) => {
                // console.log(res.data.data);

                setAllsearchdata(res.data.data)
                console.log(allseachdata, 'setAllsearchdata')
            })
            .catch((error) => {
                // console.log(error, 'error');
            })
    }

    return (
        <>
            {purchasedItems.length === 0 && (
                <div>
                    <frames
                        style={{
                            textAlign: 'center',
                            margin: 'auto',
                            marginTop: '400px',
                        }}
                    >
                        {' '}
                        <h1>
                            <h3>
                                BACKEND DATA IS NOT CONNECTED{' '}
                                <DisabledByDefaultIcon />
                            </h3>
                        </h1>
                    </frames>
                </div>
            )}
            {purchasedItems.length > 0 && (
                <div>
                    <Tooltip title="Search Items">
                        <Fab
                            color="primary"
                            aria-label="Add"
                            size="medium"
                            style={{
                                zIndex: 999,
                                right: '4vw',
                                top: '13vh',
                                position: 'fixed',
                            }}
                            onClick={() => setSearchItemsDialog(true)}
                        >
                            <SearchIcon />
                        </Fab>
                    </Tooltip>

                    <Tooltip title="Add Items">
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
                            onClick={() => setOpen(true)}
                        >
                            <AddIcon />
                        </Fab>
                    </Tooltip>

                    <Container>
                        <br></br>
                        <Typography variant="h4" sx={{ mb: 5 }}>
                            PURCHASE ITEMS
                        </Typography>
                        <Grid container spacing={3}>
                            {/* <ProductTypeCard/>
          <ProductCard/> */}
                            {purchasedItems.map((purchaseItem) => (
                                <Grid
                                    key={purchaseItem._id}
                                    item
                                    xs={12}
                                    sm={6}
                                    md={3}
                                >
                                    <PurchaseItemCard
                                        purchaseItem={purchaseItem}
                                        onDelete={onDelhandler}
                                        onEdit={onEdithandler}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <br></br>
                        <br></br>
                        <br></br>
                    </Container>

                    {/* this the data fetch on the purchase items on the dialogbox data */}

                    <Dialog
                        open={open}
                        fullWidth={true}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {'PURCHASE ITEMS'}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
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
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={productId}
                                                        label="Product Category"
                                                        onChange={handleProduct}
                                                    >
                                                        {product1.map(
                                                            (productList) => {
                                                                return (
                                                                    <MenuItem
                                                                        value={
                                                                            productList._id
                                                                        }
                                                                    >
                                                                        {
                                                                            productList.name
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        )}
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
                                                value={model}
                                                size="small"
                                                onChange={(e) =>
                                                    handleModel(
                                                        e,
                                                        setModel,
                                                        setModelError
                                                    )
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>

                                        <Grid item lg={4} md={4} sm={4} xs={6}>
                                            <TextField
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
                                                value={price}
                                                size="small"
                                                onChange={(e) =>
                                                    handlePrice(
                                                        e,
                                                        setPrice,
                                                        setPriceError
                                                    )
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
                                                value={purchaseOrder}
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
                                                error={productQuantityError}
                                                id="name"
                                                label="Product Quantity"
                                                placeholder="Product Quantity"
                                                autoComplete="off"
                                                helperText={
                                                    productQuantityError ===
                                                    true
                                                        ? 'Field Required'
                                                        : ''
                                                }
                                                value={productQuantity}
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
                                                        variant="contained"
                                                        component="span"
                                                        startIcon={
                                                            <AddAPhotoIcon />
                                                        }
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
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={statusValue}
                                                        label="Status"
                                                        onChange={
                                                            handleStatusDialog
                                                        }
                                                    >
                                                        <MenuItem
                                                            value={`inuse`}
                                                        >
                                                            Inuse
                                                        </MenuItem>
                                                        <MenuItem
                                                            value={`replacement`}
                                                        >
                                                            Replacement
                                                        </MenuItem>
                                                        <MenuItem
                                                            value={`scrap`}
                                                        >
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
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={officeNameList}
                                                        label="Office"
                                                        onChange={
                                                            handleOfficeDialog
                                                        }
                                                    >
                                                        {officeDialog.map(
                                                            (officeList) => {
                                                                return (
                                                                    <MenuItem
                                                                        value={
                                                                            officeList._id
                                                                        }
                                                                    >
                                                                        {
                                                                            officeList.name
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        )}
                                                    </Select>
                                                    <FormHelperText>
                                                        {' '}
                                                        {officeNameError ===
                                                        true
                                                            ? 'Field Required'
                                                            : ''}
                                                    </FormHelperText>
                                                </FormControl>
                                            </Box>
                                        </Grid>

                                        <Grid item lg={4} md={4} sm={4} xs={4}>
                                            <form
                                                className={myclass.container}
                                                noValidate
                                            >
                                                <TextField
                                                    id="date"
                                                    size="small"
                                                    label="Date Of Purchase"
                                                    type="date"
                                                    value={dataOfPurchase}
                                                    defaultValue="2017-05-24"
                                                    className={
                                                        myclass.textField
                                                    }
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    error={dateOfPurchaseError}
                                                    helperText={
                                                        dateOfPurchaseError ===
                                                        true
                                                            ? 'Field Required'
                                                            : ''
                                                    }
                                                    onChange={
                                                        handlePurchasedDate
                                                    }
                                                />
                                            </form>
                                        </Grid>

                                        {/* <Grid item lg={4} md={4} sm={4} xs={4}  > */}

                                        {/* <Box sx={{ minWidth: 120 }}>
                    <FormControl size="small" fullWidth error={purchasedError}>
                      <InputLabel id="demo-simple-select-label">Purchased by</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={PurchaseBy1 === undefined ? 'N/A' : PurchaseBy1}
                        label="Purchased by"

                        onChange={handlePurchasedDialog}

                      >
                        {purchaseBy.map(
                          (pur) => {
                            return (
                              <MenuItem
                                value={pur._id}
                              >
                                {
                                  pur.name
                                }
                              </MenuItem>
                            )
                          }
                        )}
                      </Select>
                      <FormHelperText>
                        {' '}
                        {purchasedError ===
                          true
                          ? 'Field Required'
                          : ''}
                      </FormHelperText>
                    </FormControl>
                  </Box> */}

                                        {/* </Grid> */}

                                        <Grid item lg={4} md={4} sm={4} xs={4}>
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl
                                                    size="small"
                                                    fullWidth
                                                    error={UserError}
                                                >
                                                    <InputLabel id="demo-simple-select-label">
                                                        Customer Emp ID
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={user}
                                                        label="Customer Emp ID"
                                                        onChange={
                                                            handleCustomerDialog
                                                        }
                                                    >
                                                        {custodienId.map(
                                                            (employee) => {
                                                                return (
                                                                    <MenuItem
                                                                        value={
                                                                            employee._id
                                                                        }
                                                                    >
                                                                        {
                                                                            employee.employeeId
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        )}
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
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={ownerShip}
                                                        label="Customer Emp ID"
                                                        onChange={
                                                            handleOwenerShipeDialog
                                                        }
                                                    >
                                                        <MenuItem
                                                            value={`PRAL`}
                                                        >
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
                                                value={venderName}
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
                                                value={venderEmail}
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
                                                value={venderNumber}
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
                                                value={tagdata}
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
                                        <Grid
                                            item
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                        >
                                            <TextField
                                                error={setSrNoError}
                                                id="name"
                                                label="SR NO"
                                                placeholder="SR NO"
                                                autoComplete="off"
                                                helperText={
                                                    setSrNoError === true
                                                        ? 'Field Required'
                                                        : ''
                                                }
                                                value={srno}
                                                size="small"
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        setSrNo,
                                                        setSrNoError
                                                    )
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        item
                                        lg={4}
                                        md={4}
                                        sm={4}
                                        xs={4}
                                    ></Grid>
                                    <Grid container spacing={2}>
                                        <Grid
                                            item
                                            xl={4}
                                            lg={4}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
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
                                            {imageUrl1 ? (
                                                <a href={imageUrl1} download>
                                                    <img
                                                        src={imageUrl1}
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
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button
                                autoFocus
                                onClick={() => {
                                    handleCreateClickOpen()
                                }}
                            >
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {/* ////////
edit dialog box */}
                    <Dialog
                        open={handleEditDialog}
                        fullWidth={true}
                        onClose={handleEditDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {'EDIT PURCHASE ITEMS'}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
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
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={productId}
                                                        label="Product Category"
                                                        onChange={handleProduct}
                                                    >
                                                        {product1.map(
                                                            (productList) => {
                                                                return (
                                                                    <MenuItem
                                                                        value={
                                                                            productList._id
                                                                        }
                                                                    >
                                                                        {
                                                                            productList.name
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        )}
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
                                                value={model}
                                                size="small"
                                                onChange={(e) =>
                                                    handleModel(
                                                        e,
                                                        setModel,
                                                        setModelError
                                                    )
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>

                                        <Grid item lg={4} md={4} sm={4} xs={6}>
                                            <TextField
                                                error={priceError}
                                                id="name"
                                                label="Price"
                                                placeholder="Price"
                                                autoComplete="off"
                                                helperText={
                                                    priceError === true
                                                        ? 'Field Required'
                                                        : ''
                                                }
                                                value={price}
                                                size="small"
                                                onChange={(e) =>
                                                    handlePrice(
                                                        e,
                                                        setPrice,
                                                        setPriceError
                                                    )
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
                                                value={purchaseOrder}
                                                size="small"
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        setPurchaseOrder,
                                                        setPurchasedError
                                                    )
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>

                                        <Grid item lg={4} md={4} sm={4} xs={4}>
                                            <TextField
                                                error={productQuantityError}
                                                id="name"
                                                label="Product Quantity"
                                                placeholder="Product Quantity"
                                                autoComplete="off"
                                                helperText={
                                                    productQuantityError ===
                                                    true
                                                        ? 'Field Required'
                                                        : ''
                                                }
                                                value={productQuantity}
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
                                                        variant="contained"
                                                        component="span"
                                                        startIcon={
                                                            <AddAPhotoIcon />
                                                        }
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
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={statusValue}
                                                        label="Status"
                                                        onChange={
                                                            handleStatusDialog
                                                        }
                                                    >
                                                        <MenuItem
                                                            value={`inuse`}
                                                        >
                                                            Inuse
                                                        </MenuItem>
                                                        <MenuItem
                                                            value={`replacement`}
                                                        >
                                                            Replacement
                                                        </MenuItem>
                                                        <MenuItem
                                                            value={`scrap`}
                                                        >
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
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={officeNameList}
                                                        label="Office"
                                                        onChange={
                                                            handleOfficeDialog
                                                        }
                                                    >
                                                        {officeDialog.map(
                                                            (officeList) => {
                                                                return (
                                                                    <MenuItem
                                                                        value={
                                                                            officeList._id
                                                                        }
                                                                    >
                                                                        {
                                                                            officeList.name
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        )}
                                                    </Select>
                                                    <FormHelperText>
                                                        {' '}
                                                        {officeNameError ===
                                                        true
                                                            ? 'Field Required'
                                                            : ''}
                                                    </FormHelperText>
                                                </FormControl>
                                            </Box>
                                        </Grid>

                                        <Grid item lg={4} md={4} sm={4} xs={4}>
                                            <form
                                                className={myclass.container}
                                                noValidate
                                            >
                                                <TextField
                                                    id="date"
                                                    size="small"
                                                    label="Date Of Purchase"
                                                    type="date"
                                                    value={dataOfPurchase}
                                                    defaultValue="2017-05-24"
                                                    className={
                                                        myclass.textField
                                                    }
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    error={dateOfPurchaseError}
                                                    helperText={
                                                        dateOfPurchaseError ===
                                                        true
                                                            ? 'Field Required'
                                                            : ''
                                                    }
                                                    onChange={
                                                        handlePurchasedDate
                                                    }
                                                />
                                            </form>
                                        </Grid>

                                        {/* <Grid item lg={4} md={4} sm={4} xs={4}  > */}

                                        {/* <Box sx={{ minWidth: 120 }}>
                    <FormControl size="small" fullWidth error={purchasedError}>
                      <InputLabel id="demo-simple-select-label">Purchased by</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={PurchaseBy1}
                        label="Purchased by"

                        onChange={handlePurchasedDialog}

                      >
                        {purchaseBy.map(
                          (pur) => {
                            return (
                              <MenuItem
                                value={pur._id}
                              >
                                {
                                  pur.name
                                }
                              </MenuItem>
                            )
                          }
                        )}
                      </Select>
                      <FormHelperText>
                        {' '}
                        {purchasedError ===
                          true
                          ? 'Field Required'
                          : ''}
                      </FormHelperText>
                    </FormControl>
                  </Box> */}

                                        {/* </Grid> */}

                                        <Grid item lg={4} md={4} sm={4} xs={4}>
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl
                                                    size="small"
                                                    fullWidth
                                                    error={custodienIdError}
                                                >
                                                    <InputLabel id="demo-simple-select-label">
                                                        Customer Emp ID
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={user}
                                                        label="Customer Emp ID"
                                                        onChange={
                                                            handleCustomerDialog
                                                        }
                                                    >
                                                        {custodienId.map(
                                                            (employee) => {
                                                                return (
                                                                    <MenuItem
                                                                        value={
                                                                            employee._id
                                                                        }
                                                                    >
                                                                        {
                                                                            employee.employeeId
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        )}
                                                    </Select>
                                                    <FormHelperText>
                                                        {' '}
                                                        {custodienIdError ===
                                                        true
                                                            ? 'Field Required'
                                                            : ''}
                                                    </FormHelperText>
                                                </FormControl>
                                            </Box>
                                        </Grid>

                                        <Grid item lg={4} md={4} sm={4} xs={6}>
                                            <TextField
                                                style={{ width: '160px' }}
                                                error={createdByError}
                                                disabled
                                                id="name"
                                                label="Created by"
                                                placeholder="Created by"
                                                autoComplete="off"
                                                helperText={
                                                    createdByError === true
                                                        ? 'Field Required'
                                                        : ''
                                                }
                                                value={
                                                    createdBy === undefined
                                                        ? 'N/A'
                                                        : createdBy
                                                }
                                                size="small"
                                                onChange={(e) =>
                                                    handleCreatedByDialog(
                                                        e,
                                                        setCreatedBy,
                                                        setCreatedByError
                                                    )
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>

                                        <br></br>
                                        <Grid item lg={4} md={4} sm={4} xs={6}>
                                            <TextField
                                                style={{ width: '160px' }}
                                                error={createdAtError}
                                                disabled
                                                id="name"
                                                label="Created At"
                                                placeholder="Created At"
                                                autoComplete="off"
                                                helperText={
                                                    createdAtError === true
                                                        ? 'Field Required'
                                                        : ''
                                                }
                                                value={moment(createdAt).format(
                                                    'LL'
                                                )}
                                                size="small"
                                                onChange={(e) =>
                                                    handleCreatedOnDialog(
                                                        e,
                                                        setCreatedAt,
                                                        setCreatedAtError
                                                    )
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>

                                        <br></br>
                                        <Grid item lg={4} md={4} sm={4} xs={6}>
                                            <TextField
                                                style={{ width: '160px' }}
                                                error={modifyByError}
                                                disabled
                                                id="name"
                                                label="Modify by"
                                                placeholder="Modify by"
                                                autoComplete="off"
                                                helperText={
                                                    modifyByError === true
                                                        ? 'Field Required'
                                                        : ''
                                                }
                                                value={
                                                    modifyByDialog === undefined
                                                        ? 'N/A'
                                                        : moment(
                                                              modifyByDialog
                                                          ).format('LL')
                                                }
                                                size="small"
                                                onChange={(e) =>
                                                    handleModifyByDialog(
                                                        e,
                                                        setModifyByDialog,
                                                        setModifyByError
                                                    )
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                        <br></br>

                                        <Grid item lg={4} md={4} sm={4} xs={6}>
                                            <TextField
                                                style={{ width: '160px' }}
                                                error={modifyOnError}
                                                disabled
                                                id="name"
                                                label="Modify on"
                                                placeholder="Modify on"
                                                autoComplete="off"
                                                helperText={
                                                    editmodifyOnError === true
                                                        ? 'Field Required'
                                                        : ''
                                                }
                                                value={
                                                    modifyOnDialog === undefined
                                                        ? 'N/A'
                                                        : moment(
                                                              modifyOnDialog
                                                          ).format('LL')
                                                }
                                                size="small"
                                                onChange={(e) =>
                                                    handleModifyOnDialog(
                                                        e,
                                                        setModifyOnDialog,
                                                        setModifyOnError
                                                    )
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
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
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={ownerShip}
                                                        label="Customer Emp ID"
                                                        onChange={
                                                            handleOwenerShipeDialog
                                                        }
                                                    >
                                                        <MenuItem
                                                            value={`PRAL`}
                                                        >
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
                                    </Grid>
                                    <br></br>

                                    {/* this is the qr code of the PRAL */}

                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField
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
                                            value={venderName}
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
                                            value={venderEmail}
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
                                            value={venderNumber}
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
                                            error={venderEmailError}
                                            id="name"
                                            label="Tag"
                                            placeholder="Tag"
                                            autoComplete="off"
                                            helperText={
                                                venderEmailError === true
                                                    ? 'Field Required'
                                                    : ''
                                            }
                                            value={tagdata}
                                            size="small"
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    setTagdata,
                                                    setVenderEmailError
                                                )
                                            }
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <TextField
                                            error={venderEmailError}
                                            id="name"
                                            label="SR NO"
                                            placeholder="SR NO"
                                            autoComplete="off"
                                            helperText={
                                                venderEmailError === true
                                                    ? 'Field Required'
                                                    : ''
                                            }
                                            value={srno}
                                            size="small"
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    setSrNo,
                                                    setVenderEmailError
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
                                        xs={4}
                                    ></Grid>
                                    <Grid container spacing={2}>
                                        <Grid
                                            item
                                            xl={4}
                                            lg={4}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
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
                                            {imageUrl1 ? (
                                                <a href={imageUrl1} download>
                                                    <img
                                                        src={imageUrl1}
                                                        alt="img"
                                                        style={{
                                                            marginLeft: '24px',
                                                        }}
                                                    />
                                                </a>
                                            ) : null}
                                        </Grid>{' '}
                                    </Grid>
                                </CardContent>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleEditDialogClose}>
                                Cancel
                            </Button>
                            <Button autoFocus onClick={handleEdit}>
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/* Search Items Dialog */}

                    <Dialog
                        open={searchItemsDialog}
                        fullWidth={true}
                        onClose={handleSearchDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {'Search Filters'}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <br></br>

                                {/* new search items fileds */}

                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item lg={6} md={6} sm={6} xs={6}>
                                            <Box>
                                                <FormControl
                                                    size="medium"
                                                    fullWidth
                                                    error={productIdError}
                                                >
                                                    <InputLabel id="demo-simple-select-label">
                                                        Product Name
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={productName}
                                                        label="Product Category"
                                                        onChange={
                                                            handleProductName
                                                        }
                                                    >
                                                        {productName.map(
                                                            (productList) => {
                                                                return (
                                                                    <MenuItem
                                                                        value={
                                                                            productList._id
                                                                        }
                                                                    >
                                                                        {
                                                                            productList.name
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        )}
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

                                        <Grid item lg={6} md={6} sm={6} xs={6}>
                                            <TextField
                                                error={modelError}
                                                id="name"
                                                label="Vender Email/Name"
                                                placeholder="Vender Email/Name"
                                                autoComplete="off"
                                                helperText={
                                                    modelError === true
                                                        ? 'Field Required'
                                                        : ''
                                                }
                                                value={vender}
                                                size="medium"
                                                onChange={(e) =>
                                                    handleVender(
                                                        e,
                                                        setVender,
                                                        setModelError
                                                    )
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <br></br>
                                    <Grid container spacing={3}>
                                        <Grid item lg={6} md={6} sm={6} xs={6}>
                                            <TextField
                                                error={purchasedOrderError}
                                                id="name"
                                                label="Tag Search"
                                                placeholder="Tag Search"
                                                autoComplete="off"
                                                helperText={
                                                    purchasedOrderError === true
                                                        ? 'Field Required'
                                                        : ''
                                                }
                                                value={tagsearch}
                                                size="medium"
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        setTagSearch,
                                                        setPurchasedOrderError
                                                    )
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>

                                        <Grid item lg={6} md={6} sm={6} xs={6}>
                                            <TextField
                                                error={productQuantityError}
                                                id="name"
                                                label="Sr No Search"
                                                placeholder="Sr No Search"
                                                autoComplete="off"
                                                helperText={
                                                    productQuantityError ===
                                                    true
                                                        ? 'Field Required'
                                                        : ''
                                                }
                                                value={srnosearch}
                                                size="medium"
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        setSrnoSearch,
                                                        setProductQuantityError
                                                    )
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                        >
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl
                                                    size="medium"
                                                    fullWidth
                                                    error={UserError}
                                                >
                                                    <InputLabel id="demo-simple-select-label">
                                                        Custodian Id/Name
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={custodienIdName}
                                                        label="Custodian Id/Name"
                                                        onChange={
                                                            handleCustodianId
                                                        }
                                                    >
                                                        {custodienIdName.map(
                                                            (employee) => {
                                                                return (
                                                                    <MenuItem
                                                                        value={
                                                                            employee._id
                                                                        }
                                                                    >
                                                                        {
                                                                            employee.employeeId
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        )}
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
                                    </Grid>
                                </CardContent>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseClick}>Cancel</Button>
                            <Button
                                autoFocus
                                onClick={() => {
                                    handleCreateClickOpen()
                                }}
                            >
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {/* ////////
edit dialog box */}
                    <Dialog
                        open={handleEditDialog}
                        fullWidth={true}
                        onClose={handleEditDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {'EDIT PURCHASE ITEMS'}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
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
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={productId}
                                                        label="Product Category"
                                                        onChange={handleProduct}
                                                    >
                                                        {product1.map(
                                                            (productList) => {
                                                                return (
                                                                    <MenuItem
                                                                        value={
                                                                            productList._id
                                                                        }
                                                                    >
                                                                        {
                                                                            productList.name
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        )}
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
                                                value={model}
                                                size="small"
                                                onChange={(e) =>
                                                    handleModel(
                                                        e,
                                                        setModel,
                                                        setModelError
                                                    )
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>

                                        <Grid item lg={4} md={4} sm={4} xs={6}>
                                            <TextField
                                                error={priceError}
                                                id="name"
                                                label="Price"
                                                placeholder="Price"
                                                autoComplete="off"
                                                helperText={
                                                    priceError === true
                                                        ? 'Field Required'
                                                        : ''
                                                }
                                                value={price}
                                                size="small"
                                                onChange={(e) =>
                                                    handlePrice(
                                                        e,
                                                        setPrice,
                                                        setPriceError
                                                    )
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
                                                value={purchaseOrder}
                                                size="small"
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        setPurchaseOrder,
                                                        setPurchasedError
                                                    )
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>

                                        <Grid item lg={4} md={4} sm={4} xs={4}>
                                            <TextField
                                                error={productQuantityError}
                                                id="name"
                                                label="Product Quantity"
                                                placeholder="Product Quantity"
                                                autoComplete="off"
                                                helperText={
                                                    productQuantityError ===
                                                    true
                                                        ? 'Field Required'
                                                        : ''
                                                }
                                                value={productQuantity}
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
                                                        variant="contained"
                                                        component="span"
                                                        startIcon={
                                                            <AddAPhotoIcon />
                                                        }
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
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={statusValue}
                                                        label="Status"
                                                        onChange={
                                                            handleStatusDialog
                                                        }
                                                    >
                                                        <MenuItem
                                                            value={`inuse`}
                                                        >
                                                            Inuse
                                                        </MenuItem>
                                                        <MenuItem
                                                            value={`replacement`}
                                                        >
                                                            Replacement
                                                        </MenuItem>
                                                        <MenuItem
                                                            value={`scrap`}
                                                        >
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
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={officeNameList}
                                                        label="Office"
                                                        onChange={
                                                            handleOfficeDialog
                                                        }
                                                    >
                                                        {officeDialog.map(
                                                            (officeList) => {
                                                                return (
                                                                    <MenuItem
                                                                        value={
                                                                            officeList._id
                                                                        }
                                                                    >
                                                                        {
                                                                            officeList.name
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        )}
                                                    </Select>
                                                    <FormHelperText>
                                                        {' '}
                                                        {officeNameError ===
                                                        true
                                                            ? 'Field Required'
                                                            : ''}
                                                    </FormHelperText>
                                                </FormControl>
                                            </Box>
                                        </Grid>

                                        <Grid item lg={4} md={4} sm={4} xs={4}>
                                            <form
                                                className={myclass.container}
                                                noValidate
                                            >
                                                <TextField
                                                    id="date"
                                                    size="small"
                                                    label="Date Of Purchase"
                                                    type="date"
                                                    value={dataOfPurchase}
                                                    defaultValue="2017-05-24"
                                                    className={
                                                        myclass.textField
                                                    }
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    error={dateOfPurchaseError}
                                                    helperText={
                                                        dateOfPurchaseError ===
                                                        true
                                                            ? 'Field Required'
                                                            : ''
                                                    }
                                                    onChange={
                                                        handlePurchasedDate
                                                    }
                                                />
                                            </form>
                                        </Grid>

                                        <Grid item lg={4} md={4} sm={4} xs={4}>
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl
                                                    size="small"
                                                    fullWidth
                                                    error={custodienIdError}
                                                >
                                                    <InputLabel id="demo-simple-select-label">
                                                        Customer Emp ID
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={user}
                                                        label="Customer Emp ID"
                                                        onChange={
                                                            handleCustomerDialog
                                                        }
                                                    >
                                                        {custodienId.map(
                                                            (employee) => {
                                                                return (
                                                                    <MenuItem
                                                                        value={
                                                                            employee._id
                                                                        }
                                                                    >
                                                                        {
                                                                            employee.employeeId
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        )}
                                                    </Select>
                                                    <FormHelperText>
                                                        {' '}
                                                        {custodienIdError ===
                                                        true
                                                            ? 'Field Required'
                                                            : ''}
                                                    </FormHelperText>
                                                </FormControl>
                                            </Box>
                                        </Grid>

                                        <Grid item lg={4} md={4} sm={4} xs={6}>
                                            <TextField
                                                style={{ width: '160px' }}
                                                error={createdByError}
                                                disabled
                                                id="name"
                                                label="Created by"
                                                placeholder="Created by"
                                                autoComplete="off"
                                                helperText={
                                                    createdByError === true
                                                        ? 'Field Required'
                                                        : ''
                                                }
                                                value={
                                                    createdBy === undefined
                                                        ? 'N/A'
                                                        : createdBy
                                                }
                                                size="small"
                                                onChange={(e) =>
                                                    handleCreatedByDialog(
                                                        e,
                                                        setCreatedBy,
                                                        setCreatedByError
                                                    )
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>

                                        <br></br>
                                        <Grid item lg={4} md={4} sm={4} xs={6}>
                                            <TextField
                                                style={{ width: '160px' }}
                                                error={createdAtError}
                                                disabled
                                                id="name"
                                                label="Created At"
                                                placeholder="Created At"
                                                autoComplete="off"
                                                helperText={
                                                    createdAtError === true
                                                        ? 'Field Required'
                                                        : ''
                                                }
                                                value={moment(createdAt).format(
                                                    'LL'
                                                )}
                                                size="small"
                                                onChange={(e) =>
                                                    handleCreatedOnDialog(
                                                        e,
                                                        setCreatedAt,
                                                        setCreatedAtError
                                                    )
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>

                                        <br></br>
                                        <Grid item lg={4} md={4} sm={4} xs={6}>
                                            <TextField
                                                style={{ width: '160px' }}
                                                error={modifyByError}
                                                disabled
                                                id="name"
                                                label="Modify by"
                                                placeholder="Modify by"
                                                autoComplete="off"
                                                helperText={
                                                    modifyByError === true
                                                        ? 'Field Required'
                                                        : ''
                                                }
                                                value={
                                                    modifyByDialog === undefined
                                                        ? 'N/A'
                                                        : moment(
                                                              modifyByDialog
                                                          ).format('LL')
                                                }
                                                size="small"
                                                onChange={(e) =>
                                                    handleModifyByDialog(
                                                        e,
                                                        setModifyByDialog,
                                                        setModifyByError
                                                    )
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                        <br></br>

                                        <Grid item lg={4} md={4} sm={4} xs={6}>
                                            <TextField
                                                style={{ width: '160px' }}
                                                error={modifyOnError}
                                                disabled
                                                id="name"
                                                label="Modify on"
                                                placeholder="Modify on"
                                                autoComplete="off"
                                                helperText={
                                                    editmodifyOnError === true
                                                        ? 'Field Required'
                                                        : ''
                                                }
                                                value={
                                                    modifyOnDialog === undefined
                                                        ? 'N/A'
                                                        : moment(
                                                              modifyOnDialog
                                                          ).format('LL')
                                                }
                                                size="small"
                                                onChange={(e) =>
                                                    handleModifyOnDialog(
                                                        e,
                                                        setModifyOnDialog,
                                                        setModifyOnError
                                                    )
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
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
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={ownerShip}
                                                        label="Customer Emp ID"
                                                        onChange={
                                                            handleOwenerShipeDialog
                                                        }
                                                    >
                                                        <MenuItem
                                                            value={`PRAL`}
                                                        >
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
                                    </Grid>
                                    <br></br>

                                    {/* this is the qr code of the PRAL */}

                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField
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
                                            value={venderName}
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
                                    <Grid item lg={4} md={4} sm={4} xs={6}>
                                        <TextField
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
                                            value={venderEmail}
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
                                            value={venderNumber}
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
                                    <Grid
                                        item
                                        lg={4}
                                        md={4}
                                        sm={4}
                                        xs={4}
                                    ></Grid>
                                    <Grid container spacing={2}>
                                        <Grid
                                            item
                                            xl={4}
                                            lg={4}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
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
                                            {imageUrl1 ? (
                                                <a href={imageUrl1} download>
                                                    <img
                                                        src={imageUrl1}
                                                        alt="img"
                                                        style={{
                                                            marginLeft: '24px',
                                                        }}
                                                    />
                                                </a>
                                            ) : null}
                                        </Grid>{' '}
                                    </Grid>
                                </CardContent>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleSearchDialogClose}>
                                Cancel
                            </Button>
                            <Button autoFocus onClick={handleEdit}>
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )}
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

export default PurchasedItems
