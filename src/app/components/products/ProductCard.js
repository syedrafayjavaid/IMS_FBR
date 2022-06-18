import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'
// material
import {
    Box,
    Card,
    Link,
    Typography,
    Stack,
    CardActions,
    CardMedia,
    CardContent,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import axios from 'axios'

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
})

// ----------------------------------------------------------------------

ProductCard.propTypes = {
    product: PropTypes.object,
}

function ProductCard({ product, onDelete, onEdit }) {
    const navigate = useNavigate()
    const url = 'http://192.168.18.117:5000/'
    const imgeBaseUrl = 'uploads/'

    const adiitHandler = (adit) => {
        onEdit(product._id, product)
    }
    const delHandler = () => {
        onDelete(product._id)
    }

    const navigateToDetailsPage = () => {
        navigate('/products/details', { state: { product: product } })
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <Box onClick={navigateToDetailsPage}>
                <CardMedia sx={{ pt: '100%', position: 'relative' }}>
                    <ProductImgStyle
                        alt="No Image"
                        src={url + imgeBaseUrl + product.photo}
                    />
                </CardMedia>
                <CardContent>
                    <Typography variant="subtitle2" noWrap>
                        {product.name}
                    </Typography>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        style={{ marginTop: '10px' }}
                    >
                        <Typography variant="subtitle1">
                            <Typography
                                component="span"
                                variant="body1"
                                sx={{
                                    color: 'text',
                                    textDecoration: '',
                                }}
                            >
                                Quantitiy: &nbsp;
                                {product.productQuantity}
                            </Typography>
                        </Typography>
                    </Stack>
                    <Typography variant="subtitle1">
                { product?.avgPrice === undefined ? <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: 'text',
                    textDecoration: ''
                  }}
                >
                  Avg. Price: &nbsp;
                N/A
                </Typography> : <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: 'text',
                    textDecoration: ''
                  }}
                >
                  Avg. Price: &nbsp;
                  {product?.avgPrice}
                </Typography> }

               </Typography>
                </CardContent>
            </Box>
            <CardActions>
                <Typography variant="subtitle1">
                    <Typography
                        component="span"
                        variant="body1"
                        sx={{
                            color: 'text.disabled',
                            textDecoration: '',
                        }}
                    >
                        <button onClick={delHandler}>
                            <DeleteIcon />
                        </button>
                        <button onClick={adiitHandler}>
                            <EditIcon />
                        </button>
                    </Typography>
                </Typography>
            </CardActions>
        </Card>
    )
}

export default ProductCard
