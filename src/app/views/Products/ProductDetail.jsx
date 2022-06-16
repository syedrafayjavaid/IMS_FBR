// import React ,{useState, useEffect} from 'react'

// material
import React from 'react';
import { Container, Stack, Typography,Grid } from '@mui/material';
import ProductCard from '../../components/products/ProductCard'
import { Fab  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState ,useRef} from 'react';


import { makeStyles } from '@material-ui/core/styles';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
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





const ProductsList = () => {



  const [imageUrl, setImageUrl] = React.useState('');
  const [text, setText] = React.useState('');


  // Form validation errors State Setting 
  const [nameError, setNameError] = React.useState(false);
  const [productQuantityError,setProductQuantityError]= React.useState(false)
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
  const [productQuantity,setProductQuantity]= React.useState('')
  const [pcost, setPcost] = React.useState('');
  const [sprice, setSprice] = React.useState('');
  const [category, setCategory] = React.useState([]);
  const [subCategory, setSubCategory] = React.useState('');
  const [color, setColor] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState('');
  const [modelImage, setModelImage] = React.useState('');
  const [categoryData, setCategoryData] = React.useState({});
  const [subcategoryData, setSubcategoryData] = React.useState({});
const [product1,setProduct1]=React.useState([])





  // web came code 

  const [text1, setText1] = useState('');
  const [imageUrl1, setImageUrl1] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const classes = useStyles();
  const qrRef = useRef(null);




  const generateQrCode = async () => {
    try {
          const response = await QRCode.toDataURL(text1);
          setImageUrl1(response);
    }catch (error) {
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
    if (result){
        setScanResultWebCam(result);
    }
   }






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
    setCategory(event.target.value);
  };










  const [open, setOpen] = React.useState(false);

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
      setCategory(res.data.data);
      console.log(category, 'category');
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



  // const onEdithandler = (editDataId,editDataName) => {
  //   setOpen(true)
  //   console.log(editDataId, 'id');
  //   console.log(editDataName,'editDataName');
  //   setCategory(editDataName)
  //   setImage('');
  //   setIdCategory(editDataId)
  //   console.log(`http://192.168.18.117:5000/api/v1/products/${editDataId}`);
  // }



  const navigate = useNavigate()
//   const [producst,setProdect]=React.useState('');
//   useEffect(() => 
//   { axios.get('http://192.168.18.117:5000/api/v1/products ').then((res) => 
//   { console.log(res.data.data); 
//     setProdect(res.data.data); 
//     console.log(setProdect, 'setProdect'); }).catch((error)=>{
// console.log(error,'error');
//     }) }, []);
  // const products = [{
  //   id:1,
  //   name:"HP 15.6 inch portable laptop",
  //   price:"1200",
  //   photo:'https://sc04.alicdn.com/kf/Ha008f89f0b9e496f8ab478de7c4ca6d23.jpg',
  //   colors:"black",
  //   status:"active",
  //   productQuantity:"6"


  // },{
  //   id:2,
  //   name:"MacBook Pro 2020 8GB Ram ",
  //   cover:"coverimage",
  //   price:"1200",
  //   photo:'https://sc04.alicdn.com/kf/H781f8f65e0d34e9291b93164832bd0879.jpg',
  //   colors:"black",
  //   status:"active",
  //   productQuantity:"90"


  // },{
  //   id:3,
  //   name:"Middle Back Cloth Chair",
  //   cover:"coverimage",
  //   price:"1200",
  //   photo:'https://sc04.alicdn.com/kf/Hfe84e2ce9f1a41deb620baae3fee230bo.jpg',
  //   colors:"black",
  //   status:"active",
  //   productQuantity:"78"


  // },{
  //   id:4,
  //   name:"Multi-functional Computer Table",
  //   cover:"coverimage",
  //   photo:'https://sc04.alicdn.com/kf/Hc781203418b1496da17a99f61ec8348dU.jpg',
  //   price:"1200",
  //   colors:"black",
  //   status:"active",
  //   productQuantity:"24"


  // },{
  //   id:5,
  //   name:"Modern Design Coffee Table",
  //   cover:"coverimage",
  //   price:"1200",
  //   colors:"black",    
  //   photo:'https://sc04.alicdn.com/kf/Hf2fcc8d04cc64a6080c4c30105a219bfp.jpg',
  //   status:"active",
  //   productQuantity:"120"


  // },{
  //   id:6,
  //   name:"Core i7 RAM 8GB ROM 256 GB Laptop Computer Notebook",
  //   cover:"coverimage",
  //   price:"1200",
  //   photo:'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
  //   colors:"black",
  //   status:"active",
  //   productQuantity:"12"


  // },{
  //   id:7,
  //   name:" AIO Core I3 I5 I7 Laptops For Office Gaming ",
  //   cover:"coverimage",
  //   price:"1200",
  //   colors:"black",
  //   photo:'https://sc04.alicdn.com/kf/Ha5969bdc1fa941a0abd148617c235f2c6.jpg',
  //   status:"active",
  //   productQuantity:"10"


  // },{
  //   id:8,
  //   name:"Pure Wooden Cabinet",
  //   cover:"coverimage",
  //   price:"1200",
  //   colors:"black",
  //   photo:'https://sc04.alicdn.com/kf/H8840ba1e7c1e4a87a8f90fe055f04f7b4.jpg',
  //   status:"active",
  //   productQuantity:"130"


  // }]






    
  return (
    <>

    <Tooltip title="Search Product">
        <Fab color="primary" aria-label="Add" size="medium"  style={{zIndex:999,right:"4vw",top:"13vh",position:"fixed"}} onClick={() => setOpen(true)} >
                <SearchIcon />
            </Fab>
        </Tooltip>


    <Tooltip title="Add Product">
    <Fab color="secondary" aria-label="Add" size="medium"  style={{zIndex:999,right:"4vw",bottom:"8vh",position:"fixed"}} onClick={() => setOpen(true)} >
            <AddIcon />
        </Fab>
    </Tooltip>


     

     <Container>
          <br></br>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        <Grid container spacing={3} >
      {product1.map((product) => (
        <Grid key={product._id} item xs={12} sm={6} md={3}  >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
        <br></br>
        <br></br>
        <br></br>
      </Container>





      <Dialog
        open={open}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ADD PRODUCT"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <br></br>
            {/* <Grid container spacing={3}>

              <Grid item lg={5} md={5} sm={5} xs={5}  >
                <TextField
                  error={categoryError}
                  id="category"
                  label="Category Name"
                  placeholder="Category Name"
                  size="small"
                  autoComplete="off"
                  helperText={categoryError === true ? "Field Required" : ''}
                  value={category}
                  onChange={(e) => handleChange(e, setCategory, setcategoryError)}
                  variant="outlined"
                  fullWidth

                />

              </Grid>


              <Grid item lg={3} md={3} sm={3} xs={3}   >

                <span>Active</span>
                <Switch {...label} defaultChecked />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;




              </Grid>
              <Grid item lg={4} md={4} sm={4} xs={4}   >



                <label htmlFor="contained-button-file">
                  <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleImage}/>
                  <Button variant="contained" component="span" startIcon={<AddAPhotoIcon />}>
                    Upload
                  </Button>
                </label>



              </Grid>




            </Grid> */}





       


        <CardContent>


          <Grid container spacing={3}>

            <Grid item lg={4} md={4} sm={4} xs={6}  >

              <TextField
                error={nameError}
                id="name"
                label="Product Name"
                placeholder="Product Name"
                autoComplete="off"
                helperText={nameError === true ? "Field Required" : ''}
                value={name}
                size="small"
                onChange={(e) => handleChange(e, setName, setNameError)}
                variant="outlined"
                fullWidth

              />



            </Grid>



            <Grid item lg={4} md={4} sm={4} xs={6}  >

              <Box sx={{ minWidth: 120 }}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">Product Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Product Type"
                    value={quantity.value}
                    onChange={handleType}
                  >
                    {
                   
                    quantity.map((q) => (
                      <MenuItem key={q._id} value={q}>{q.name}</MenuItem>
                    ))
                  }
                    
                  </Select>
                </FormControl>
              </Box>
            </Grid>


            <Grid item lg={4} md={4} sm={4} xs={6}  >


              <Box sx={{ minWidth: 120 }}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">Product Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Product Category"
                    onChange={handleType2}

                  >
                    <MenuItem value={10}>Sofa</MenuItem>
                    <MenuItem value={20}>Table</MenuItem>
                    <MenuItem value={30}>Laptop</MenuItem>
                    <MenuItem value={30}>Tablet</MenuItem>
                  </Select>
                </FormControl>
              </Box>

            </Grid>




          </Grid>
          <br></br>
          <Grid container spacing={3}>

            <Grid item lg={4} md={4} sm={4} xs={4}  >
          

              <TextField
                error={nameError}
                id="name"
                label="Product Description"
                placeholder="Product Description"
                autoComplete="off"
                helperText={nameError === true ? "Field Required" : ''}
                value={description}
                size="small"
                onChange={(e) => handleChange(e, setDescription, setNameError)}
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

            <Grid item lg={6} md={6} sm={6} xs={6} style={{ justifyContent: "center", marginLeft: "12px" }}  >
              <Box>
                <span>Active</span>
                <Switch {...label} defaultChecked />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <label htmlFor="contained-button-file">
                  <Input accept="image/*" id="contained-button-file" multiple type="file"  />
                  <Button variant="contained" component="span" startIcon={<AddAPhotoIcon />}>
                    Upload
                  </Button>
                </label>
              </Box>


            </Grid>
            








          </Grid>
          <br></br>

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
            <br></br>
            <br></br>

            <Grid container spacing={2}>
                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <TextField label="Enter Text Here" onChange={(e) => setText1(e.target.value)}/>
                        <Button className={classes.btn} variant="contained" 
                          color="primary" onClick={() => generateQrCode()}>Generate</Button>
                          <br></br>
                          {imageUrl1 ? (
                            <a href={imageUrl1} download>
                                <img src={imageUrl1} alt="img"/>
                            </a>) : null}
                    </Grid>
                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
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
                    </Grid>
                </Grid>
        



          </Grid>
         




 
        </CardContent>





   









          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button autoFocus onClick={checking}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
     

  )
}



// qrcode 

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


export default ProductsList
