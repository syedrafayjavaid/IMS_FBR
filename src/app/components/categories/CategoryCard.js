import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'
// material
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Stack,
    Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import config from 'config'
import avatar from '../../views/AppUsers/a.png'

// ----------------------------------------------------------------------

const CategoryImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
})

// ----------------------------------------------------------------------

CategoryCard.propTypes = {
    category: PropTypes.object,
}

function CategoryCard({ category, onEdit, onDelete }) {
    const navigate = useNavigate()

    const imgeBaseUrl = 'uploads/'

    const adiitHandler = (adit) => {
        //  console.log(props, 'props');
        onEdit(category._id, category.name)
    }
    const delHandler = () => {
        onDelete(category._id)
    }

    const navigateToDetailsPage = () => {
        navigate('/categories/details', { state: { category: category } })
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <Box onClick={navigateToDetailsPage}>
                <CardMedia sx={{ pt: '100%', position: 'relative' }}>
                    <CategoryImgStyle
                        alt="No Image"
                        src={
                            category.photo === 'no-image' ||
                            category.photo === undefined
                                ? avatar
                                : config.base_url +
                                  '/' +
                                  imgeBaseUrl +
                                  category.photo
                        }
                    />
                </CardMedia>
                <CardContent>
                    <Typography variant="subtitle2" noWrap>
                        {category.name}
                    </Typography>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        style={{ marginTop: '1px' }}
                    >
                        <Typography variant="subtitle1">
                            <Typography
                                component="span"
                                variant="body1"
                                sx={{
                                    color: 'text.disabled',
                                    textDecoration: '',
                                }}
                            >
                                Quantitiy:
                            </Typography>
                            &nbsp;
                            {/* {price} */}
                        </Typography>
                    </Stack>
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

export default CategoryCard
