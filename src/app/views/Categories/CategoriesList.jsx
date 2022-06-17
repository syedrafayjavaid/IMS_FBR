import React, { useEffect } from 'react'
import axios from 'axios';

// material
import { Container, Stack, Typography, Grid, Switch, Input } from '@mui/material';
import CategoryCard from 'app/components/categories/CategoryCard';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { Fab } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

//snackba
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



const label = { inputProps: { 'aria-label': 'Switch demo' } };


const modifiedBy = 'noor';
const createdBy = 'imad';


const CategoriesList = () => {


  const navigate = useNavigate()
  // Form validation errors State Setting 
  const [categoryError, setcategoryError] = React.useState(false);
  const [imge, setImage] = React.useState('');

  //snacvkbar
  const [sopen, setsOpen] = React.useState(false);
  // fir edit api 
  const[idCategory,setIdCategory] = React.useState('')


  // Setting States 
  const [category, setCategory] = React.useState('');


  const [open, setOpen] = React.useState(false);
  const [sanakbar,setSanakbar] =React.useState(false)

  const handleClose = () => {
    setCategory('')
    setOpen(false);
  };

  //snackbar 
  const handleClick = () => {
    setsOpen(true);
  };
  const handleClosed = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setsOpen(false);
  };
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
  );

    



  const handleChange = (e, func, errorFunc) => {
    func(e.target.value);
    console.log(e.target.name, e.target.value)
    errorFunc(false)
  }

  const Input = styled('input')({
    display: 'none',
  });



  // const products = [{
  //   id: 1,
  //   name: "TABLES",
  //   price: "1200",
  //   coverImage: 'https://img.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_768,dpr_2.0,q_auto:good,b_rgb:f5f6f4/v4/catalog/product/asset/3/2/b/e/32be1f750db0ebaaa7f06a4fe36e3ac7088aaa6b_TBLDVI017BLK_UK_Deauville_Extending_Dining_Table_Oak_Charcoal_Black_ar3_2_LB01_PS.png',
  //   colors: "black",
  //   status: "active",
  //   priceSale: "1200"


  // }, {
  //   id: 3,
  //   name: "CHAIRS",
  //   cover: "coverimage",
  //   price: "1200",
  //   coverImage: 'https://sc04.alicdn.com/kf/Hfe84e2ce9f1a41deb620baae3fee230bo.jpg',
  //   colors: "black",
  //   status: "active",
  //   priceSale: "1200"


  // }, {
  //   id: 4,
  //   name: "SOFAS",
  //   cover: "coverimage",
  //   coverImage: 'https://sc04.alicdn.com/kf/H197463f73be24ae5b8ca20cd671736bcf.jpg',
  //   price: "1200",
  //   colors: "black",
  //   status: "active",
  //   priceSale: "1200"


  // }, {
  //   id: 6,
  //   name: "LAPTOPS",
  //   cover: "coverimage",
  //   price: "1200",
  //   coverImage: 'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
  //   colors: "black",
  //   status: "active",
  //   priceSale: "1200"


  // }, {
  //   id: 7,
  //   name: "LED'S",
  //   cover: "coverimage",
  //   price: "1200",
  //   colors: "black",
  //   coverImage: 'https://sc04.alicdn.com/kf/Ha5969bdc1fa941a0abd148617c235f2c6.jpg',
  //   status: "active",
  //   priceSale: "1200"


  // }, {
  //   id: 8,
  //   name: "CABNET'S",
  //   cover: "coverimage",
  //   price: "1200",
  //   colors: "black",
  //   coverImage: 'https://sc04.alicdn.com/kf/H8840ba1e7c1e4a87a8f90fe055f04f7b4.jpg',
  //   status: "active",
  //   priceSale: "1200"


  // }]
  const [arryCatagory, setArryCatagory] = React.useState([])
  useEffect(() => {
    getAlldata();
  }, []);

  const getAlldata = () => {
    axios.get('http://192.168.18.117:5000/api/v1/category').then((res) => {
      console.log(res.data.data);
      setArryCatagory(res.data.data);
      console.log(arryCatagory, 'arry');
    }).catch((error) => {
      console.log(error, 'error');
    })
  }

  const handleImage = (e) => {
    setImage(e.target.files[0])
    console.log(e.target.files[0], 'e.target.files[0]');
  }
  const checking = () => {
    if(imge){
      let data = new FormData();
      data.append('file', imge);
      data.append('name', category);
      data.append('modifiedBy', modifiedBy);
      data.append('createdBy', createdBy);
      console.log(data.value, 'data');
      axios.post('http://192.168.18.117:5000/api/v1/category', data).then((res) => {
        console.log(res.data.data);
        if(res){
          handleClose()
          getAlldata();
        }
       
      }).catch((error) => {
        console.log(error, 'error');
        handleClick()
      })

    }
    else{

      let data = new FormData();
      data.append('name', category);
  
      axios.put(`http://192.168.18.117:5000/api/v1/category/${idCategory}`, data).then((res) => {
        console.log(res.msg);
        if (res) {
          getAlldata();
          handleClose()
        //  console.log("hello console");
        }
    
      }).catch((error) => {
        console.log(error, 'error');
        console.log("hello console");
        handleClick()

      })
      
    }
   
  }

  const onDelhandler = (editData) => {
    console.log(editData, 'id');
    console.log(`http://192.168.18.117:5000/api/v1/category/${editData}`);
    axios.delete(`http://192.168.18.117:5000/api/v1/category/${editData}`).then((res) => {
      console.log(res.msg);
      getAlldata();
        // let arr = category
        // console.log(arr);
        // let indexOfObject = arr.findIndex(object => {
        //   return object._id === editData;
        // });

        // console.log(indexOfObject); // 👉️ 1

        // setSanakbar(true);
        // setArryCatagory(arr.splice(indexOfObject, 1))

      
    }).catch((error) => {
      console.log(error, 'error');
    })

  }
  const onEdithandler = (editDataId,editDataName) => {

    setOpen(true)

    console.log(editDataId, 'id');
    console.log(editDataName,'editDataName');
    setCategory(editDataName)
    setImage('');
    setIdCategory(editDataId)

    console.log(`http://192.168.18.117:5000/api/v1/category/${editDataId}`);
  }



  return (
    <>
      <Tooltip title="Add Category">
        <Fab color="secondary" aria-label="Add" size="medium" style={{ zIndex: 999, right: "4vw", bottom: "8vh", position: "fixed" }} onClick={() => setOpen(true)}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Container>
        <br></br>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Categories
        </Typography>
        <Grid container spacing={3} >
          {arryCatagory.map((product) => (
            <Grid key={product._id} item xs={12} sm={6} md={3}  >
              <CategoryCard product={product} onEdit={onEdithandler} onDelete={onDelhandler} />
            </Grid>
          ))}
        </Grid>
        <br></br>
        <br></br>
        <br></br>
      </Container>


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ADD CATEGORY"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <br></br>
            <Grid container spacing={3}>

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
              <Grid item lg={4} md={4} sm={4} xs={4}>



                <label htmlFor="contained-button-file">
                  <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleImage} />
                  <Button variant="contained" component="span" startIcon={<AddAPhotoIcon />}>
                    Upload
                  </Button>
                </label>



              </Grid>




            </Grid>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button autoFocus onClick={checking}>
            Confirm
          </Button>
        </DialogActions>

{/* snackbar */}
        {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        open={sopen}
        autoHideDuration={5000}
        onClose={handleClosed}
        message="Note archived"
        action={action}
      />


        {/* <Snackbar
          open={sanakbar}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Note archived"
          action={action}
        /> */}
      </Dialog>




    </>

  )
}


export default CategoriesList;
