import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Switch, Grid, Card, Table, TableHead, TableBody } from '@mui/material'
import { Avatar, TableCell, TableRow } from '@mui/material'

import { Paragraph } from 'app/components/Typography'
const label = { inputProps: { 'aria-label': 'Switch demo' } }

const ProductTypeCard = ({ product, onEdit, onDelete }) => {
    const navigate = useNavigate()

    const adiitHandler = (adit) => {
        onEdit(product._id, product.name)
    }
    const delHandler = () => {
        onDelete(product._id)
    }

    return (
        <TableRow
            hover
            // onClick={()=>navigate("/products/details/main")}
        >
            <TableCell
                colSpan={5}
                align="left"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box>
                    <Paragraph sx={{ m: 0, ml: 1 }}>{product.name}</Paragraph>
                </Box>
            </TableCell>
            <TableCell
                align="center"
                colSpan={3}
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Switch {...label} defaultChecked />
            </TableCell>

            <TableCell sx={{ px: 0 }} align="center" colSpan={2}>
                <Button onClick={adiitHandler}>
                    <EditIcon />
                </Button>
            </TableCell>
            <TableCell sx={{ px: 0 }} align="center" colSpan={2}>
                <Button onClick={delHandler}>
                    <DeleteIcon color="error" />
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default ProductTypeCard
