import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom'
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';



// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});


// ----------------------------------------------------------------------


CategoryCard.propTypes = {
  product: PropTypes.object
};



 function CategoryCard({ product }) {
 
  const { name, coverImage, price, colors, status, priceSale } = product;
  const navigate = useNavigate()
  const viewProduct = (product)=>{
    navigate('/session/signup')
  };


  return (
    <Card  >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt="No Image" src={coverImage} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
     

          <Stack direction="row" alignItems="center" justifyContent="space-between" style={{marginTop:"1px"}} >
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: ''
              }}
            >
              Quantitiy:
            </Typography>
            &nbsp;
            {price}
          </Typography>
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: ''
              }}
            >
              <Chip label="Active" variant="filled" size="small" color='primary'/>
            </Typography>
           
            
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default CategoryCard;