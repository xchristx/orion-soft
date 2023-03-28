import PropTypes from 'prop-types';
// @mui
import { Box, Table, Divider, TableRow, TableBody, TableCell, TableHead, Typography, IconButton, TableContainer } from '@mui/material';
// utils
import getColorName from '../../../../../utils/getColorName';
import { fCurrency } from '../../../../../utils/formatNumber';
// components
import Image from '../../../../../components/Image';
import Iconify from '../../../../../components/Iconify';
import VerTallas from './VerTallas';
import { useState } from 'react';

// ----------------------------------------------------------------------

CheckoutProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
};

export default function CheckoutProductList({ products, onDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map(product => {
            const { id, Nombre, tallas, precio, color, img, cantidad } = product;
            return (
              <TableRow key={id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image alt="product image" src={img} sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }} />
                    <Box>
                      <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
                        {Nombre}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <VerTallas open={open} setOpen={setOpen} sizes={tallas} />
                        <Divider orientation="vertical" sx={{ mx: 1, height: 16 }} />
                        <Typography variant="body2">
                          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                            color:&nbsp;
                          </Typography>
                          {getColorName(color)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell align="left">{fCurrency(precio)}</TableCell>

                <TableCell align="center">
                  <Typography>{cantidad} prs.</Typography>
                </TableCell>

                <TableCell align="right">{fCurrency(precio * cantidad)}</TableCell>

                <TableCell align="right">
                  <IconButton onClick={() => onDelete(id)}>
                    <Iconify icon={'eva:trash-2-outline'} width={20} height={20} />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ----------------------------------------------------------------------
