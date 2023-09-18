import PropTypes from 'prop-types';
import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
  DialogActions,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import styled from '@emotion/styled';
import { useState } from 'react';
import DetallesList from './DetallesList';
import useResponsive from '../../../../hooks/useResponsive';
import Scrollbar from '../../../../components/scrollbar/Scrollbar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.black,
    margin: 0,
    padding: 0,
    paddingLeft: 10,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    margin: 0,
    padding: 0,
    paddingLeft: 10,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
export const ProductDetalleDialog = ({ detalleVenta, tallas }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const isMobile = useResponsive('down', 'md');

  return (
    <div>
      <Chip color="primary" onClick={handleClickOpen} label="ver" />

      <Dialog fullScreen={isMobile} fullWidth open={open} onClose={() => setOpen(false)} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Ver Detalles'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <DetallesList detalles={detalleVenta} />
            </Grid>
            <Grid item xs={12}>
              <Divider variant="fullWidth" sx={{ borderStyle: 'dashed' }} />
            </Grid>
            <Grid item xs={12}>
              <TableContainer sx={{ display: 'flex', justifyContent: 'center' }}>
                <Scrollbar>
                  <Table>
                    <TableHead>
                      <StyledTableRow>
                        {tallas.map((el, i) => (
                          <StyledTableCell align="center" key={i}>
                            {' '}
                            {el.size}{' '}
                          </StyledTableCell>
                        ))}
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      <StyledTableRow>
                        {tallas.map((el, i) => (
                          <StyledTableCell align="center" key={i}>
                            {' '}
                            {el.value}{' '}
                          </StyledTableCell>
                        ))}
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ProductDetalleDialog.propTypes = {
  detalleVenta: PropTypes.object,
  tallas: PropTypes.array,
};
