import React from 'react'
import { useNavigate } from 'react-router-dom'
// material
import {
    Box,
    Card,
    Link,
    Typography,
    Stack,
    CardMedia,
    CardContent,
    CardActions,
    Button,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const UsersCard = ({ user, onDelete, onEdit }) => {
    const navigate = useNavigate()
    const viewUser = (user) => {
        navigate('/user/details', { state: { id: user._id } })
        console.log('Card Clicked')
    }

    const UserImgStyle = styled('img')({
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
    })

    const url = 'http://192.168.18.117:5000/'
    const imgeBaseUrl = 'uploads/'

    const onEditHandler = () => {
        onEdit(user._id, user)
    }

    const onDeleteHandler = () => {
        onDelete(user._id)
    }

    const userId = user._id

    const navigateToDetailsPage = () => {
        navigate("/user/details", { state: { id: userId } })
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <Box
                onClick={navigateToDetailsPage}
            >
                <CardMedia sx={{ pt: '100%', position: 'relative' }}>
                    <UserImgStyle
                        alt="No Image"
                        src={url + imgeBaseUrl + user.photo}
                    />
                </CardMedia>
                <CardContent>
                    <Typography variant="subtitle2" noWrap>
                        {user.name}
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
                                Office: &nbsp;
                                {user.office}
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
                                CNIC: &nbsp;
                                {user.CNIC}
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

export default UsersCard
