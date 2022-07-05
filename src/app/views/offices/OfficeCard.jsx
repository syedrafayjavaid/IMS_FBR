import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { TableCell, TableRow } from '@mui/material'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'
import { Paragraph } from 'app/components/Typography'
import { useNavigate } from 'react-router-dom'

const OfficeCard = ({office, onEdit, onDelete}) => {

    const navigate = useNavigate()

    const adiitHandler = (adit) => {
        onEdit(office._id, office.name, office.address, office.city, office.longitude, office.latitude);
    }
    const delHandler = () => {
        onDelete(office._id)
    }

 

  return (
    <TableRow
            hover >
            <TableCell
                colSpan={2}
                align="left"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 4 }}>{office.name}</Paragraph>
                </Box>
            </TableCell>
            <TableCell
                colSpan={2}
                align="left"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 4 }}>{office.address}</Paragraph>
                </Box>
            </TableCell>
            <TableCell
                colSpan={2}
                align="left"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 4 }}>{office.city}</Paragraph>
                </Box>
            </TableCell>
            <TableCell
                colSpan={2}
                align="left"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 4 }}>{office.longitude}</Paragraph>
                </Box>
            </TableCell>
            <TableCell
                colSpan={2}
                align="left"
                sx={{ px: 0, textTransform: 'capitalize' }}
            >
                <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 4 }}>{office.latitude}</Paragraph>
                </Box>
            </TableCell>
            <TableCell sx={{ px: 0 }} align="left" colSpan={1}>
                <Button onClick={adiitHandler}>
                    <EditIcon />
                </Button>
            </TableCell>
            <TableCell sx={{ px: 0 }} colSpan={1}>
                <Button onClick={delHandler}>
                    <DeleteIcon />
                </Button>
            </TableCell>
        </TableRow>
  )
}

export default OfficeCard