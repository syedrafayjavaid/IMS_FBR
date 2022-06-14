import AddIcon from '@mui/icons-material/Add';
import {
    Card, Fab, Grid, Table, TableBody, TableCell, TableHead,
    TableRow,
    Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from "@mui/styles";
import { Box, styled } from '@mui/system';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandCard from '../brands/BrandCard';
import OfficeCard from './OfficeCard';

const BrandTable = styled(Table)(() => ({
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

const Offices = () => {
  
  
    // Form validation errors State Setting 
    const [brandError, setbrandError] = React.useState(false);
  
    // Setting States 
    const [quantity, setQuantity] = React.useState([]);
    const [brand, setBrand] = React.useState([]);
    const [image, setImage] = React.useState('');
  const [product1,setProduct1]=React.useState([])
  const [demo,setDemo]=React.useState(false);
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [addressError, setAddressError] = React.useState(false);
  const [city, setCity] = React.useState("");
  const [cityError, setCityError] = React.useState(false);
  const [longitude, setLongitude] = React.useState("");
  const [longitudeError, setLongitudeError] = React.useState(false);
  const [latitude, setLatitude] = React.useState("");
  const [latitudeError, setLatitudeError] = React.useState(false);
  
  
    // const generateQrCode = async () => {
    //   try {
    //         const response = await QRCode.toDataURL(text1);
    //         setImageUrl1(response);
    //   }catch (error) {
    //     console.log(error);
    //   }
    // }
    // const handleErrorFile = (error) => {
    //   console.log(error);
    // }
    // const handleScanFile = (result) => {
    //     if (result) {
    //         setScanResultFile(result);
    //     }
    // }
    // const onScanFile = () => {
    //   qrRef.current.openImageDialog();
    // }
    // const handleErrorWebCam = (error) => {
    //   console.log(error);
    // }
    // const handleScanWebCam = (result) => {
    //   if (result){
    //       setScanResultWebCam(result);
    //   }
    //  }
  
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const handleChange = (e, func, errorFunc) => {
      func(e.target.value);
      console.log(e.target.name, e.target.value)
      errorFunc(false)
    }
  
    const handleType = (event) => {
      console.log(quantity,"event");
      setQuantity(event.target.value);
    };
  
    const handleType2 = (event) => {
      console.log(event.target,'rula');
      setBrand(event.target.value);
    };
  
    const [open, setOpen] = React.useState(false);
    const [catogoryId,setCatogoryId] = React.useState('');
  
    const handleClose = () => {
      setOpen(false);
    }; const handleOpen = (id) => {
      console.log(id,'id');
      setOpen(true);
    };
    const handleClickOpen2 = () => {
      setOpen(true);
    };
  
  
  
    const handleImage=(e)=>{
      setImage(e.target.files[0])
      console.log(e.target.files[0],'e.target.files[0]');
    }
  
  
    useEffect(() => {
      getAlldata();
    }, []);
    const getAlldata = () => {
      axios.get('http://192.168.18.117:5000/api/v1/products').then((res) => {
        console.log(res.data.data);
        setProduct1(res.data.data);
        console.log(product1, 'all');
      }).catch((error) => {
        console.log(error, 'error');
      })
      axios.get('http://192.168.18.117:5000/api/v1/category').then((res) => {
        console.log(res.data.data);
        // setBrand(res.data.data);
        console.log(brand, 'category');
      }).catch((error) => {
        console.log(error, 'error');
      })
      axios.get('http://192.168.18.117:5000/api/v1/productType ').then((res) => {
        console.log(res.data.data);
        setQuantity(res.data.data);
        console.log(quantity, 'quantity');
      }).catch((error) => {
        console.log(error, 'error');
      })
    }
  
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
      // console.log(editData, 'id');
      // console.log(`http://192.168.18.117:5000/api/v1/products/${editData}`);
      // axios.delete(`http://192.168.18.117:5000/api/v1/products/${editData}`).then((res) => {
      //   console.log(res.msg);
      //   getAlldata();
          // let arr = category
          // console.log(arr);
          // let indexOfObject = arr.findIndex(object => {
          //   return object._id === editData;
          // });
          // console.log(indexOfObject); // :point_right:️ 1
          // setSanakbar(true);
          // setArryCatagory(arr.splice(indexOfObject, 1))
      // }).catch((error) => {
      //   console.log(error, 'error');
      // })
    }
  
  
  
    const onEdithandler = (editDataId,editDataName) => {
    //   setOpen(true)
    //   console.log(editDataId, 'id');
    //   console.log(editDataName,'editDataName');
    //   setCategory(editDataName)
    //   setImage('');
    //   setIdCategory(editDataId)
    //   console.log(`http://192.168.18.117:5000/api/v1/products/${editDataId}`);
    }
  
  
  
    const navigate = useNavigate()
  //   const [producst,setProdect]=React.useState('');
  //   useEffect(() => 
  //   { axios.get('http://192.168.18.117:5000/api/v1/products ').then((res) => 
  //   { console.log(res.data.data); 
  //     setProdect(res.data.data); 
  //     console.log(setProdect, 'setProdect'); }).catch((error)=>{
  // console.log(error,'error');
  //     }) }, []);
    const offices = [{
      id:1,
      name:"HP 15.6 inch portable laptop",
      price:"1200",
      photo:'https://sc04.alicdn.com/kf/Ha008f89f0b9e496f8ab478de7c4ca6d23.jpg',
      colors:"black",
      status:"active",
      productQuantity:"6"
  
  
    },{
      id:2,
      name:"MacBook Pro 2020 8GB Ram ",
      cover:"coverimage",
      price:"1200",
      photo:'https://sc04.alicdn.com/kf/H781f8f65e0d34e9291b93164832bd0879.jpg',
      colors:"black",
      status:"active",
      productQuantity:"90"
  
  
    },{
      id:3,
      name:"Middle Back Cloth Chair",
      cover:"coverimage",
      price:"1200",
      photo:'https://sc04.alicdn.com/kf/Hfe84e2ce9f1a41deb620baae3fee230bo.jpg',
      colors:"black",
      status:"active",
      productQuantity:"78"
  
  
    },{
      id:4,
      name:"Multi-functional Computer Table",
      cover:"coverimage",
      photo:'https://sc04.alicdn.com/kf/Hc781203418b1496da17a99f61ec8348dU.jpg',
      price:"1200",
      colors:"black",
      status:"active",
      productQuantity:"24"
  
  
    },{
      id:5,
      name:"Modern Design Coffee Table",
      cover:"coverimage",
      price:"1200",
      colors:"black",    
      photo:'https://sc04.alicdn.com/kf/Hf2fcc8d04cc64a6080c4c30105a219bfp.jpg',
      status:"active",
      productQuantity:"120"
  
  
    },{
      id:6,
      name:"Core i7 RAM 8GB ROM 256 GB Laptop Computer Notebook",
      cover:"coverimage",
      price:"1200",
      photo:'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
      colors:"black",
      status:"active",
      productQuantity:"12"
  
  
    },{
      id:7,
      name:" AIO Core I3 I5 I7 Laptops For Office Gaming ",
      cover:"coverimage",
      price:"1200",
      colors:"black",
      photo:'https://sc04.alicdn.com/kf/Ha5969bdc1fa941a0abd148617c235f2c6.jpg',
      status:"active",
      productQuantity:"10"
  
  
    },{
      id:8,
      name:"Pure Wooden Cabinet",
      cover:"coverimage",
      price:"1200",
      colors:"black",
      photo:'https://sc04.alicdn.com/kf/H8840ba1e7c1e4a87a8f90fe055f04f7b4.jpg',
      status:"active",
      productQuantity:"130"
  
  
    }]
  
  
    const createHandler = () => {
        // if(catogoryId===''){
        //   let data = new FormData();
        //   data.append('name', brand );
        //   data.append('demo', demo);
        //   axios.post('http://192.168.18.117:5000/api/v1/productType', data).then((res) => {
        //     console.log(res.data.data);
        //     if(res){
        //       handleClose()
        //       getAlldata(); 
        //     }
        //     setCatogoryId('')
           
        //   }).catch((error) => {
        //     console.log(error, 'error');
        //   })
        // }
        // else{
    
        //   let data = new FormData();
        //   data.append('name', brand);
      
        //   axios.put(`http://192.168.18.117:5000/api/v1/productType/${catogoryId}`, data).then((res) => {
        //     console.log(res.msg);
        //     if (res) {
        //       getAlldata();
        //       handleClose()
        //     //  console.log("hello console");
        //     }
        
        //   }).catch((error) => {
        //     console.log(error, 'error');
        //     console.log("hello console");
    
        //   })
          
        // }
    
        
        // else{
    
        //   let data = new FormData();
        //   data.append('name', category);
      
        //   axios.put(`http://192.168.18.117:5000/api/v1/category/${idCategory}`, data).then((res) => {
        //     console.log(res.msg);
        //     if (res) {
        //       getAlldata();
        //       handleClose()
        //     //  console.log("hello console");
        //     }
        
        //   }).catch((error) => {
        //     console.log(error, 'error');
        //     console.log("hello console");
        //     handleClick()
    
        //   })
          
        // }
       
      }
  
  
  
      
    return (
        <>

        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
             
            <Box overflow="auto">
                <BrandTable>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ px: 3 }} colSpan={2}>
                                 Name
                            </TableCell>
                            <TableCell sx={{ px: 3 }} colSpan={2}>
                                 Address
                            </TableCell>
                            <TableCell sx={{ px: 3 }} colSpan={2}>
                                 City
                            </TableCell>
                            <TableCell sx={{ px: 3 }} colSpan={2}>
                                 Longitude
                            </TableCell>
                            <TableCell sx={{ px: 3 }} colSpan={2}>
                                 Latitude
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={1}>
                                Edit
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={1}>
                                Delete
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {offices.map((office, index) => (
                            <OfficeCard key={index} office={office} onEdit={onEdithandler} onDelete={onDelhandler} />
                        ))}
                    </TableBody>
                </BrandTable>
            </Box>
        </Card>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ADD OFFICE"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <br></br>
            <Grid container spacing={3}>

              <Grid item lg={6} md={6} sm={6} xs={6}>
                <TextField
                  error={nameError}
                  id="name"
                  label="Name"
                  placeholder="Enter Name"
                  size="small"
                  autoComplete="off"
                  helperText={brandError === true ? "Field Required" : ''}
                  value={name}
                  onChange={(e) => handleChange(e, setName, setNameError)}
                  variant="outlined"
                  fullWidth

                />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                <TextField
                  error={cityError}
                  id="city"
                  label="City"
                  placeholder="Enter City"
                  size="small"
                  autoComplete="off"
                  helperText={cityError === true ? "Field Required" : ''}
                  value={city}
                  onChange={(e) => handleChange(e, setAddress, setAddressError)}
                  variant="outlined"
                  fullWidth
                />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  error={addressError}
                  id="address"
                  label="Address"
                  placeholder="Enter Address"
                  size="small"
                  autoComplete="off"
                  helperText={addressError === true ? "Field Required" : ''}
                  value={address}
                  onChange={(e) => handleChange(e, setAddress, setAddressError)}
                  variant="outlined"
                  fullWidth
                />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography>Map</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                <TextField
                  error={longitudeError}
                  id="longitude"
                  label="Longitude"
                  placeholder="Enter Longitude"
                  size="small"
                  autoComplete="off"
                  helperText={longitudeError === true ? "Field Required" : ''}
                  value={longitude}
                  onChange={(e) => handleChange(e, setAddress, setAddressError)}
                  variant="outlined"
                  fullWidth
                />
                </Grid><Grid item lg={6} md={6} sm={6} xs={6} spacing={3}>
                <TextField
                  error={latitudeError}
                  id="latitude"
                  label="Latitude"
                  placeholder="Enter Longitude"
                  size="small"
                  autoComplete="off"
                  helperText={latitudeError === true ? "Field Required" : ''}
                  value={latitude}
                  onChange={(e) => handleChange(e, setAddress, setAddressError)}
                  variant="outlined"
                  fullWidth
                />
              </Grid>


            </Grid>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button autoFocus onClick={createHandler}>
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


        {/* <Snackbar
          open={sanakbar}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Note archived"
          action={action}
        /> */}
      </Dialog>

        <Tooltip title="Add Category">
        <Fab color="secondary" aria-label="Add" size="medium" style={{ zIndex: 999, right: "4vw", bottom: "8vh", position: "fixed" }} onClick={() => setOpen(true)}>
          <AddIcon />
        </Fab>
      </Tooltip>
        </>
       
  
    )
}

const useStyles = makeStyles((theme) => ({
    conatiner: {
      marginTop: 10
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems:  'center',
      background: '#3f51b5',
      color: '#fff',
      padding: 20
    },
    btn : {
      marginTop: 10,
      marginBottom: 20
    }
  }));

export default Offices