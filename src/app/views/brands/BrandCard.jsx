import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { TableCell, TableRow } from '@mui/material'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'
import { Paragraph } from 'app/components/Typography'
import moment from 'moment'

const BrandCard = ({ brand, onEdit, onDelete }) => {
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
                align="center"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box display="flex" alignItems="left">
                    <Paragraph sx={{ m: 0, ml: 1 }}>{brand.name}</Paragraph>
                </Box>
            </TableCell>
            <TableCell
                colSpan={3}
                align="left"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                  <Box>
                    <Paragraph sx={{ m: 0, ml: 1 }}>
                        {brand.createdAt === undefined
                                            ? 'N/A'
                                            : moment(
                                                brand.createdAt
                                              ).format('LL')}</Paragraph>
                  </Box>
            </TableCell>
            <TableCell
                colSpan={3}
                align="left"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box>
                    <Paragraph sx={{ m: 0, ml: 1 }}>{brand.modifiedAt === undefined  ? 'N/A'
                                            : moment(
                                                brand.createdAt
                                              ).format('LL')}</Paragraph>
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

export default BrandCard
