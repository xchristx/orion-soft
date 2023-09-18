import PropTypes from 'prop-types';
import { Chip, TableBody, TableCell, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import StaffInfoMoreMenu from './ProductosMoreMenu';
import { deleteProducto } from '../../../../redux/actions/productActions';
import { ProductDetalleDialog } from './ProductDetalleDialog';
import ImageGallery from 'react-image-gallery';
import useResponsive from '../../../../hooks/useResponsive';

export default function ClientesTableBody({ fRecords, page, rowsPerPage, emptyRows }) {
  const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'lg');

  const handleDelete = async id => {
    dispatch(deleteProducto(id));
  };

  return (
    <TableBody>
      {fRecords?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        const { img, nombre, precio, cantidad, tallas, tipo, detalles, uid, proveedor } = row;
        const galleryImages = img.length
          ? img.map(el => ({
              original: el.uploadInfo?.secure_url,
              thumbnail: el.uploadInfo?.thumbnail_url,
              originalWidth: '150px',
              originalHeight: '150px',
              thumbnailHeight: '50px',
              thumbnailWidth: '50px',
            }))
          : [
              {
                original: '/assets/predeterminado.png',
                thumbnail: '/assets/predeterminado.png',
                originalWidth: '150px',
                originalHeight: '150px',
                thumbnailHeight: '50px',
                thumbnailWidth: '20px',
              },
            ];
        return (
          <TableRow hover key={uid} tabIndex={-1}>
            <TableCell align="center" sx={{ width: { xs: 150, sm: 250 } }}>
              <ImageGallery
                items={galleryImages}
                showThumbnails={false}
                showFullscreenButton={false}
                showPlayButton={false}
                showNav={isDesktop}
                autoPlay={isDesktop}
              />
            </TableCell>
            <TableCell align="center">{nombre || '---'}</TableCell>
            <TableCell align="center">{proveedor?.nombre || '---'}</TableCell>
            <TableCell align="center">{parseFloat(precio.facturado).toLocaleString('es-MX') + ' bs.' || '---'}</TableCell>
            <TableCell align="center">{parseFloat(precio.noFacturado).toLocaleString('es-MX') + ' bs.' || '---'}</TableCell>
            <TableCell align="center">
              <Chip color={cantidad > 5 ? 'info' : 'error'} label={cantidad.toLocaleString('es-MX') + ' prs.' || '---'} />
            </TableCell>
            <TableCell align="center">{tipo || '---'}</TableCell>
            <TableCell align="center">
              <ProductDetalleDialog detalleVenta={detalles} tallas={tallas} />
            </TableCell>

            <TableCell>
              <StaffInfoMoreMenu onDelete={() => handleDelete(uid)} editInfo={row} />
            </TableCell>
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={5} />
        </TableRow>
      )}
    </TableBody>
  );
}

ClientesTableBody.propTypes = {
  isLoading: PropTypes.bool,
  fRecords: PropTypes.array,
  products: PropTypes.array,
  currentFarm: PropTypes.object,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  emptyRows: PropTypes.number,
};
