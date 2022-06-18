
// material
import React, { useEffect ,useState} from 'react'
import AddIcon from '@mui/icons-material/Add';

import Tooltip from '@mui/material/Tooltip';
import { Fab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Paragraph } from 'app/components/Typography'
import { Box, styled, useTheme } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
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
import ProductTypeCard from 'app/components/productType/ProductTypeCard';
import axios from 'axios';


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



  const [productList,setProductList]=React.useState([])

  useEffect(() => {
    getAlldata();
  }, []);


  const getAlldata = () => {
    axios.get('http://192.168.18.117:5000/api/v1/productType ').then((res) => {
      console.log(res.data.data);
      setProductList(res.data.data);
      console.log(productList, 'arry');
    }).catch((error) => {
      console.log(error, 'error');
    })
  }


  const createHandler = () => {
    if(catogoryId===''){
      let data = new FormData();
      data.append('name', category );
      data.append('demo', demo);

      const producst = productList.find((index) => {
        return index.name === category;
      })
      if (producst) {
       alert("You have enter same name");
      
        return;
      }
  

      axios.post('http://192.168.18.117:5000/api/v1/productType', data).then((res) => {
        console.log(res.data.data);
        if(res){
          handleClose()
          getAlldata(); 
        }
        setCatogoryId('')
       
      }).catch((error) => {
        console.log(error, 'error');
      })
    }
    else{

      let data = new FormData();
      data.append('name', category);
  
      axios.put(`http://192.168.18.117:5000/api/v1/productType/${catogoryId}`, data).then((res) => {
        console.log(res.msg);
        if (res) {
          getAlldata();
          handleClose()
        //  console.log("hello console");
        }
    
      }).catch((error) => {
        console.log(error, 'error');
        console.log("hello console");

      })
      // const brandNameExist = productType.find((productType) => {
      //   return productType.name === createBrandName;
      // })
      // if (brandNameExist) {
      //   setSnackBar(true);
      //   return;
      // }
      
    }




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










    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const [mopen, setMopen] = React.useState(false);
    const [category, setCategory] = React.useState("");
    // const [prodectTypeName,setProdectTypeName]=React.useState("");
    const [demo,setDemo]=React.useState(false);
    const [categoryError, setcategoryError] = React.useState(false);
    const [catogoryId,setCatogoryId] = React.useState('');

    const handleClose = () => {
      setCategory('')
      setCatogoryId('')
      setOpen(false);
    }; 
    
    const handleOpen = (id) => {
      console.log(id, 'id');
      setOpen(true);
    };
  
    const handleButton=()=>{
      
  
     
    }
   // snackbar 
    const handleMopen = () => {
      setMopen(true);
    };
    const handleClosed = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setMopen(false);
    };
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
    );

    const handleChange = (e, func, errorFunc) => {
      func(e.target.value);
      console.log(e.target.name, e.target.value)
      errorFunc(false)
    }

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
  
    const Input = styled('input')({
      display: 'none',
    });

    const onDelhandler = (editData) => {
      console.log(editData);
      axios.delete(` http://192.168.18.117:5000/api/v1/productType/${editData}`).then((res) => {
        // console.log(res.msg);
        // getAlldata();
          // let arr = category
          // console.log(arr);
          // let indexOfObject = arr.findIndex(object => {
          //   return object._id === editData;
          // });
  
          // console.log(indexOfObject); // 👉️ 1
  
          // setSanakbar(true);
          // setArryCatagory(arr.splice(indexOfObject, 1))
          if(res){
            getAlldata();
          }
  
        
      }
      )
      .catch((error) => {
        console.log(error, 'error');
      })
  
    }
    const onEdithandler = (editIde ,name) => {

  setCategory(name);
      setOpen(true)
      
      console.log(editIde,name);
      setCatogoryId(editIde);
      // axios.post(`http://192.168.18.117:5000/api/v1/productType/${editIde}`, data).then((res) => {
      //   console.log(res.data.data);
      //   if(res){
      //     handleClose()
      //     getAlldata();
      //     setCategory('')
      //   }
       
      // }).catch((error) => {
      //   console.log(error, 'error');
      // })
    }

    const handleOpenClick = () => {
      if (category === '') {
        setcategoryError(true)
      } else {
        createHandler();
      }
    }

  
    return (
      <>

        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
             
            <Box overflow="auto">
                <ProductTable>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ px: 3 }} colSpan={4}>
                                 Name
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                               Demo
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
                        {productList.map((product, index) => (
                            <ProductTypeCard key={index} product={product} onEdit={onEdithandler} onDelete={onDelhandler} />
                        ))}
                    </TableBody>
                </ProductTable>
            </Box>
        </Card>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ADD PRODUCT LIST"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <br></br>
            <Grid container spacing={3}>

              <Grid item lg={5} md={5} sm={5} xs={5}  >
                <TextField required
                  error={categoryError}
                  id="producttype"
                  label="Product Type Name"
                  placeholder="Product Type Name"
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

                <span>Demo</span>
                <Switch {...label} defaultChecked />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


              </Grid>
              <Grid item lg={4} md={4} sm={4} xs={4}   >



                {/* <label htmlFor="contained-button-file">
                  <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleImage} />
                  <Button variant="contained" component="span" startIcon={<AddAPhotoIcon />}>
                    Upload
                  </Button>
                </label> */}



              </Grid>




            </Grid>

          </DialogContentText>
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
      </Dialog>

        <Tooltip title="ADD PRODUCT LIST">
        <Fab color="secondary" aria-label="Add" size="medium" style={{ zIndex: 999, right: "4vw", bottom: "8vh", position: "fixed" }} onClick={() => {setOpen(true);
        handleMopen();}}>
          <AddIcon />
        </Fab>
      </Tooltip>
        </>
    )
}

// const productList = [{
//     id:1,
//     name:"Glass Dining Room Set Metal Leg",
//     price:"1200",
//     coverImage:'https://sc04.alicdn.com/kf/Hdc887d99681d4ee49ecd721a5b84eddbO.jpg',
//     colors:"black",
//     status:"active",
//     category:"Table",
//     priceSale:"1200",
//     quantity:"80"


//   },{
//     id:2,
//     name:"Pure Wood Table",
//     cover:"coverimage",
//     price:"1200",
//     coverImage:'https://sc04.alicdn.com/kf/H6bd0cecce9034464ace0221e3cbc99d7l.jpg',
//     colors:"black",
//     status:"active",
//     category:"Table",
//     priceSale:"1200",
//     quantity:"120"


//   },{
//     id:3,
//     name:"Middle back conference net cloth Chair",
//     cover:"coverimage",
//     price:"1200",
//     coverImage:'https://sc04.alicdn.com/kf/Hfe84e2ce9f1a41deb620baae3fee230bo.jpg',
//     colors:"black",
//     status:"active",
//     category:"Chair",
//     priceSale:"1200",
//     quantity:"10"


//   },{
//     id:4,
//     name:"Pure Leather Sofa",
//     cover:"coverimage",
//     coverImage:'https://sc04.alicdn.com/kf/H197463f73be24ae5b8ca20cd671736bcf.jpg',
//     price:"1200",
//     colors:"black",
//     status:"active",
//     category:"Sofa",
//     priceSale:"1200",
//     quantity:"50"


//   },{
//     id:5,
//     name:"Nordic Upholstered Velvet Sofa ",
//     cover:"coverimage",
//     price:"1200",
//     colors:"black",    
//     coverImage:'https://sc04.alicdn.com/kf/H5aecfcc540de4edcbe4c4974ef5148bd1.jpg',
//     status:"active",
//     category:"Sofa",
//     priceSale:"1200",
//     quantity:"40"


//   },{
//     id:6,
//     name:"Core i7 RAM 8GB ROM 256 GB Laptop Computer Notebook",
//     cover:"coverimage",
//     price:"1200",
//     coverImage:'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
//     colors:"black",
//     category:"Laptop",
//     status:"active",
//     priceSale:"1200",
//     quantity:"30"


//   },{
//     id:7,
//     name:" AIO Core I3 I5 I7 Laptops For Office Gaming ",
//     cover:"coverimage",
//     price:"1200",
//     colors:"black",
//     coverImage:'https://sc04.alicdn.com/kf/Ha5969bdc1fa941a0abd148617c235f2c6.jpg',
//     status:"active",
//     category:"Laptop",
//     priceSale:"1200",
//     quantity:"20"


//   },{
//     id:8,
//     name:"Wooden Wardrobe Cabinet Clothes Closet",
//     cover:"coverimage",
//     price:"1200",
//     colors:"black",
//     coverImage:'https://sc04.alicdn.com/kf/H8840ba1e7c1e4a87a8f90fe055f04f7b4.jpg',
//     status:"active",
//     category:"Cabinet",
//     priceSale:"1200",
//     quantity:"20"


//   }]

export default ProductTypeList
