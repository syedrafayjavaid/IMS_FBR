import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom'
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';




// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});


// ----------------------------------------------------------------------


ProductCard.propTypes = {
  product: PropTypes.object
};




 function ProductCard({ product, onDelete, onEdit }) {
 
  const { name, photo, price, productQuantity } = product;
  const navigate = useNavigate()
  const viewProduct = (product)=>{
    navigate('/products/details')
  };
  const url='http://192.168.18.117:5000/';
  const imgeBaseUrl='uploads/';


  const adiitHandler = (adit) =>{
    onEdit(product._id, product)
   }
   const delHandler = () =>{
    onDelete(product._id)
    }


  

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt="No Image" src={url+imgeBaseUrl+photo} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }} >
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
     

        <Stack direction="row" alignItems="center" justifyContent="space-between"style={{marginTop:"10px"}}>
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text',
                textDecoration: ''
              }}
            >
              Quantitiy: &nbsp;
            {productQuantity}
            </Typography>
           
          </Typography>
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text',
                textDecoration: ''
              }}
            >
              Price: &nbsp;
            {price}
            </Typography>
            
          </Typography>
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: ''
              }}
            ><button onClick={delHandler}>
                     <DeleteIcon  />
                     </button>
                     <button onClick={adiitHandler}>
                     <EditIcon  />
                     </button>

            </Typography>
           
            
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ProductCard;