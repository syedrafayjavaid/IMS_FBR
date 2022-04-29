import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom'
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';




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



 function ProductCard({ product }) {
 
  const { name, coverImage, price, colors, status, priceSale } = product;
  const navigate = useNavigate()
  const viewProduct = (product)=>{
    navigate('/products/details')
  };


  return (
    <Card onClick={()=>viewProduct(product)} >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt="No Image" src={coverImage} />
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
            {price}
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
            80000
            </Typography>
            
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ProductCard;