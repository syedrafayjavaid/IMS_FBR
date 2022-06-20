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
import config from 'config';



const label = { inputProps: { 'aria-label': 'Switch demo' } };


const modifiedBy = 'noor';
const createdBy = 'imad';


const CategoriesList = () => {


  const navigate = useNavigate()
  // Form validation errors State Setting 
  const [categoryError, setcategoryError] = React.useState(false);
  const [categoryError1, setcategoryError1] = React.useState(false);
  const [imge, setImage] = React.useState('');

  //snacvkbar
  const [sopen, setsOpen] = React.useState(false);
  const [popen, setpOpen] = React.useState(false);
  // fir edit api 
  const[idCategory,setIdCategory] = React.useState('')


  // Setting States 
  const [category, setCategory] = React.useState('');
  const [category1, setCategory1] = React.useState('');
  const [open1, setOpen1] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [sanakbar,setSanakbar] =React.useState(false)

  const handleClose = () => {
    setCategory('')
    setOpen(false);
  };
  const handleClose1 = () => {
    setCategory1('')
    setOpen1(false);
  };
  //snackbar 
  const handleClick = () => {
    setsOpen(true);
  };
  const handleClick1 = () => {
    setsOpen(true);
  };
  const handleClosed = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
///
//when the edit click the button

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






//////edit pup mesage

const handlepClick = () => {
  setpOpen(true);
};

const handlepClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setpOpen(false);
};

const paction = (
  <React.Fragment>
    <Button color="secondary" size="small" onClick={handlepClose}>
      UNDO
    </Button>
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handlepClose}
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
  const [arryCatagory, setArryCatagory] = React.useState([])
  useEffect(() => {
    getAlldata();
  }, []);

  const getAlldata = () => {
    axios.get(`${config.base_url}/api/v1/category`).then((res) => {
      console.log(res.data.data);
      setArryCatagory(res.data.data);
      console.log(arryCatagory, 'arry');
    }).catch((error) => {
      console.log(error, 'error');
    })
  }


  const handleImage = (e) => {
    setImage(e.target.files[0])
  }
  const checking = () => {
   
      let data = new FormData();
      data.append('file', imge);
      data.append('name', category);
      data.append('modifiedBy', modifiedBy);
      data.append('createdBy', createdBy);

      // const producst =  arryCatagory.find((index) => {
      //   return index.name === category;
      // })
      // if (producst) {
      // checking();
      
      //   return;
      // }

    
        axios.post(`${config.base_url}/api/v1/category`, data).then((res) => {
          console.log(res.data.data);
          if(res){
            handleClose()
            getAlldata();
          }

        }).catch((error) => {
          console.log(error, 'error');
        })
    
  
  }


  const editfun = () =>{
    let data = new FormData();
    data.append('name', category1);
    data.append('file', imge)
    // const producst = arryCatagory.find((index) => {
    //   return index.name === category;
    // })
    // if (producst) {
    //  checking();
     
    
    //   return;
    // }
    axios.put(`${config.base_url}/api/v1/category/${idCategory}`, data).then((res) => {
      console.log(res.msg);
      if (res) {
        getAlldata();
        handleClose1()
      }
  
    }).catch((error) => {
      if(error.message === "Request failed with status code 400")
            {
              setsOpen(true);
            }

    })
    
  
  }

  const handleOpenClick = () => {
    if (category === '') {
      setcategoryError(true)
    
    } else {
      checking();
    }
  }

  const handleOpenClick1 = () => {
    if (category1 === '') {
      setcategoryError1(true)
    } else {
      editfun();
      
    }
  }
  const onDelhandler = (editData) => {
    axios.delete(`${config.base_url}/api/v1/category/${editData}`).then((res) => {
      console.log(res.msg);
      getAlldata();
    }).catch((error) => {
      console.log(error, 'error');
    })

  }
  const onEdithandler = (editDataId,editDataName) => {
    setOpen1(true)
    setCategory1(editDataName)
    setImage('');
    setIdCategory(editDataId)

  }



// snackbar 
const handleMopen = () => {
  setpOpen(true);
};
const handleClosep = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setpOpen(false);
};

  return (
    <>
      <Tooltip title="Adding Category">
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
          {arryCatagory.map((category) => (
            <Grid key={category._id} item xs={12} sm={6} md={3}  >
              <CategoryCard category={category} onEdit={onEdithandler} onDelete={onDelhandler} />
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
          {"Adding Category"}
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
          <Button autoFocus onClick={()=>{
          handleOpenClick();

         }} >
            Confirm
          </Button>
        </DialogActions>
      <Snackbar
        open={sopen}
        autoHideDuration={5000}
        onClose={handleClosed}
        message="Name already exists"
        action={action}
      />
      </Dialog>

            <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit Category"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <br></br>
            <Grid container spacing={3}>

              <Grid item lg={5} md={5} sm={5} xs={5}  >
                <TextField
                  error={categoryError1}
                  id="category"
                  label="Category Name"
                  placeholder="Category Name"
                  size="small"
                  autoComplete="off"
                  helperText={categoryError1 === true ? "Field Required" : ''}
                  value={category1}
                  onChange={(e) => handleChange(e, setCategory1, setcategoryError1)}
                  variant="outlined"
                  fullWidth

                />

              </Grid>
              <Grid item lg={4} md={4} sm={4} xs={4}   >

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
          <Button onClick={handleClose1}>Cancel</Button>
          <Button autoFocus onClick={()=>{handleMopen();
          handleOpenClick1();

         }} >
            Confirm
          </Button>
        </DialogActions>

<Snackbar
        open={popen}
        autoHideDuration={6000}
        onClose={handlepClose}
        message="Name already exists"
        action={paction}
      />
      </Dialog>

    </>

  )
}


export default CategoriesList;
