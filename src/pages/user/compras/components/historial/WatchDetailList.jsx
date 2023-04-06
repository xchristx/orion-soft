import PropTypes from 'prop-types';
// @mui
import { Box, Table, Divider, TableRow, TableBody, TableCell, TableHead, Typography, TableContainer, Chip, Stack } from '@mui/material';
// utils
import getColorName from '../../../../../utils/getColorName';
import { fCurrency } from '../../../../../utils/formatNumber';
// components
import Image from '../../../../../components/Image';
import { useState } from 'react';
import VerTallas from '../checkout/VerTallas';
import { sentenceCase } from 'change-case';

// ----------------------------------------------------------------------

WatchDetailList.propTypes = {
  products: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
};

export default function WatchDetailList({ products }) {
  const [open, setOpen] = useState(false);
  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell align="center">Precio</TableCell>
            <TableCell align="center">Cantidad</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="center" />
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product, i) => {
            const { nombre, tallas, precio, color, img, cantidad, iva, estado } = product;
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

                <TableCell align="center">
                  <Chip color={iva ? 'info' : 'default'} label={fCurrency(precio)} />
                </TableCell>

                <TableCell align="center">
                  <Typography>{cantidad} prs.</Typography>
                </TableCell>

                <TableCell align="right">
                  <Chip color={iva ? 'info' : 'default'} label={fCurrency(precio * cantidad)} />
                </TableCell>
                <TableCell align="center">
                  <Stack>
                    <Chip
                      color={
                        (estado.estado === 'pAceptar'
                          ? 'warning'
                          : estado.estado === 'aceptado'
                          ? 'info'
                          : estado.estado === 'recibido'
                          ? 'success'
                          : 'error') ||
                        (estado === 'enProceso' && 'warning') ||
                        'success'
                      }
                      label={sentenceCase(estado.estado)}
                    />
                    {estado.responsable && (
                      <Box component="p" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                        aceptado por: {estado.responsable}
                      </Box>
                    )}
                  </Stack>
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
