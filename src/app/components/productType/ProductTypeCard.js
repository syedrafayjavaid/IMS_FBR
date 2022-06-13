import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box} from '@mui/system'
import { useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
    Switch,
    Grid,
      Card,
      Table,
      TableHead,
   
      TableBody,
    
  } from '@mui/material'
import {
    Avatar, TableCell, TableRow
} from '@mui/material';

import { Paragraph } from 'app/components/Typography';

const ProductTypeCard = ({product, onEdit, onDelete}) => {

    const navigate = useNavigate()
    const url='http://192.168.18.117:5000/';
    
  
  
     const adiitHandler = (adit) =>{
        console.log('props the producttype card');
    
     }
     const delHandler = () =>{
    //   onDelete(_id)
      }

  return (
    <TableRow hover 
                            // onClick={()=>navigate("/products/details/main")}
                            >
                                <TableCell
                                    colSpan={4}
                                    align="left"
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                    <Box display="flex" alignItems="center">
                                        <Avatar src={product.coverImage} />
                                        <Paragraph sx={{ m: 0, ml: 4 }}>
                                            {product.name}
                                        </Paragraph>
                                    </Box>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    colSpan={2}
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                   
                                        {product.category} 
                                </TableCell>

                                <TableCell
                                    sx={{ px: 0 }}
                                    align="left"
                                    colSpan={2}
                                       >
                                         <Button onClick={adiitHandler}>
                                  <EditIcon  />
                                  </Button>
                                </TableCell>
                                <TableCell sx={{ px: 0 }} colSpan={1}>
                   
                                <Button onClick={delHandler}>
                               <DeleteIcon  />
                               </Button>
                                                      
                                </TableCell>
                            </TableRow>
  )
}

export default ProductTypeCard