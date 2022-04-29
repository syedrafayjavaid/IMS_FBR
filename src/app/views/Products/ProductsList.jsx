import React from 'react'

// material
import { Container, Stack, Typography,Grid } from '@mui/material';
import ProductCard from '../../components/products/ProductCard'
import { Fab  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';



const ProductsList = () => {

  const navigate = useNavigate()

  const products = [{
    id:1,
    name:"HP 15.6 inch portable laptop",
    price:"1200",
    coverImage:'https://sc04.alicdn.com/kf/Ha008f89f0b9e496f8ab478de7c4ca6d23.jpg',
    colors:"black",
    status:"active",
    priceSale:"6"


  },{
    id:2,
    name:"MacBook Pro 2020 8GB Ram ",
    cover:"coverimage",
    price:"1200",
    coverImage:'https://sc04.alicdn.com/kf/H781f8f65e0d34e9291b93164832bd0879.jpg',
    colors:"black",
    status:"active",
    priceSale:"90"


  },{
    id:3,
    name:"Middle Back Cloth Chair",
    cover:"coverimage",
    price:"1200",
    coverImage:'https://sc04.alicdn.com/kf/Hfe84e2ce9f1a41deb620baae3fee230bo.jpg',
    colors:"black",
    status:"active",
    priceSale:"78"


  },{
    id:4,
    name:"Multi-functional Computer Table",
    cover:"coverimage",
    coverImage:'https://sc04.alicdn.com/kf/Hc781203418b1496da17a99f61ec8348dU.jpg',
    price:"1200",
    colors:"black",
    status:"active",
    priceSale:"24"


  },{
    id:5,
    name:"Modern Design Coffee Table",
    cover:"coverimage",
    price:"1200",
    colors:"black",    
    coverImage:'https://sc04.alicdn.com/kf/Hf2fcc8d04cc64a6080c4c30105a219bfp.jpg',
    status:"active",
    priceSale:"120"


  },{
    id:6,
    name:"Core i7 RAM 8GB ROM 256 GB Laptop Computer Notebook",
    cover:"coverimage",
    price:"1200",
    coverImage:'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
    colors:"black",
    status:"active",
    priceSale:"12"


  },{
    id:7,
    name:" AIO Core I3 I5 I7 Laptops For Office Gaming ",
    cover:"coverimage",
    price:"1200",
    colors:"black",
    coverImage:'https://sc04.alicdn.com/kf/Ha5969bdc1fa941a0abd148617c235f2c6.jpg',
    status:"active",
    priceSale:"10"


  },{
    id:8,
    name:"Pure Wooden Cabinet",
    cover:"coverimage",
    price:"1200",
    colors:"black",
    coverImage:'https://sc04.alicdn.com/kf/H8840ba1e7c1e4a87a8f90fe055f04f7b4.jpg',
    status:"active",
    priceSale:"130"


  }]
    
  return (
    <>

    <Tooltip title="Search Product">
        <Fab color="primary" aria-label="Add" size="medium"  style={{zIndex:999,right:"4vw",top:"13vh",position:"fixed"}} onClick={()=>navigate('/products/search')} >
                <SearchIcon />
            </Fab>
        </Tooltip>


    <Tooltip title="Add Product">
    <Fab color="secondary" aria-label="Add" size="medium"  style={{zIndex:999,right:"4vw",bottom:"8vh",position:"fixed"}} onClick={()=>navigate('/products/add/main')} >
            <AddIcon />
        </Fab>
    </Tooltip>


     

     <Container>
          <br></br>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        <Grid container spacing={3} >
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}  >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
        <br></br>
        <br></br>
        <br></br>
      </Container>
    </>
     

  )
}

export default ProductsList
