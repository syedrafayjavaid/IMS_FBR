import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { TableCell, TableRow } from '@mui/material'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'
import { Paragraph } from 'app/components/Typography'
import { useNavigate } from 'react-router-dom'

const DepartmentCard = ({ brand, onEdit, onDelete }) => {
    const navigate = useNavigate()

    const adiitHandler = () => {
        onEdit(brand._id, brand.name)
    }
    const delHandler = () => {
        onDelete(brand._id)
    }

    return (
        <TableRow hover>
            <TableCell
                colSpan={6}
                align="left"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box>
                    <Paragraph sx={{ m: 0, ml: 1 }}>{brand.name}</Paragraph>
                </Box>
            </TableCell>
            <TableCell sx={{ px: 0 }} align="center" colSpan={3}>
                <Button onClick={adiitHandler}>
                    <EditIcon />
                </Button>
            </TableCell>
            <TableCell sx={{ px: 0 }} align="center" colSpan={3}>
                <Button onClick={delHandler}>
                    <DeleteIcon color="error" />
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default DepartmentCard
