import React from 'react'
import { Paragraph } from 'app/components/Typography'
import { Box, styled, useTheme } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import {
    Card,
    Icon,
    IconButton,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    MenuItem,
    Select,
} from '@mui/material'

const CardHeader = styled('div')(() => ({
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}))

const ProductTable = styled(Table)(() => ({
    minWidth: 400,
    whiteSpace: 'pre',
    '& small': {
        height: 15,
        width: 50,
        borderRadius: 500,
        boxShadow:
            '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    },
    '& td': {
        borderBottom: 'none',
    },
    '& td:first-of-type': {
        paddingLeft: '16px !important',
    },
}))

const Small = styled('small')(({ bgcolor }) => ({
    height: 15,
    width: 50,
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '4px',
    overflow: 'hidden',
    background: bgcolor,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}))

const ALLProductsTable = () => {
    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main
    const navigate = useNavigate()

    return (
        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <CardHeader>
                <Title>Apple MacBook X512FL-EJ723T 10th Gen Intel Core i9</Title>
            </CardHeader>
            <Box overflow="auto">
                <ProductTable>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ px: 3 }} colSpan={4}>
                                Office Address
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Price
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={2}>
                                Purchaser
                            </TableCell>
                            <TableCell sx={{ px: 0 }} colSpan={1}>
                                Vendor
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productList.map((product, index) => (
                            <TableRow key={index} hover onClick={()=>navigate("/products/details/main")}>
                                <TableCell
                                    colSpan={4}
                                    align="left"
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                    <Box display="flex" alignItems="center">
                                        <Avatar src={product.imgUrl} />
                                        <Paragraph sx={{ m: 0, ml: 4 }}>
                                            {product.location}
                                        </Paragraph>
                                    </Box>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    colSpan={2}
                                    sx={{ px: 0, textTransform: 'capitalize' }}
                                >
                                   
                                        {product.price} 
                                </TableCell>

                                <TableCell
                                    sx={{ px: 0 }}
                                    align="left"
                                    colSpan={2}
                                >
                            <Small bgcolor={bgSecondary}>
                                {product.purchaser} 
                                </Small>
                                </TableCell>
                                <TableCell sx={{ px: 0 }} colSpan={1}>
                                <Small bgcolor={bgPrimary}>
                                {product.vendor} 
                                </Small>
                                    
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </ProductTable>
            </Box>
        </Card>
    )
}

const productList = [
    {
        imgUrl: 'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
        location: 'CA-265, 7th Rd, Block F Satellite Town, Rawalpindi, 46300',
        price: 100000,
        purchaser: "Asad Ullah Baig",
        vendor: "Syed Rafay Javaid"
    },
    {
        imgUrl: 'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
        location: 'Office #304-B Amna Plaza, near Radio Pakistan, Rawalpindi',
        price: 110000,
        purchaser: "Asad Ullah Baig",
        vendor: "Syed Rafay Javaid"
    },
    {
        imgUrl: 'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
        location: 'Waheed Plaza, Blue Area,, G 6/2 Blue Area, Islamabad',
        price: 900000,
        purchaser: "Noor Imad Khan",
        vendor: "Syed Farhan Ali "
    },
    {
        imgUrl: 'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
        location: 'G-5/2 G-5, Islamabad, Islamabad Capital Territory 43600',
        price: 105000,
        purchaser: "Abu Bakkar Khan",
        vendor: "Khurram Shahzad"
    },
    {
        imgUrl: 'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
        location: 'Kashif Plaza، G-8 Markaz G 8 Markaz G-8, Islamabad',
        price: 110000,
        purchaser: "Khurram Shahzad",
        vendor: "Majeed Ahmed Ali"
    },
    {
        imgUrl: 'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
        location: 'STP -3, Block A, Ground Floor , I-9, Islamabad, 44000',
        price: 130000,
        purchaser: "Sarfarz Hassan",
        vendor: "Hassan Ali"
    },
    {
        imgUrl: 'https://sc04.alicdn.com/kf/Hb795434c17824a22a61ca30ba71d9384C.jpg',
        location: 'P583+2QC, Bani Gala, Islamabad, Islamabad Capital Territory',
        price: 115000,
        purchaser: "Zubair Ali khan",
        vendor: "Muzamil Iqrar"
    },
]

export default ALLProductsTable
