import { useNavigate } from 'react-router-dom'
// material
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
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
const PurchaseItemCard = ({ purchaseItem, onEdit, onDelete }) => {
    const navigate = useNavigate()
    const UserImgStyle = styled('img')({
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
    })
    const imgeBaseUrl = 'uploads/'

    const onDeleteHandler = () => {
        onDelete(purchaseItem._id)
    }

    const onEditHandler = () => {
        onEdit(purchaseItem._id, purchaseItem)
    }

    const navigateToDetailsPage = () => {
        navigate('/items/PurchasedItemsDetail', {
            state: { purchaseItem: purchaseItem },
        })
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <Box onClick={navigateToDetailsPage}>
                <CardMedia sx={{ pt: '100%', position: 'relative' }}>
                    <UserImgStyle
                        alt="No Image"
                        src={purchaseItem.QRCodeImage}
                    />
                </CardMedia>
                <CardContent>
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
                                Price: &nbsp;
                                {purchaseItem.price}
                            </Typography>
                        </Typography>
                    </Stack>
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
                                Quantity: &nbsp;
                                {purchaseItem.quantity}
                            </Typography>
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
                        <button onClick={onDeleteHandler}>
                            <DeleteIcon />
                        </button>
                        <button onClick={onEditHandler}>
                            <EditIcon />
                        </button>
                    </Typography>
                </Typography>
            </CardActions>
        </Card>
    )
}
export default PurchaseItemCard
