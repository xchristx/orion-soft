import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  TableContainer,
  Chip,
} from '@mui/material';
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
            <TableCell>Producto</TableCell>
            <TableCell align="left">Precio</TableCell>
            <TableCell align="left">Cantidad</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product, i) => {
            const { uid, nombre, tallas, precio, color, img, cantidad, iva } = product;
            return (
              <TableRow key={i}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image alt="product image" src={img} sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }} />
                    <Box>
                      <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
                        {nombre}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <VerTallas open={open} setOpen={setOpen} sizes={tallas} product={product} />
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

                <TableCell align="left">
                  <Chip color={iva ? 'info' : 'default'} label={fCurrency(precio)} />
                </TableCell>

                <TableCell align="center">
                  <Typography>{cantidad} prs.</Typography>
                </TableCell>

                <TableCell align="right">
                  <Chip color={iva ? 'info' : 'default'} label={fCurrency(precio * cantidad)} />
                </TableCell>

                <TableCell align="right">
                  <IconButton onClick={() => onDelete(uid)}>
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
