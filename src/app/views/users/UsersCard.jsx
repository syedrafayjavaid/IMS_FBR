import { useNavigate } from 'react-router-dom'
// material
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
    Box,
    Card, CardActions, CardContent, CardMedia, Stack, Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'
import config from 'config'
import avatar from '../AppUsers/a.png'

const UsersCard = ({ user, onDelete, onEdit }) => {
    const navigate = useNavigate()

    const UserImgStyle = styled('img')({
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
    })


      
    const imgeBaseUrl = 'uploads/'

    const onEditHandler = () => {
        onEdit(user._id, user)
    }

    const onDeleteHandler = () => {
        onDelete(user._id)
    }

    const navigateToDetailsPage = () => {
        navigate("/user/details", { state: { user: user } })
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <Box
                onClick={navigateToDetailsPage}
            >
                <CardMedia sx={{ pt: '100%', position: 'relative' }}>
                    <UserImgStyle
                        alt='No Image'
                        src={
                            // user.photo !== 'no-image' ? config.base_url + '/' + imgeBaseUrl + user.photo : avatar
                    
                        user.photo === 'No Image' ||
                        user.photo === 'undefined'
                            ? avatar
                            : config.base_url +
                              '/' +
                              imgeBaseUrl +
                              user.photo
                    }
                     
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
                                Name: &nbsp;
                                {user.name}
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
                                Email: &nbsp;
                                {user.emailAddress}
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
