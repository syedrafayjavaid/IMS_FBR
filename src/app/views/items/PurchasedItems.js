
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';


import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

//////
import { Container, Stack, Typography, Grid } from '@mui/material';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState, useRef } from 'react';


import { makeStyles } from '@material-ui/core/styles';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Switch from '@mui/material/Switch';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Card, CardContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/system'
import axios from 'axios';
import PurchaseItemCard from './PurchaseItemCard';
import { number } from 'prop-types';
import { Model } from 'echarts';
import config from 'config';

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
}));

//datepicker

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
  display: "flex",

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
});


function valuetext(value) {
  return `${value}°C`;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
];
//brand
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const brands = [
  ' Hansen',
  ' Henry',
  'Tucker',
  'Hubbard',

];

function getBrand(brand, brandName, themes) {
  return {
    fontWeight:
      brandName.indexOf(brand) === -1
        ? themes.typography.fontWeightRegular
        : themes.typography.fontWeightMedium,
  };
}

//status
const status = [
  ' Hansen',
  ' Henry',
  'Tucker',
  'Hubbard',

];

function getStatu(statu, statuName, themestatus) {
  return {
    fontWeight:
      statuName.indexOf(statu) === -1
        ? themestatus.typography.fontWeightRegular
        : themestatus.typography.fontWeightMedium,
  };
}
//
const offices = [
  ' Hansen',
  ' Henry',
  'Tucker',
  'Hubbard',

];
function getoffice(office, officeName, themesoffice) {
  return {
    fontWeight:
      officeName.indexOf(office) === -1
        ? themesoffice.typography.fontWeightRegular
        : themesoffice.typography.fontWeightMedium,
  };
}

const PurchasedItems = () => {
  const theme = useTheme();
  const themes = useTheme();
  const themestatu = useTheme();
  const themesoffice = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [brandName, setBrandName] = React.useState([]);
  const [statuName, setStatuName] = React.useState([]);
  const [value, setValue] = React.useState([20, 37]);
  const [officeName, setOfficeName] = React.useState([]);


  const [imageUrl, setImageUrl] = React.useState('');
  const [text, setText] = React.useState('');


  // Form validation errors State Setting 
  const [nameError, setNameError] = React.useState(false);
  const [productQuantityError, setProductQuantityError] = React.useState(false)
  const [stockError, setstockError] = React.useState(false);
  const [categoryError, setcategoryError] = React.useState(false);
  const [subCategoryError, setsubCategoryError] = React.useState(false);
  const [costError, setcostError] = React.useState(false);
  const [saleError, setsaleError] = React.useState(false);
  const [colourError, setColourError] = React.useState(false);
  const [brandError, setBrandError] = React.useState(false);
  const [descriptionError, setdescriptionError] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [modelError, setModelError] = React.useState(false);

  // Setting States 
  const [name, setName] = React.useState('');
  const [quantity, setQuantity] = React.useState([]);
  const [productQuantity, setProductQuantity] = React.useState('')
  const [pcost, setPcost] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [productId, setproductId] = React.useState('');
  const [product, setProduct] = React.useState([]);
  const [subCategory, setSubCategory] = React.useState('');
  const [color, setColor] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [purchaseOrder, setPurchaseOrder] = React.useState('');
  const [image, setImage] = React.useState('');
  const [QRCodeImage, setQRCodeImage] = React.useState('');
  const [categoryData, setCategoryData] = React.useState({});
  const [subcategoryData, setSubcategoryData] = React.useState({});
  const [product1, setProduct1] = React.useState([])
  const myclass = dateStyles();
  ///
  //API For the dialogbox
  const [purchaseBy, setPurchaseBy] = React.useState([]);
  const [PurchaseBy1, setPurchaseBy1] = React.useState('');
  ///dialog state
  const [model, setModel] = React.useState('');

  // web came code 

  const [text1, setText1] = useState('');
  const [imageUrl1, setImageUrl1] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const classes = useStyles();
  const qrRef = useRef(null);

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
  const [vender, setVender] = React.useState('')
  const [dataOfPurchase, setDateOfPurchase] = React.useState('')
  const [user, setUser] = React.useState('')
  const [purchaseId, setPurchaseId] = React.useState('')
  const [handleEditDialog, setHandleEditDialog] = React.useState(false);

  const generateQrCode = async () => {

    try {
      const response = await QRCode.toDataURL(text1);
      setImageUrl1(response);
    } catch (error) {
      console.log(error);
    }
  }
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  }



  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const handleChange = (e, func, errorFunc) => {
    func(e.target.value);
    console.log(e.target.name, e.target.value)
    errorFunc(false)
  }


  // const handleModel = (e, func, errorFunc) => {
  //   func(e.target.value);
  //   console.log(e.target.model, e.target.value)
  //   errorFunc(false)
  // }


  const handleType = (event) => {
    console.log(quantity, "event");
    setQuantity(event.target.value);
  };

  const handleProduct = (event) => {
    console.log(event.target, 'rula');
    setproductId(event.target.value);
  };
  const handleModel = (event) => {
    console.log(event.target.value, 'rula');
    setModel(event.target.value);
  };

  const handlePrice = (event) => {
    console.log(event.target.value, 'rula');
    setPrice(event.target.value);
  };

  const handleStatusDialog = (event) => {
    console.log(event.target.value, 'rula');
    setStatusValue(event.target.value);
  };

  const handleOfficeDialog = (event) => {
    console.log(event.target.value, 'rula');
    setOfficeNameList(event.target.value);
  };


  const handlePurchasedDialog = (event) => {
    console.log(event.target.value, 'rula');
    setPurchaseBy1(event.target.value);
  };

  const handleCustomerDialog = (event) => {

    setUser(event.target.value);
  };

  // const handleCreatedByDialog = (event) => {
  //   console.log(event.target.value,'CreatedBy');
  //   setCreatedBy(event.target.value);
  // };
  // const handleCreatedOnDialog = (event) => {
  //   console.log(event.target.value,'CreatedAt');
  //   setCreatedAt(event.target.value);
  // };
  // const handleModifyByDialog = (event) => {
  //   console.log(event.target,'rula');
  //   setModifyByDialog(event.target.value);
  // };
  // const handleModifyOnDialog = (event) => {
  //   console.log(event.target,'rula');
  //   setModifyOnDialog(event.target.value);
  // };
  const handleOwenerShipeDialog = (event) => {
    console.log(event.target.value, 'owenerShip');
    setOwnerShip(event.target.value);
  };
  const handleVender = (event) => {
    console.log(event.target.value, 'vender text value');
    setVender(event.target.value);
  };
  const handlePurchasedDate = (event) => {
    console.log(event.target.value, 'vender text value');
    setDateOfPurchase(event.target.value);
  };
  //   const attachment = (e) => {
  //     attachment(e.target.files)
  //     console.log(e.target.files[0], 'image upload')
  // }

  const handlePhoto = (event) => {
    console.log(event.target.files[0], 'handle the photo');
    setImage(event.target.files);
  };
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditDialogClose = () => {
    setHandleEditDialog(false);
  };
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
    getAlldata();
  }, []);
  const getAlldata = () => {
    axios.get('http://192.168.18.117:5000/api/v1/products').then((res) => {
      // console.log(res.data.data);

      setProduct1(res.data.data);
      console.log(product1, 'setProduct1');
    }).catch((error) => {
      // console.log(error, 'error');
    })

    //product name fetch from the api

    axios.get('http://192.168.18.117:5000/api/v1/productType').then((res) => {
      ;
      setProduct(res.data.data);

    }).catch((error) => {

    })
    axios.get('http://192.168.18.117:5000/api/v1/office').then((res) => {
      console.log(res.data.data);
      setOfficeDialog(res.data.data);
      console.log(model, 'model___model');
    }).catch((error) => {
      console.log(error, 'error');
    })
    axios.get('http://192.168.18.117:5000/api/v1/auth/allUsers').then((res) => {
      console.log(res.data.data);
      setCustodienId(res.data.data);

      console.log(res.data.data, "res.data.data customer data");
    }).catch((error) => {
      console.log(error, 'error');
    })
    //customker by name

    axios.get('http://192.168.18.117:5000/api/v1/employee').then((res) => {
      const data = res.data.data;
      const canPurchase = [];
      var purcahedTrue = data.map((item) => {
        if (item.purchase == true) {

          canPurchase.push(item);
        }
      });
      setPurchaseBy(canPurchase);

    }).catch((error) => {
      console.log(error, 'error');
    })
    axios.get('http://192.168.18.117:5000/api/v1/purchaseProduct').then((res) => {
      console.log(res.data.data);
      setPurchasedItems(res.data.data);
      //  console.log(purchaseBy, 'Purchase of the data');
    }).catch((error) => {
      console.log(error, 'error');
    })
  }




  ///this is the  api of the text fileds data send to the next data
  const createHandler = () => {
    let data = new FormData();

    data.append('productId', productId);
    data.append('price', price);
    data.append('dataOfPurchase', dataOfPurchase);
    data.append('ownership', ownerShip);
    data.append('officeId', officeNameList);
    data.append('status', statusValue);
    data.append('PurchaseBy', PurchaseBy1);
    data.append('vender', vender);
    data.append('attachment', image);
    data.append('QRCodeImage', imageUrl1);
    data.append('custodian', user);
    data.append('model', model);
    data.append('purchaseOrder', purchaseOrder);
    data.append('quantity', productQuantity);
    data.append('QRCode', text1)
    // console.log(scanResultFile);


    axios.post('http://192.168.18.117:5000/api/v1/purchaseProduct', data).then((res) => {
      console.log(res.data.data, "purchaseProduct ");
      if (res) {
        // handleCreateClose()
        getAlldata();
        setOpen(false);
      }
      setStatusValue('')

      setproductId('');
      setPrice('');
      setDateOfPurchase('');
      setOwnerShip('');
      setOfficeNameList('');
      setPurchaseBy1('');
      setVender('');
      setImage('');
      setImageUrl1('');
      setUser('');
      setModel('');
      setText1('');


    }).catch((error) => {
      console.log(error, 'error');
      // handleClick()
    })
  }



  //////
  //error handling 
  // const handleCreateClickOpen = () => {
  //   if (createModel === '' || createOffice === '' || Price === '' || createVender === '' || createEmployeeId === '') {
  //     if (createName === '') {
  //       setCreateNameError(true)
  //     }
  //     if (createOffice === '') {
  //       setCreateOfficeError(true)
  //     }
  //     if (createCnic === '') {
  //       setCreateCnicError(true)
  //     }
  //     if (createDescription === '') {
  //       setCreateDescriptionError(true)
  //     }
  //     if (createEmployeeId === '') {
  //       setCreateEmployeeIdError(true)
  //     }
  //   } else {
  //     createHandler()
  //   }
  // }

  //aboue the send the api data of the text fileds data

  const checking = () => {
    //   if(imge){
    //     let data = new FormData();
    //     data.append('file', imge);
    //     data.append('name', category);
    //     data.append('modifiedBy', modifiedBy);
    //     data.append('createdBy', createdBy);
    //     console.log(data.value, 'data');
    //     axios.post('http://192.168.18.117:5000/api/v1/products ', data).then((res) => {
    //       console.log(res.data.data);
    //       if(res){
    //         handleClose()
    //         getAlldata();
    //       }
    //     }).catch((error) => {
    //       console.log(error, 'error');
    //       handleClick()
    //     })
    //   }
    //   else{
    //     let data = new FormData();
    //     data.append('name', category);
    //     axios.put(`http://192.168.18.117:5000/api/v1/products/${idCategory}`, data).then((res) => {
    //       console.log(res.msg);
    //       if (res) {
    //         getAlldata();
    //         handleClose()
    //       //  console.log("hello console");
    //       }
    //     }).catch((error) => {
    //       console.log(error, 'error');
    //       console.log("hello console");
    //       handleClick()
    //     })
    //   }
  }




  const onDelhandler = (editData) => {
    console.log(editData, 'id');
    axios.delete(`${config.base_url}/api/v1/purchaseProduct/${editData}`).then((res) => {
      console.log(res.msg);
      getAlldata();


    }).catch((error) => {
      console.log(error, 'error');
    })
  }



  const onEdithandler = (id, purchaseItem) => {
    setPurchaseId(id)

    setHandleEditDialog(true)

    setStatusValue(purchaseItem.status)

    setproductId(purchaseItem.productId);
    setPrice(purchaseItem.price);
    setDateOfPurchase(purchaseItem.dataOfPurchase);
    setOwnerShip(purchaseItem.ownership);
    setOfficeNameList(purchaseItem.officeId);
    setPurchaseBy1(purchaseItem.PurchaseBy);
    setVender(purchaseItem.vender);
    setImage(purchaseItem.image);
    setImageUrl1(purchaseItem.QRCodeImage);
    setUser(purchaseItem.custodian);
    setModel(purchaseItem.model);
    setPurchaseOrder(purchaseItem.purchaseOrder);
    setProductQuantity(purchaseItem.quantity);
    setText1(purchaseItem.QRCode);

    // setOpen(true)
    // console.log(editDataId, 'id');
    // console.log(editDataName,'editDataName');
    // setCategory(editDataName)
    // setImage('');
    // setIdCategory(editDataId)
    // console.log(`http://192.168.18.117:5000/api/v1/products/${editDataId}`);
  }



  const navigate = useNavigate()



  //card set
  ////
  const handleBox = (event, newValue) => {
    setValue(newValue);
  };

  const handleChan = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleBrand = (event) => {
    const {
      target: { value },
    } = event;
    setBrandName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  const handleStatus = (event) => {
    const {
      target: { value },
    } = event;
    setStatuName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  ///office

  const offceChange = (event) => {
    const {
      target: { value },
    } = event;
    setOfficeName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const editHandler = () => {
    let data = new FormData();
    data.append('productId', productId);
    data.append('price', price);
    data.append('dataOfPurchase', dataOfPurchase);
    data.append('ownership', ownerShip);
    data.append('officeId', officeNameList);
    data.append('status', statusValue);
    data.append('PurchaseBy', PurchaseBy1);
    data.append('vender', vender);
    data.append('attachment', image);
    data.append('QRCodeImage', imageUrl1);
    data.append('custodian', user);
    data.append('purchaseOrder', purchaseOrder);
    data.append('model', model);
    data.append('quantity', productQuantity);
    data.append('QRCode', text1);

    axios.put(`${config.base_url}/api/v1/purchaseProduct/${purchaseId}`, data).then((res) => {
      console.log(res.msg);
      if (res) {
        getAlldata();
        // handleEditClose()
      }

    }).catch((error) => {
      console.log(error, 'error');
    })
  }



  return (
    <>
      <Card >
        <Typography variant="h4" sx={{ mb: 5 }}>
          {/* Search Items */}
        </Typography>
        <Card style={{ marginTop: "4" }}>

          {/* <FormControl sx={{ m: 1, width: 250 }}>
       
        <InputLabel id="demo-multiple-name-label">Category</InputLabel>
      
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChan}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}

          {/* <FormControl sx={{ m: 1, width: 250 }}>
       
        <InputLabel id="demo-multiple-name-label">Brand</InputLabel>
      
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={brandName}
          onChange={handleBrand}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {brands.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getBrand(name, brandName, themes)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}

          {/* <FormControl sx={{ m: 1, width: 250 }}>
       
        <InputLabel id="demo-multiple-name-label">Status</InputLabel>
      
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={statuName}
          onChange={handleStatus}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {status.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStatu(name, statuName, themestatu)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}

          {/* <FormControl sx={{ m: 1, width: 250 }}>
        <InputLabel id="demo-multiple-name-label">Office</InputLabel>
      
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={officeName}
          onChange={offceChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {offices.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, officeName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}


          {/* <FormControl sx={{ m: 1, width: 250 }}>
     <InputLabel id="demo-multiple-name-label">Price</InputLabel>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleBox}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
     </FormControl> */}
          {/* <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleBox}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box> */}

        </Card>

        <Tooltip title="Add Items">
          <Fab color="secondary" aria-label="Add" size="medium" style={{ zIndex: 999, right: "4vw", bottom: "8vh", position: "fixed" }} onClick={() => setOpen(true)} >
            <AddIcon />
          </Fab>
        </Tooltip>

        {/* <Tooltip title="Search Items">
        <Fab color="primary" aria-label="Add" size="medium"   style={{zIndex:999,right:"4vw",bottom:"17vh",position:"fixed"}} onClick={() => setOpen(true)}>
                <SearchIcon />
            </Fab>
        </Tooltip>
    */}

        <Container>
          <br></br>
          <Typography variant="h4" sx={{ mb: 5 }}>
            PURCHASE ITEMS
          </Typography>
          <Grid container spacing={3} >
            {/* <ProductTypeCard/>
          <ProductCard/> */}
            {purchasedItems.map((purchaseItem) => (
              <Grid key={purchaseItem._id} item xs={12} sm={6} md={3}>

                <PurchaseItemCard purchaseItem={purchaseItem} onDelete={onDelhandler} onEdit={onEdithandler} />

              </Grid>
            ))}
          </Grid>
          <br></br>
          <br></br>
          <br></br>
        </Container>

        {/* this the data fetch on the purchase items on the dialogbox data */}



      </Card>


      <Dialog
        open={open}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"PURCHASE ITEMS"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <br></br>

            <CardContent>


              <Grid container spacing={3}>

                <Grid item lg={4} md={4} sm={4} xs={6}  >


                  <Box sx={{ minWidth: 120 }}>
                    <FormControl size="small" fullWidth>
                      <InputLabel id="demo-simple-select-label">Product</InputLabel>
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
                                value={productList._id}
                              >
                                {
                                  productList.name
                                }
                              </MenuItem>
                            )
                          }
                        )}
                      </Select>
                    </FormControl>
                  </Box>

                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={6}  >

                  <TextField
                    error={nameError}
                    id="name"
                    label="Model"
                    placeholder="Model"
                    autoComplete="off"
                    helperText={nameError === true ? "Field Required" : ''}
                    value={model}
                    size="small"
                    onChange={(e) => handleModel(e, setModel, setNameError)}
                    variant="outlined"
                    fullWidth

                  />


                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={6}  >

                  <TextField
                    error={nameError}
                    id="name"
                    label="Price"
                    placeholder="Price"
                    autoComplete="off"
                    helperText={nameError === true ? "Field Required" : ''}
                    value={price}
                    size="small"
                    onChange={(e) => handlePrice(e, setPrice, setNameError)}
                    variant="outlined"
                    fullWidth

                  />



                </Grid>







              </Grid>
              <br></br>
              <Grid container spacing={3}>

                <Grid item lg={4} md={4} sm={4} xs={4}  >


                  <TextField
                    error={nameError}
                    id="name"
                    label="Purchase Order(PO)"
                    placeholder="Purchase Order(PO)"
                    autoComplete="off"
                    helperText={nameError === true ? "Field Required" : ''}
                    value={purchaseOrder}
                    size="small"
                    onChange={(e) => handleChange(e, setPurchaseOrder, setNameError)}
                    variant="outlined"
                    fullWidth

                  />



                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={4}  >


                  <TextField
                    error={productQuantityError}
                    id="name"
                    label="Product Quantity"
                    placeholder="Product Quantity"
                    autoComplete="off"
                    helperText={productQuantityError === true ? "Field Required" : ''}
                    value={productQuantity}
                    size="small"
                    onChange={(e) => handleChange(e, setProductQuantity, setProductQuantityError)}
                    variant="outlined"
                    fullWidth

                  />


                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={6} style={{ justifyContent: "center", marginLeft: "0px" }}  >
                  <Box>
                    {/* <span>Active</span>
                <Switch {...label} defaultChecked />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}

                    <label htmlFor="contained-button-file">
                      <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handlePhoto} />
                      <Button variant="contained" component="span" startIcon={<AddAPhotoIcon />} style={{ width: '100%' }}>
                        Upload
                      </Button>
                    </label>
                  </Box>


                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={4}  >


                  <Box sx={{ minWidth: 120 }}>
                    <FormControl size="small" fullWidth>
                      <InputLabel id="demo-simple-select-label">Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={statusValue}
                        label="Status"
                        onChange={handleStatusDialog}

                      >

                        <MenuItem value={`inuse`}>Inuse</MenuItem>
                        <MenuItem value={`replacement`}>Replacement</MenuItem>
                        <MenuItem value={`scrap`}>Scrap</MenuItem>

                      </Select>
                    </FormControl>
                  </Box>

                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={4}  >


                  <Box sx={{ minWidth: 120 }}>
                    <FormControl size="small" fullWidth>
                      <InputLabel id="demo-simple-select-label">Office</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={officeNameList}
                        label="Office"
                        onChange={handleOfficeDialog}

                      >
                        {officeDialog.map(
                          (officeList) => {
                            return (
                              <MenuItem
                                value={officeList._id}
                              >
                                {
                                  officeList.name
                                }
                              </MenuItem>
                            )
                          }
                        )}
                      </Select>
                    </FormControl>
                  </Box>

                </Grid>


                <Grid item lg={4} md={4} sm={4} xs={4}  >



                  <form className={myclass.container} noValidate>
                    <TextField
                      id="date" size='small'
                      label="Date Of Purchase"
                      type="date"
                      value={dataOfPurchase}
                      defaultValue="2017-05-24"
                      className={myclass.textField}
                      InputLabelProps={{
                        shrink: true,

                      }}
                      onChange={handlePurchasedDate}
                    />
                  </form>


                </Grid>


                <Grid item lg={4} md={4} sm={4} xs={4}  >


                  <Box sx={{ minWidth: 120 }}>
                    <FormControl size="small" fullWidth>
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
                    </FormControl>
                  </Box>

                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={4}  >


                  <Box sx={{ minWidth: 120 }}>
                    <FormControl size="small" fullWidth>
                      <InputLabel id="demo-simple-select-label">Customer Emp ID</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user}
                        label="Customer Emp ID"
                        onChange={handleCustomerDialog}

                      >
                        {custodienId.map(
                          (employee) => {
                            return (
                              <MenuItem
                                value={employee._id}
                              >
                                {
                                  employee.employeeId
                                }
                              </MenuItem>
                            )
                          }
                        )}
                      </Select>
                    </FormControl>
                  </Box>

                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={4}  >


                  <Box sx={{ minWidth: 145 }}>
                    <FormControl size="small" fullWidth>
                      <InputLabel id="demo-simple-select-label">OwnerShip</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ownerShip}
                        label="Customer Emp ID"
                        onChange={handleOwenerShipeDialog}

                      >
                        <MenuItem value={`PRAL`}>PRAL</MenuItem>
                        <MenuItem value={`FBR`}>FBR</MenuItem>

                      </Select>
                    </FormControl>
                  </Box>

                </Grid>

              </Grid>
              <br></br>


              {/* this is the qr code of the PRAL */}

              <Grid container spacing={3}>


                {/* <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <TextField label="Enter Text Here" onChange={(e) => setText(e.target.value)} />
              <Button variant="contained"
                color="primary" onClick={() => generateQrCode()}>Generate</Button>
              <br />
              <br />
              <br />
              {imageUrl ? (
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="img" />
                </a>) : null}
            </Grid> */}

                <Grid item lg={4} md={4} sm={4} xs={4}  >
                </Grid>


                <Grid container spacing={2}>
                  <Grid item xl={4} lg={4} md={6} sm={12} xs={12} >
                    <TextField label="Enter Text Here" onChange={(e) => setText1(e.target.value)} style={{ marginLeft: '24px' }} />
                    <Button className={classes.btn} variant="contained"
                      color="primary" onClick={() => generateQrCode()} style={{ marginLeft: '24px' }}>Generate</Button>
                    <br></br>
                    {imageUrl1 ? (
                      <a href={imageUrl1} download>
                        <img src={imageUrl1} alt="img" style={{ marginLeft: '24px' }} />
                      </a>) : null}
                  </Grid>
                  {/* <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                      <Button className={classes.btn} variant="contained" color="secondary" onClick={onScanFile}>Upload QRCode</Button>
                      <QrReader
                        ref={qrRef}
                        delay={300}
                        style={{width: '100%'}}
                        onError={handleErrorFile}
                        onScan={handleScanFile}
                        legacyMode
                      />
                      <h3>Code: {scanResultFile}</h3>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                       <h3>Qr:</h3>
                       <QrReader
                       delay={300}
                       style={{width: '100%'}}
                       onError={handleErrorWebCam}
                       onScan={handleScanWebCam}
                       />
                       <h3>Code: {scanResultWebCam}</h3>
                    </Grid> */}
                </Grid>




                <Grid item lg={4} md={4} sm={4} xs={6}  >

                  <TextField style={{ "width": "514px" }}
                    error={nameError}
                    id="name"
                    label="Vendor"
                    placeholder="Vendor"
                    autoComplete="off"
                    helperText={nameError === true ? "Field Required" : ''}
                    value={vender}
                    size="small"
                    onChange={(e) => handleVender(e, setVender, setNameError)}
                    variant="outlined"
                    fullWidth

                  />

                </Grid>
              </Grid>


            </CardContent>




          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button autoFocus onClick={() => {

            createHandler();
          }}>
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
          {"EDIT PURCHASE ITEMS"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <br></br>

            <CardContent>


              <Grid container spacing={3}>

                <Grid item lg={4} md={4} sm={4} xs={6}  >


                  <Box sx={{ minWidth: 120 }}>
                    <FormControl size="small" fullWidth>
                      <InputLabel id="demo-simple-select-label">Product</InputLabel>
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
                                value={productList._id}
                              >
                                {
                                  productList.name
                                }
                              </MenuItem>
                            )
                          }
                        )}
                      </Select>
                    </FormControl>
                  </Box>

                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={6}  >

                  <TextField
                    error={nameError}
                    id="name"
                    label="Model"
                    placeholder="Model"
                    autoComplete="off"
                    helperText={nameError === true ? "Field Required" : ''}
                    value={model}
                    size="small"
                    onChange={(e) => handleModel(e, setModel, setNameError)}
                    variant="outlined"
                    fullWidth

                  />


                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={6}  >

                  <TextField
                    error={nameError}
                    id="name"
                    label="Price"
                    placeholder="Price"
                    autoComplete="off"
                    helperText={nameError === true ? "Field Required" : ''}
                    value={price}
                    size="small"
                    onChange={(e) => handlePrice(e, setPrice, setNameError)}
                    variant="outlined"
                    fullWidth

                  />



                </Grid>







              </Grid>
              <br></br>
              <Grid container spacing={3}>

                <Grid item lg={4} md={4} sm={4} xs={4}  >


                  <TextField
                    error={nameError}
                    id="name"
                    label="Purchase Order(PO)"
                    placeholder="Purchase Order(PO)"
                    autoComplete="off"
                    helperText={nameError === true ? "Field Required" : ''}
                    value={purchaseOrder}
                    size="small"
                    onChange={(e) => handleChange(e, setPurchaseOrder, setNameError)}
                    variant="outlined"
                    fullWidth

                  />



                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={4}  >


                  <TextField
                    error={productQuantityError}
                    id="name"
                    label="Product Quantity"
                    placeholder="Product Quantity"
                    autoComplete="off"
                    helperText={productQuantityError === true ? "Field Required" : ''}
                    value={productQuantity}
                    size="small"
                    onChange={(e) => handleChange(e, setProductQuantity, setProductQuantityError)}
                    variant="outlined"
                    fullWidth

                  />


                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={6} style={{ justifyContent: "center", marginLeft: "0px" }}  >
                  <Box>
                    {/* <span>Active</span>
                <Switch {...label} defaultChecked />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}

                    <label htmlFor="contained-button-file">
                      <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handlePhoto} />
                      <Button variant="contained" component="span" startIcon={<AddAPhotoIcon />} style={{ width: '100%' }}>
                        Upload
                      </Button>
                    </label>
                  </Box>


                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={4}  >


                  <Box sx={{ minWidth: 120 }}>
                    <FormControl size="small" fullWidth>
                      <InputLabel id="demo-simple-select-label">Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={statusValue}
                        label="Status"
                        onChange={handleStatusDialog}

                      >

                        <MenuItem value={`inuse`}>Inuse</MenuItem>
                        <MenuItem value={`replacement`}>Replacement</MenuItem>
                        <MenuItem value={`scrap`}>Scrap</MenuItem>

                      </Select>
                    </FormControl>
                  </Box>

                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={4}  >


                  <Box sx={{ minWidth: 120 }}>
                    <FormControl size="small" fullWidth>
                      <InputLabel id="demo-simple-select-label">Office</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={officeNameList}
                        label="Office"
                        onChange={handleOfficeDialog}

                      >
                        {officeDialog.map(
                          (officeList) => {
                            return (
                              <MenuItem
                                value={officeList._id}
                              >
                                {
                                  officeList.name
                                }
                              </MenuItem>
                            )
                          }
                        )}
                      </Select>
                    </FormControl>
                  </Box>

                </Grid>


                <Grid item lg={4} md={4} sm={4} xs={4}  >



                  <form className={myclass.container} noValidate>
                    <TextField
                      id="date" size='small'
                      label="Date Of Purchase"
                      type="date"
                      value={dataOfPurchase}
                      defaultValue="2017-05-24"
                      className={myclass.textField}
                      InputLabelProps={{
                        shrink: true,

                      }}
                      onChange={handlePurchasedDate}
                    />
                  </form>


                </Grid>


                <Grid item lg={4} md={4} sm={4} xs={4}  >


                  <Box sx={{ minWidth: 120 }}>
                    <FormControl size="small" fullWidth>
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
                    </FormControl>
                  </Box>

                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={4}  >


                  <Box sx={{ minWidth: 120 }}>
                    <FormControl size="small" fullWidth>
                      <InputLabel id="demo-simple-select-label">Customer Emp ID</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user}
                        label="Customer Emp ID"
                        onChange={handleCustomerDialog}

                      >
                        {custodienId.map(
                          (employee) => {
                            return (
                              <MenuItem
                                value={employee._id}
                              >
                                {
                                  employee.employeeId
                                }
                              </MenuItem>
                            )
                          }
                        )}
                      </Select>
                    </FormControl>
                  </Box>

                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={4}  >


                  <Box sx={{ minWidth: 145 }}>
                    <FormControl size="small" fullWidth>
                      <InputLabel id="demo-simple-select-label">OwnerShip</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ownerShip}
                        label="Customer Emp ID"
                        onChange={handleOwenerShipeDialog}

                      >
                        <MenuItem value={`PRAL`}>PRAL</MenuItem>
                        <MenuItem value={`FBR`}>FBR</MenuItem>

                      </Select>
                    </FormControl>
                  </Box>

                </Grid>

              </Grid>
              <br></br>


              {/* this is the qr code of the PRAL */}

              <Grid container spacing={3}>


                {/* <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <TextField label="Enter Text Here" onChange={(e) => setText(e.target.value)} />
              <Button variant="contained"
                color="primary" onClick={() => generateQrCode()}>Generate</Button>
              <br />
              <br />
              <br />
              {imageUrl ? (
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="img" />
                </a>) : null}
            </Grid> */}

                <Grid item lg={4} md={4} sm={4} xs={4}  >
                </Grid>


                <Grid container spacing={2}>
                  <Grid item xl={4} lg={4} md={6} sm={12} xs={12} >
                    <TextField label="Enter Text Here" onChange={(e) => setText1(e.target.value)} style={{ marginLeft: '24px' }} />
                    <Button className={classes.btn} variant="contained"
                      color="primary" onClick={() => generateQrCode()} style={{ marginLeft: '24px' }}>Generate</Button>
                    <br></br>
                    {imageUrl1 ? (
                      <a href={imageUrl1} download>
                        <img src={imageUrl1} alt="img" style={{ marginLeft: '24px' }} />
                      </a>) : null}
                  </Grid>
                  {/* <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                      <Button className={classes.btn} variant="contained" color="secondary" onClick={onScanFile}>Upload QRCode</Button>
                      <QrReader
                        ref={qrRef}
                        delay={300}
                        style={{width: '100%'}}
                        onError={handleErrorFile}
                        onScan={handleScanFile}
                        legacyMode
                      />
                      <h3>Code: {scanResultFile}</h3>
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                       <h3>Qr:</h3>
                       <QrReader
                       delay={300}
                       style={{width: '100%'}}
                       onError={handleErrorWebCam}
                       onScan={handleScanWebCam}
                       />
                       <h3>Code: {scanResultWebCam}</h3>
                    </Grid> */}
                </Grid>




                <Grid item lg={4} md={4} sm={4} xs={6}  >

                  <TextField style={{ "width": "514px" }}
                    error={nameError}
                    id="name"
                    label="Vendor"
                    placeholder="Vendor"
                    autoComplete="off"
                    helperText={nameError === true ? "Field Required" : ''}
                    value={vender}
                    size="small"
                    onChange={(e) => handleVender(e, setVender, setNameError)}
                    variant="outlined"
                    fullWidth

                  />

                </Grid>
              </Grid>


            </CardContent>




          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button autoFocus onClick={() => {

            editHandler();
          }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

    </>


  );
}
const useStyles = makeStyles((theme) => ({
  conatiner: {
    marginTop: 10
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#3f51b5',
    color: '#fff',
    padding: 20
  },
  btn: {
    marginTop: 10,
    marginBottom: 20
  }
}));

export default PurchasedItems