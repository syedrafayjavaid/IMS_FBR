import { useTheme } from '@mui/material/styles'
import * as React from 'react'
import { KeyboardDatePicker } from "@material-ui/pickers";
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider';
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import QrCodeIcon from '@mui/icons-material/QrCode'


import {
    Autocomplete,
    Checkbox,
    Container,
    Fab,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    Typography,
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import { useEffect, useRef, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import QRCode from 'qrcode'

import { CardContent } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/system'
import { ConfirmationDialog } from 'app/components'
import axios from 'axios'
import config from 'config'
import moment from 'moment'
import PurchaseItemCard from './PurchaseItemCard'
import QrReader from 'react-qr-reader'
import { CSVLink } from 'react-csv'
import SummarizeIcon from '@mui/icons-material/Summarize'
import '../users/user.css'
import ReactPaginate from 'react-paginate'

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

const Input = styled('input')({
    display: 'none',
})

const PurchasedItems = () => {
    const userName = localStorage.getItem('username')

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
    const [UserError, setUserError] = React.useState(false)
    const [purchasedOrderError, setPurchasedOrderError] = React.useState(false)
    const [productIdError, setProductIdError] = React.useState(false)
    // Setting States
    const [quantity, setQuantity] = React.useState([])
    const [checked, setChecked] = React.useState(false)
    const [productQuantity, setProductQuantity] = React.useState('1')
    const [price, setPrice] = React.useState('')
    const [product, setProduct] = React.useState([])
    const [purchaseOrder, setPurchaseOrder] = React.useState('')
    const [image, setImage] = React.useState('')
    const [product1, setProduct1] = React.useState([])
    const myclass = dateStyles()

    ///
    //API For the dialogbox
    const [purchaseBy, setPurchaseBy] = React.useState([])
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
    const [departments, setDepartments] = React.useState([])
    const [selectedDepartment, setSelectedDepartment] = React.useState(null)

    const date = new Date().toISOString().split('T')[0]

    const [dataOfPurchase, setDateOfPurchase] = React.useState(date)
    const [user, setUser] = React.useState('')
    const [purchaseId, setPurchaseId] = React.useState('')
    const [handleEditDialog, setHandleEditDialog] = React.useState(false)
    ///search items
    const [searchItemsDialog, setSearchItemsDialog] = React.useState(false)
    const [vender, setVender] = React.useState('')
    const [custodienIdName, setCustodienIdName] = React.useState('')
    const [productName, setProductName] = React.useState([])
    const [tagdata, setTagdata] = React.useState('')
    const [tagdataError, setTagdataError] = React.useState(false)
    const [srno, setSrNo] = React.useState('')
    const [srnoError, setSrNoError] = React.useState(false)
    const [productData, setProductData] = React.useState()
    const [officeData, setOfficeData] = React.useState()
    const [openConfirmationDialog, setOpenConfirmationDialog] =
        React.useState(false)
    const [selectedProduct, setSelectedProduct] = React.useState(null)
    const [productId, setProductId] = React.useState('')

    const [searchProduct, setSearchProduct] = React.useState(null)
    const [searchVender, setSearchVender] = React.useState(null)
    const [searchTag, setSearchTag] = React.useState('')
    const [searchSrNo, setSearchSrNo] = React.useState('')
    const [searchCustodianId, setSearchCustodianId] = React.useState(null)

    const [searchByQrCode, setSearchByQrCode] = React.useState(false)

    ////search filter state
    const [searchStatus, setSearchStatus] = React.useState('')
    const [ownerShipSearch, setOwnerShipSearch] = React.useState('')
    const [purchaseOrderSearch, setPurchaseOrdersearch] = React.useState('')
    const [sdate, setSdate] = React.useState('')
    const [sdate1, setSdate1] = React.useState('')
    
    const handlestatus = (event) => {
        setSearchStatus(event.target.value)
    }
    const handleOwnerShipe = (event) => {
        setOwnerShipSearch(event.target.value)
    }
    const handlePurchasedOrderSearch = (event) => {
        setPurchaseOrdersearch(event.target.value)
    }
function KeyboardDatePickerExample(props) {
  const [selectedDate, handleDateChange] = useState(new Date());
}

    const marks = [
        {
          value: 0,
          label: '0',
        },
        {
          value: 100,
          label: '100',
        },
        {
          value: 500,
          label: '500',
        },
        {
          value: 700,
          label: '700',
        },
        {
            value: 1000,
            label: '1000',
          },
      ];
      
      function valuetext(value) {
        return `${value}`;
      }
///////
    const [pageNumber, setPageNumber] = React.useState(0)
    const ItemsEntryPerPage = 8
    const pagesVisited = pageNumber * ItemsEntryPerPage
    const pageCount = Math.ceil(purchasedItems.length / ItemsEntryPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const handleChecked = (event) => {
        setChecked(event.target.checked)
    }

    const handleErrorWebCam = (error) => {
        console.log(error)
    }
    const handleScanWebCam = (result) => {
        if (result) {
            setScanResultWebCam(result)
        }
    }

    const handleChange = (e, func, errorFunc) => {
        func(e.target.value)
        errorFunc(false)
    }
    const handleModel = (event) => {
        setModel(event.target.value)
    }
    const handlePrice = (event) => {
        setPrice(event.target.value)
    }

    const handleStatusDialog = (event) => {
        setStatusValue(event.target.value)
    }

    const handleOfficeDialog = (event) => {
        setOfficeNameList(event.target.value)
    }

    const handleCreatedByDialog = (event) => {
        setCreatedBy(event.target.value)
    }
    const handleCreatedOnDialog = (event) => {
        setCreatedAt(event.target.value)
    }
    const handleModifyByDialog = (event) => {
        setModifyByDialog(event.target.value)
    }
    const handleModifyOnDialog = (event) => {
        setModifyOnDialog(event.target.value)
    }
    const handleOwenerShipeDialog = (event) => {
        setOwnerShip(event.target.value)
    }

    const handlePurchasedDate = (event) => {
        setDateOfPurchase(event.target.value)
    }

    const handlePhoto = (event) => {
        setImage(event.target.files)
    }
    const [open, setOpen] = React.useState(false)

    const handleClose = () => {
        setOpen(false)
    }
    const handleCloseClick = () => {
        setSearchItemsDialog(false)
    }
    const handleCreateClose = () => {
        setOpen(false)
        setStatusValue('')
        setPrice('')
        setDateOfPurchase('')
        setOwnerShip('')
        setOfficeNameList('')
        setVenderName('')
        setVenderEmail('')
        setVenderNumber('')
        setImage('')
        setImageUrl1('')
        setModel('')
        setQrCode('')
        setProductQuantity('')
        setPurchaseOrder('')
        setSrNo('')
        setTagdata('')
        setSelectedProduct(null)
        setChecked(false)
    }
    const handleEditDialogClose = () => {
        setHandleEditDialog(false)
        setStatusValue('')
        setPrice('')
        setDateOfPurchase('')
        setOwnerShip('')
        setOfficeNameList('')
        setVenderName('')
        setVenderEmail('')
        setVenderNumber('')
        setImage('')
        setImageUrl1('')
        setModel('')
        setQrCode('')
        setProductQuantity('')
        setPurchaseOrder('')
        setSrNo('')
        setTagdata('')
        setSelectedProduct(null)
        setChecked(false)
    }

    const handleSearchDialogClose = () => {
        setSearchItemsDialog(false)
    }

    useEffect(() => {
        getAlldata()
        if (productId) {
            getProduct(productId)
        }
        if (officeNameList) {
            getoffice(officeNameList)
        }
        // if (user) {
        //     getCustodianId(user)
        // }
    }, [productId, officeNameList])

    const getAlldata = () => {
        axios
            .get(`${config.base_url}/api/v1/products`)
            .then((res) => {
                setProduct1(res.data.data)
                // console.log(product1, 'setProduct1')
            })
            .catch((error) => {
                console.log(error, 'error')
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
                setOfficeDialog(res.data.data)
            })
            .catch((error) => {})
        axios
            .get(`${config.base_url}/api/v1/employee`)
            .then((res) => {
                setCustodienId(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
        axios
            .get(`${config.base_url}/api/v1/department`)
            .then((res) => {
                setDepartments(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })

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
                setPurchasedItems(res.data.data)
                //  console.log(purchaseBy, 'Purchase of the data');
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const getProduct = (productId) => {
        axios
            .get(`${config.base_url}/api/v1/products/${productId}`)
            .then((res) => {
                setProductData(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const generateQrCode = async () => {
        try {
            const qrProduct =
                selectedProduct?.name === undefined
                    ? 'N/A'
                    : selectedProduct?.name

            const qrModel = model === '' ? 'N/A' : model

            const qrPrice = price === '' ? 'N/A' : price

            const qrPurchaseOrder = purchaseOrder === '' ? 'N/A' : purchaseOrder

            const qrProductQuantity =
                productQuantity === '' ? 'N/A' : productQuantity

            const qrStatus = statusValue === '' ? 'N/A' : statusValue

            const qrOffice =
                officeData?.name === undefined ? 'N/A' : officeData?.name

            const qrDateOfPurchase =
                dataOfPurchase === '' ? 'N/A' : dataOfPurchase

            const qrOwnerShip = ownerShip === '' ? 'N/A' : ownerShip

            const qrVenderName = venderName === '' ? 'N/A' : venderName

            const qrVenderEmail = venderEmail === '' ? 'N/A' : venderEmail

            const qrVenderNumber = venderNumber === '' ? 'N/A' : venderNumber

            const qrTag = tagdata === '' ? 'N/A' : tagdata

            const qrSrNo = srno === '' ? 'N/A' : srno

            const qrCode = `Product Name: ${qrProduct}\nModel: ${qrModel}\nPrice: ${qrPrice}\nPurchase Order: ${qrPurchaseOrder}\nQuantity: ${qrProductQuantity}\nStatus: ${qrStatus}\nOffice: ${qrOffice}\nDate Of Purchase: ${qrDateOfPurchase}\nOwnership: ${qrOwnerShip}\nVendor Name: ${qrVenderName}\nVendor Email: ${qrVenderEmail}\nVendor Number: ${qrVenderNumber}\nTag: ${qrTag}\nSr No: ${qrSrNo}`

            setQrCode(qrCode)
            const response = await QRCode.toDataURL(qrCode)
            setImageUrl1(response)
        } catch (error) {
            console.log(error)
        }
    }

    const getoffice = (officeId) => {
        axios
            .get(`${config.base_url}/api/v1/office/${officeId}`)
            .then((res) => {
                setOfficeData(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    // const getCustodianId = (custodianId) => {
    //     axios
    //         .get(`${config.base_url}/api/v1/employee/${custodianId}`)
    //         .then((res) => {
    //             setCustodianIdData(res.data.data)
    //         })
    //         .catch((error) => {
    //             console.log(error, 'error')
    //         })
    // }

    const createHandler = () => {
        let data = new FormData()

        data.append('productId', selectedProduct?._id)
        data.append('price', price)
        data.append('dataOfPurchase', dataOfPurchase)
        data.append('ownership', ownerShip)
        data.append('officeId', officeNameList)
        data.append('status', statusValue)
        data.append('venderName', venderName)
        data.append('venderEmail', venderEmail)
        data.append('venderContact', venderNumber)
        data.append('attachment', image)
        data.append('QRCodeImage', imageUrl1)
        data.append('model', model)
        data.append('purchaseOrder', purchaseOrder)
        data.append('quantity', productQuantity)
        data.append('QRCode', qrCode)
        data.append('srNo', srno)
        data.append('tagNo', tagdata)
        data.append('active', checked)

        setProductId(selectedProduct?._id)

        if (imageUrl1 === '') {
            return
        }

        axios
            .post(`${config.base_url}/api/v1/purchaseProduct`, data)
            .then((res) => {
                if (res) {
                    handleCreateClose()
                    getAlldata()
                    setOpen(false)
                }
                setStatusValue('')
                setPrice('')
                setDateOfPurchase('')
                setOwnerShip('')
                setOfficeNameList('')
                setVenderName('')
                setVenderEmail('')
                setVenderNumber('')
                setImage('')
                setImageUrl1('')
                setModel('')
                setQrCode('')
                setProductQuantity('')
                setPurchaseOrder('')
                setSrNo('')
                setTagdata('')
                setSelectedProduct(null)
                setChecked(false)
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    //error handling
    const handleCreateClickOpen = () => {
        if (
            price === '' ||
            dataOfPurchase === '' ||
            officeNameList === '' ||
            ownerShip === '' ||
            statusValue === '' ||
            model === '' ||
            purchaseOrder === '' ||
            productQuantity === '' ||
            venderName === '' ||
            venderNumber === '' ||
            tagdata === ''
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
            if (tagdata === '') {
                setTagdataError(true)
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
            model === '' ||
            purchaseOrder === '' ||
            productQuantity === '' ||
            venderName === '' ||
            venderNumber === '' ||
            tagdata === ''
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
            if (tagdata === '') {
                setTagdataError(true)
            }
        } else {
            editHandler()
        }
    }

    const onDelhandler = (id) => {
        setOpenConfirmationDialog(true)
        setPurchaseId(id)

        let data = new FormData()

        data.append('productId', productId)

        if (openConfirmationDialog && purchaseId) {
            axios
                .delete(
                    `${config.base_url}/api/v1/purchaseProduct/${purchaseId}`,
                    data
                )
                .then((res) => {
                    getAlldata()
                    setOpenConfirmationDialog(false)
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
        }
    }

    const onEdithandler = (id, purchaseItem) => {
        setPurchaseId(id)

        axios
            .get(`${config.base_url}/api/v1/products/${purchaseItem.productId}`)
            .then((res) => {
                setProductData(res.data.data)
            })
            .catch((error) => {
                console.log(error, 'error')
            })

        setProductId(purchaseItem.productId)

        setSelectedProduct(productData)

        setHandleEditDialog(true)

        setStatusValue(purchaseItem.status)

        setPrice(purchaseItem.price)
        const date = new Date(purchaseItem.dataOfPurchase)
            .toISOString()
            .split('T')[0]
        setDateOfPurchase(date)
        setOwnerShip(purchaseItem.ownership)
        setOfficeNameList(purchaseItem.officeId)
        setVenderName(purchaseItem.venderName)
        setVenderEmail(purchaseItem.venderEmail)
        setVenderNumber(purchaseItem.venderContact)
        setImage(purchaseItem.image)
        setImageUrl1(purchaseItem.QRCodeImage)
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
        setSrNo(purchaseItem.srNo)
        setTagdata(purchaseItem.tagNo)
        setChecked(purchaseItem.active)
    }

    const editHandler = () => {
        let data = new FormData()
        data.append('productId', selectedProduct?._id)
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
        data.append('purchaseOrder', purchaseOrder)
        data.append('model', model)
        data.append('quantity', productQuantity)
        data.append('QRCode', qrCode)
        data.append('tagData', tagdata)
        data.append('srNo', srno)
        data.append('tagNo', tagdata)
        data.append('createdBy', createdBy)
        data.append('createdAt', createdAt)
        data.append('modifiedBy', modifyByDialog)
        data.append('modifiedAt', modifyOnDialog)
        data.append('active', checked)

        if (imageUrl1 === '') {
            return
        }

        axios
            .put(
                `${config.base_url}/api/v1/purchaseProduct/${purchaseId}`,
                data
            )
            .then((res) => {
                if (res) {
                    getAlldata()
                    handleEditDialogClose()
                }
            })
            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const getSearchdata = () => {
        let data = {}
        data.productId = searchProduct
        data.venderEmail = searchVender
        data.custodian = searchCustodianId
        data.tag = searchTag
        data.srNo = searchSrNo

        axios
            .post(
                `${config.base_url}/api/v1/purchaseProduct/searchFilters`,
                data
            )

            .catch((error) => {
                console.log(error, 'error')
            })
    }

    const headers = [
        { label: 'Product Id', key: 'productId' },
        { label: 'Price', key: 'price' },
        { label: 'Quantity', key: 'quantity' },
        { label: 'Model', key: 'model' },
        { label: 'Office Id', key: 'officeId' },
        { label: 'Purchase Product Id', key: 'purchaseProductId' },
        { label: 'Purchase Order', key: 'purchaseOrder' },
        { label: 'Ownership', key: 'ownership' },
        { label: 'Date Of Purchase', key: 'dataOfPurchase' },
        { label: 'Vender Name', key: 'venderName' },
        { label: 'Vender Email', key: 'venderEmail' },
        { label: 'Vender Contact', key: 'venderContact' },
        { label: 'Sr No', key: 'srNo' },
        { label: 'Tag', key: 'tagNo' },
        { label: 'Active', key: 'active' },
        { label: 'Status', key: 'status' },
        { label: 'Modification Date', key: 'modifiedAt' },
        { label: 'Modified By', key: 'modifiedBy' },
        { label: 'Created By', key: 'createdBy' },
        { label: 'Creation Date', key: 'createdAt' },
    ]

    const [age, setAge] = React.useState('')

    const handleWingChange = (event) => {
        setAge(event.target.value)
    }

    //////demy data for the chips input value
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
      
        { title: 'City of God', year: 2002 },
        { title: 'Se7en', year: 1995 },
        { title: 'The Silence of the Lambs', year: 1991 },
        { title: "It's a Wonderful Life", year: 1946 },
        { title: 'Life Is Beautiful', year: 1997 },
        { title: 'The Usual Suspects', year: 1995 },
        { title: 'Léon: The Professional', year: 1994 },
        { title: 'Spirited Away', year: 2001 },
        { title: 'Saving Private Ryan', year: 1998 },
        { title: 'Once Upon a Time in the West', year: 1968 },
        { title: 'American History X', year: 1998 },
        { title: 'Interstellar', year: 2014 },
        { title: 'Casablanca', year: 1942 },
        { title: 'City Lights', year: 1931 },
        { title: 'Psycho', year: 1960 },
        { title: 'The Green Mile', year: 1999 },
        { title: 'The Intouchables', year: 2011 },
        { title: 'Modern Times', year: 1936 },
        { title: 'Raiders of the Lost Ark', year: 1981 },
        { title: 'Rear Window', year: 1954 },
        { title: 'The Pianist', year: 2002 },
        { title: 'The Departed', year: 2006 },
        { title: 'Terminator 2: Judgment Day', year: 1991 },
        { title: 'Back to the Future', year: 1985 },
        { title: 'Whiplash', year: 2014 },
        { title: 'Gladiator', year: 2000 },
        { title: 'Memento', year: 2000 },
        { title: 'The Prestige', year: 2006 },
        { title: 'The Lion King', year: 1994 },
        { title: 'Apocalypse Now', year: 1979 },
        { title: 'Alien', year: 1979 },
        { title: 'Sunset Boulevard', year: 1950 },
       
        { title: 'Once Upon a Time in America', year: 1984 },
        { title: 'Witness for the Prosecution', year: 1957 },
        { title: 'Das Boot', year: 1981 },
        { title: 'Citizen Kane', year: 1941 },
        { title: 'North by Northwest', year: 1959 },
        { title: 'Vertigo', year: 1958 },
       
      ];
    return (
        <>
            {openConfirmationDialog && (
                <ConfirmationDialog
                    open={openConfirmationDialog}
                    onConfirmDialogClose={() => {
                        setOpenConfirmationDialog(false)
                    }}
                    text={`Are you sure you want to delete this item?`}
                    title={`Are You Sure?`}
                    onYesClick={onDelhandler}
                />
            )}
            <Tooltip title="Search Items">
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
                    onClick={() => setSearchItemsDialog(true)}
                >
                    <SearchIcon />
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
                        top: '17vh',
                        position: 'fixed',
                    }}
                >
                    <CSVLink
                        filename={'all-purchased-items.csv'}
                        data={purchasedItems}
                        headers={headers}
                    >
                        <div style={{ marginTop: '8px' }}>
                            <SummarizeIcon />
                        </div>
                    </CSVLink>
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
                    Items Entry
                </Typography>
                <Grid container spacing={3}>
                    {purchasedItems
                        .slice(pagesVisited, pagesVisited + ItemsEntryPerPage)
                        .map((purchaseItem) => (
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
            </Container>

            <Dialog
                open={open}
                fullWidth={true}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'ADD ITEMS'}</DialogTitle>
                <DialogContent>
                    <br></br>

                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box sx={{ minWidth: 120 }}>
                                    <Autocomplete
                                        size="small"
                                        disablePortal
                                        id="combo-box-demo"
                                        options={product1}
                                        isOptionEqualToValue={(option, value) =>
                                            option._id === value._id
                                        }
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    label="Product"
                                                />
                                            )
                                        }}
                                        value={selectedProduct}
                                        onChange={(_event, product) => {
                                            setSelectedProduct(product)
                                        }}
                                    />
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
                                        handleModel(e, setModel, setModelError)
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
                                        handlePrice(e, setPrice, setPriceError)
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
                                    disabled={!checked}
                                    type={`number`}
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
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={statusValue}
                                            label="Status"
                                            onChange={handleStatusDialog}
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
                                            onChange={handleOfficeDialog}
                                        >
                                            {officeDialog.map((officeList) => {
                                                return (
                                                    <MenuItem
                                                        key={officeList._id}
                                                        value={officeList._id}
                                                    >
                                                        {officeList.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                        <FormHelperText>
                                            {officeNameError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <form className={myclass.container} noValidate>
                                    <TextField
                                        id="date"
                                        size="small"
                                        label="Date Of Purchase"
                                        type="date"
                                        value={dataOfPurchase}
                                        className={myclass.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={dateOfPurchaseError}
                                        helperText={
                                            dateOfPurchaseError === true
                                                ? 'Field Required'
                                                : ''
                                        }
                                        onChange={handlePurchasedDate}
                                    />
                                </form>
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
                                            label="OwnerShip"
                                            onChange={handleOwenerShipeDialog}
                                        >
                                            <MenuItem value={`PRAL`}>
                                                PRAL
                                            </MenuItem>
                                            <MenuItem value={`FBR`}>
                                                FBR
                                            </MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            {ownerShipError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box sx={{ minWidth: 120 }}>
                                    <Autocomplete
                                        size="small"
                                        disablePortal
                                        id="combo-box-demo"
                                        options={departments}
                                        filterSelectedOptions={true}
                                        isOptionEqualToValue={(option, value) =>
                                            option._id === value._id
                                        }
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    label="Department"
                                                />
                                            )
                                        }}
                                        value={selectedDepartment}
                                        onChange={(_event, department) => {
                                            setSelectedDepartment(department)
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            size="small"
                                        >
                                            Wing
                                        </InputLabel>
                                        <Select
                                            size="small"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            label="Wing"
                                            onChange={handleWingChange}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>
                                                Twenty
                                            </MenuItem>
                                            <MenuItem value={30}>
                                                Thirty
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <TextField
                                    type={`text`}
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
                            <Grid item lg={3} md={3} sm={3} xs={6}>
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
                            <Grid item lg={5} md={5} sm={5} xs={5}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            value={checked}
                                            onChange={handleChecked}
                                            inputProps={{
                                                'aria-label': 'controlled',
                                            }}
                                        />
                                    }
                                    label="Disable Serial Number"
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                {checked ? (
                                    <TextField
                                        disabled={checked}
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
                                        value={`N/A`}
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
                                ) : (
                                    <TextField
                                        disabled={checked}
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
                                )}
                            </Grid>
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={4}></Grid>
                        <Grid container spacing={2}>
                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                <Button
                                    className={classes.btn}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => generateQrCode()}
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





            {/* Search Items Dialog */}

            <Dialog
                open={searchItemsDialog}
                fullWidth={true}
                onClose={handleSearchDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    id="alert-dialog-title"
                >
                    <div>{'Search Filters'}</div>
                    <Tooltip title="Qr Search">
                        <div
                            style={{
                                borderRadius: '50%',
                            }}
                            onClick={() => {
                                setSearchByQrCode(true)
                            }}
                        >
                            <IconButton
                                color="primary"
                                aria-label="search"
                                size="large"
                            >
                                <QrCodeIcon />
                            </IconButton>
                        </div>
                    </Tooltip>
                </DialogTitle>
                <DialogContent >
                    <br></br>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Autocomplete
                                    ListboxProps={{
                                        style: { maxHeight: '13rem' },
                                        position: 'bottom-start',
                                    }}
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={product1}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                label="Product"
                                            />
                                        )
                                    }}
                                    value={searchProduct}
                                    onChange={(_event, product) => {
                                        setSearchProduct(product)
                                    }}
                                />
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Autocomplete
                                    ListboxProps={{
                                        style: { maxHeight: '13rem' },
                                        position: 'bottom-start',
                                    }}
                                    size="small"
                                    disablePortal
                                    id="combo-box-demo"
                                    options={purchasedItems}
                                    filterSelectedOptions={true}
                                    isOptionEqualToValue={(option, value) =>
                                        option._id === value._id
                                    }
                                    getOptionLabel={(option) =>
                                        `${option.venderName} / ${option.venderEmail}`
                                    }
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                label="Vender Name / Email"
                                            />
                                        )
                                    }}
                                    value={searchVender}
                                    onChange={(_event, vender) => {
                                        setSearchVender(vender)
                                    }}
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    id="name"
                                    label="Tag"
                                    placeholder="Tag"
                                    autoComplete="off"
                                    value={searchTag}
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
                        </Grid>
                        <br></br>
                        <Grid container spacing={3}>
                       
                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <TextField
                                    id="name"
                                    label="Serial Number"
                                    placeholder="Serial Number"
                                    autoComplete="off"
                                    value={searchSrNo}
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

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Box>
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
                                            value={searchStatus}
                                            label="Status"
                                            onChange={handlestatus}
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
                                            {statusError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>


                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <Box>
                                <FormControl
                                        size="small"
                                        fullWidth
                                        error={ownerShipError}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            OwnerShip Search
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={ownerShipSearch}
                                            label="Owner Ship"
                                            onChange={handleOwnerShipe}
                                        >
                                            <MenuItem value={`PRAL`}>
                                                PRAL
                                            </MenuItem>
                                            <MenuItem value={`FBR`}>
                                                FBR
                                            </MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            {ownerShipError === true
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
                                    value={purchaseOrderSearch}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            handlePurchasedOrderSearch,
                                            setPurchasedError
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={8} md={8} sm={8} xs={8}>
                                <Box>
                                    <Autocomplete
                                        ListboxProps={{
                                            style: { maxHeight: '8rem' },
                                            position: 'bottom-start',
                                        }}
                                        size="small"
                                        disablePortal
                                        id="combo-box-demo"
                                        options={custodienId}
                                        filterSelectedOptions={true}
                                        isOptionEqualToValue={(option, value) =>
                                            option._id === value._id
                                        }
                                        getOptionLabel={(option) =>
                                            `${option.employeeId} / ${option.name}`
                                        }
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    label="CustodianId / Name"
                                                />
                                            )
                                        }}
                                        value={searchCustodianId}
                                        onChange={(_event, custodianId) => {
                                            setSearchCustodianId(custodianId)
                                        }}
                                    />
                                </Box>
                            </Grid>
                             </Grid>
                             <br></br>
                            <Grid container spacing={3}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>

                             <Autocomplete
                            multiple
                            limitTags={2}
                            id="multiple-limit-tags"
                            options={top100Films}
                            getOptionLabel={(option) => option.title}
                           
                            renderInput={(params) => (
                                <TextField {...params} label="features suggestive" placeholder="features suggestive" />
                            )}
                            
                            />
                              
                            </Grid>
                       </Grid>
                            <br></br>
                            <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Box>
                            <Typography id="input-slider" gutterBottom>
                                Price Range
                            </Typography>
                            <Slider
                            aria-label="Custom marks"
                            defaultValue={0}
                            getAriaValueText={valuetext}
                            step={100}
                            min={0}
                            max={1000}
                            valueLabelDisplay="auto"
                            marks={marks}
                        />
                       
                          </Box>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Box>
                            <Typography id="input-slider" gutterBottom>
                            Quantity Range
                            </Typography>
                            <Slider
                            aria-label="Custom marks"
                            defaultValue={0}
                            getAriaValueText={valuetext}
                            step={100}
                            min={0}
                            max={1000}
                            valueLabelDisplay="auto"
                            marks={marks}
                        />
                          </Box>
                            </Grid>
                          </Grid>
                             <br></br>
                            <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Typography gutterBottom>Start Date</Typography>
                            <TextField
                                value={sdate}
                                id="date"
                                label="Start Date"
                                type="date"
                                onChange={(e) => setSdate(e.target.value)}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                            <Typography gutterBottom>End Date</Typography>
                            <TextField
                                value={sdate1}
                                id="date"
                                label="End Date"
                                type="date"
                                onChange={(e) => setSdate1(e.target.value)}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                       
                            </Grid>
                           
                    </CardContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseClick}>Cancel</Button>
                    <Button autoFocus onClick={getSearchdata}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={searchByQrCode}
                fullWidth={true}
                onClose={() => setSearchByQrCode(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    id="alert-dialog-title"
                >
                    <div>{'Search By Qr Code'}</div>
                </DialogTitle>
                <DialogContent>
                    <br></br>
                    <CardContent>
                        <Grid container>
                            <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
                                <h3>Qr Code Scan by Web Cam</h3>
                                <QrReader
                                    delay={300}
                                    style={{ width: '100%' }}
                                    onError={handleErrorWebCam}
                                    onScan={handleScanWebCam}
                                />
                                <h3>
                                    Scanned By WebCam Code: {scanResultWebCam}
                                </h3>
                            </Grid>
                        </Grid>
                        <br></br>
                    </CardContent>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setSearchByQrCode(false)
                            setSearchItemsDialog(false)
                        }}
                    >
                        Cancel
                    </Button>
                    <Button autoFocus onClick={() => {}}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={handleEditDialog}
                fullWidth={true}
                onClose={handleEditDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'EDIT ITEMS'}
                </DialogTitle>
                <DialogContent>
                    <br></br>

                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box sx={{ minWidth: 120 }}>
                                    <Autocomplete
                                        size="small"
                                        disablePortal
                                        id="combo-box-demo"
                                        options={product1}
                                        isOptionEqualToValue={(option, value) =>
                                            option._id === value._id
                                        }
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    label="Product"
                                                />
                                            )
                                        }}
                                        value={selectedProduct}
                                        onChange={(_event, product) => {
                                            setSelectedProduct(product._id)
                                        }}
                                    />
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
                                        handleModel(e, setModel, setModelError)
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
                                        handlePrice(e, setPrice, setPriceError)
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
                                    disabled={!checked}
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
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={statusValue}
                                            label="Status"
                                            onChange={handleStatusDialog}
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
                                            onChange={handleOfficeDialog}
                                        >
                                            {officeDialog.map((officeList) => {
                                                return (
                                                    <MenuItem
                                                        key={officeList._id}
                                                        value={officeList._id}
                                                    >
                                                        {officeList.name}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                        <FormHelperText>
                                            {officeNameError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item lg={4} md={4} sm={4} xs={4}>
                                <form className={myclass.container} noValidate>
                                    <TextField
                                        id="date"
                                        size="small"
                                        label="Date Of Purchase"
                                        type="date"
                                        value={dataOfPurchase}
                                        className={myclass.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={dateOfPurchaseError}
                                        helperText={
                                            dateOfPurchaseError === true
                                                ? 'Field Required'
                                                : ''
                                        }
                                        onChange={handlePurchasedDate}
                                    />
                                </form>
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
                                    value={userName}
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
                                    value={moment(createdAt).format('LL')}
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
                                            : userName
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
                                            : moment(modifyOnDialog).format(
                                                  'LL'
                                              )
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
                                            label="Owner Ship"
                                            onChange={handleOwenerShipeDialog}
                                        >
                                            <MenuItem value={`PRAL`}>
                                                PRAL
                                            </MenuItem>
                                            <MenuItem value={`FBR`}>
                                                FBR
                                            </MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            {ownerShipError === true
                                                ? 'Field Required'
                                                : ''}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item lg={4} md={4} sm={4} xs={6}>
                                <Box sx={{ minWidth: 120 }}>
                                    <Autocomplete
                                        // ListboxProps={{
                                        //     style: { maxHeight: '4rem' },
                                        //     position: 'bottom-start',
                                        // }}
                                        size="small"
                                        disablePortal
                                        id="combo-box-demo"
                                        options={departments}
                                        filterSelectedOptions={true}
                                        isOptionEqualToValue={(option, value) =>
                                            option._id === value._id
                                        }
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => {
                                            return (
                                                <TextField
                                                    {...params}
                                                    label="Department"
                                                />
                                            )
                                        }}
                                        value={selectedDepartment}
                                        onChange={(_event, department) => {
                                            setSelectedDepartment(department)
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel
                                            id="demo-simple-select-label"
                                            size="small"
                                        >
                                            Wing
                                        </InputLabel>
                                        <Select
                                            size="small"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            label="Wing"
                                            onChange={handleWingChange}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>
                                                Twenty
                                            </MenuItem>
                                            <MenuItem value={30}>
                                                Thirty
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                                <TextField
                                    type={`text`}
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
                            <Grid item lg={4} md={4} sm={4} xs={4}>
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
                            <Grid item lg={5} md={5} sm={5} xs={5}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            value={checked}
                                            onChange={handleChecked}
                                            inputProps={{
                                                'aria-label': 'controlled',
                                            }}
                                        />
                                    }
                                    label="Disable Serial Number"
                                />
                            </Grid>
                            <Grid item lg={7} md={7} sm={7} xs={7}>
                                <TextField
                                    disabled={checked}
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
                                    value={srno}
                                    size="small"
                                    onChange={(e) =>
                                        handleChange(e, setSrNo, setSrNoError)
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <Grid item lg={4} md={4} sm={4} xs={4}></Grid>
                        <Grid container spacing={2}>
                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                <Button
                                    className={classes.btn}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => generateQrCode()}
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose}>Cancel</Button>
                    <Button autoFocus onClick={handleEdit}>
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

export default PurchasedItems
