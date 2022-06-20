import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { TableCell, TableRow } from '@mui/material'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'
import { Paragraph } from 'app/components/Typography'
import { useNavigate } from 'react-router-dom'

const BrandCard = ({brand, onEdit, onDelete}) => {

    const navigate = useNavigate()

    const adiitHandler = () => {
        onEdit(brand._id, brand.name)
    }
    const delHandler = () => {
         onDelete(brand._id)
    }

  return (
    <TableRow
            hover >
            <TableCell
                colSpan={4}
                align="center"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box display="flex" alignItems="left">
                    <Paragraph sx={{ m: 0, ml: 4 }}>{brand.name}</Paragraph>
                </Box>
            </TableCell>
            <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                <Button onClick={adiitHandler}>
                    <EditIcon />
                </Button>
            </TableCell>
            <TableCell sx={{ px: 0 }} align="left" colSpan={1}>
                <Button onClick={delHandler}>
                    <DeleteIcon />
                </Button>
            </TableCell>
        </TableRow>
  )
}

export default BrandCard