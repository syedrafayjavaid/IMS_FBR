import React from 'react'

// material
import { Container, Stack, Typography,Grid, Switch, Input } from '@mui/material';
import CategoryCard from 'app/components/categories/CategoryCard';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { Fab  } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';


const label = { inputProps: { 'aria-label': 'Switch demo' } };



const CategoriesList = () => {


  const navigate = useNavigate()
   // Form validation errors State Setting 
   const [categoryError, setcategoryError] = React.useState(false);

  
   // Setting States 
   const [category, setCategory] = React.useState('');


  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e, func, errorFunc) => {
    func(e.target.value);
    console.log(e.target.name,e.target.value)
      errorFunc(false)
  }

  const Input = styled('input')({
    display: 'none',
  });
  


  const products = [{
    id:1,
    name:"TABLES",
    price:"1200",
    coverImage:'https://img.made.com/image/upload/c_pad,d_madeplusgrey.svg,f_auto,w_768,dpr_2.0,q_auto:good,b_rgb:f5f6f4/v4/catalog/product/asset/3/2/b/e/32be1f750db0ebaaa7f06a4fe36e3ac7088aaa6b_TBLDVI017BLK_UK_Deauville_Extending_Dining_Table_Oak_Charcoal_Black_ar3_2_LB01_PS.png',
    colors:"black",
    status:"active",
    priceSale:"1200"


  },{
    id:3,
    name:"CHAIRS",
    cover:"coverimage",
    price:"1200",
    coverImage:'https://sc04.alicdn.com/kf/Hfe84e2ce9f1a41deb620baae3fee230bo.jpg',
    colors:"black",
    status:"active",
    priceSale:"1200"


  },{
    id:4,
    name:"SOFAS",
    cover:"coverimage",
    coverImage:'https://sc04.alicdn.com/kf/H197463f73be24ae5b8ca20cd671736bcf.jpg',
    price:"1200",
    colors:"black",
    status:"active",
    priceSale:"1200"


  },{
    id:6,
    name:"LAPTOPS",
    cover:"coverimage",
    price:"1200",
    coverImage:'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
    colors:"black",
    status:"active",
    priceSale:"1200"


  },{
    id:7,
    name:"LED'S",
    cover:"coverimage",
    price:"1200",
    colors:"black",
    coverImage:'https://sc04.alicdn.com/kf/Ha5969bdc1fa941a0abd148617c235f2c6.jpg',
    status:"active",
    priceSale:"1200"


  },{
    id:8,
    name:"CABNET'S",
    cover:"coverimage",
    price:"1200",
    colors:"black",
    coverImage:'https://sc04.alicdn.com/kf/H8840ba1e7c1e4a87a8f90fe055f04f7b4.jpg',
    status:"active",
    priceSale:"1200"


  }]
    
  return (
    <>
    <Tooltip title="Add Category">
    <Fab color="secondary" aria-label="Add" size="medium"  style={{zIndex:999,right:"4vw",bottom:"8vh",position:"fixed"}} onClick={()=>setOpen(true)}>
            <AddIcon />
        </Fab>
    </Tooltip>
    <Container>
          <br></br>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Categories
        </Typography>
        <Grid container spacing={3} >
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}  >
          <CategoryCard product={product} />
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
              <Grid container  spacing={3}>

              <Grid item lg={5} md={5} sm={5} xs={5}  >
              <TextField
                  error= {categoryError}
                  id="name"
                  label="Category Name"
                  placeholder="Category Name" 
                  size="small"
                  autoComplete="off"
                  helperText={categoryError === true ? "Field Required" : ''}
                  value={category} 
                  onChange={(e)=> handleChange(e, setCategory, setcategoryError)}
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
               <Input accept="image/*" id="contained-button-file" multiple type="file" />
               <Button variant="contained" component="span" startIcon={<AddAPhotoIcon/>}>
                 Upload
               </Button>
             </label>
            
           

</Grid>



                
              </Grid>
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>


    
    </>
      
  )
}

export default CategoriesList
