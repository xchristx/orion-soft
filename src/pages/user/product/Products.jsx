import { useSelector } from 'react-redux';

import AddEditProducto from './components/AddEditProducto';
import ProductosTableBody from './components/ProductosTableBody';
import RecordsLayout from '../../../layouts/dashboard/records/RecordsLayout';
// utils
import { TableBody, TableCell, TableRow } from '@mui/material';
import { resetFilteredData, setFilteredData } from '../../../redux/slices/product';
import useRecords from '../../../hooks/useRecords';
import AddIcon from '@mui/icons-material/Add';
import SearchNotFound from '../../../components/SearchNotFound';
import { getProductos } from './utils/getProductos';

const headLabel = [
  { id: 'img', label: 'Foto', alignRight: false },
  { id: 'nombre', label: 'Nombre', alignRight: false },
  { id: 'precioFacturado', label: 'Precio Facturado', alignRight: false },
  { id: 'precioNoFacturado', label: 'Precio No Facturado', alignRight: false },
  { id: 'cantidad', label: 'Cantidad', alignRight: false },
  { id: 'tipo', label: 'Tipo', alignRight: false },
  { id: 'detalles', label: 'Detalles', alignRight: false },
  { id: 'notas', label: 'Notas', alignRight: false },

  { id: 'moreMenu', label: '', alignRight: false },
];
const bcLinks = [
  { name: 'Inicio', href: '/dashboard/usuario' },
  { name: 'Productos', href: '/dashboard/usuario/ventas' },
];

export default function Productos() {
  const { data, filteredData, filter, isLoading, error } = useSelector(state => state.product);
  const {
    open,
    page,
    rowsPerPage,
    filtered,
    emptyRows,
    searchName,
    searchName2,
    order,
    orderBy,
    isNotFound,
    isNotFound2,
    handleChangeRowsPerPage,
    handleClose,
    handleOpen,
    onPageChange,
    handleRequestSort,
    handleSearchChange,
    handleSearchChange2,
    searchActive,
  } = useRecords({
    getters: [getProductos],
    data,
    filteredData,
    hasTwoSearch: false,
    searchFilter: 'nombre',
    reduxSlice: 'product',
    isLoading,
    error,
  });
  const isNotFoundAux = searchActive === 'search1' ? isNotFound : isNotFound2;
  return (
    <RecordsLayout
      // viene del custom hook
      searchValue={searchName} // estado que se crea en el useRecords
      searchValue2={searchName2} // estado que se crea en el useRecords
      handleSearchChange={handleSearchChange} // funcion para la busqueda que viene el useRecords
      handleSearchChange2={handleSearchChange2} // funcion para la busqueda que viene el useRecords
      page={page} // pagia ligado al paginado de la table viene del useRecords
      rowsPerPage={rowsPerPage} // para el paginado de la tabla
      handleChangeRowsPerPage={handleChangeRowsPerPage} // 'para el paginado de la tabla
      onPageChange={onPageChange} // para el paginado de la tabla
      handleOpen={handleOpen} // estado boleano para abrir el modal del formulario
      handleRequestSort={handleRequestSort} // funcion para el ordenamiento de la tabla, viene del useRecords
      order={order} // estado para manejar el ordenado de la tabla viene del useRecords
      orderBy={orderBy} // estado para manejar el ordenado de la tabla viene del useRecords
      // lo que debes editar de acuero al componente
      searchInput={true}
      searchInput2={false}
      data={data}
      buttonStartIcon={<AddIcon />}
      searchPlaceholder={'Buscar por nombre'} // placeHolder que tendra el input del buscador
      searchPlaceholder2={'Buscar por nombre'} // placeHolder que tendra el input del buscador
      handleFilter={setFilteredData} // funcion para manejar el filtrado de la tabla
      filterChipLabels={filter} // aqui poner un objeto que tenga esta estructura {name:'string' value:'string'} esto indica que filtro se esta aplicando
      handleResetFilter={resetFilteredData} // funcion tipo action que viene del store para eliminar el filtro aplicado
      emptyCondicion={Boolean(!data.length)} // condicion para mostrar en caso de que este la tabla vacia
      fullCondicion={Boolean(data.length)} // condicion para mostrar en caso de que se tenga datos
      paginationCount={data.length} // para el paginado de la tabla
      headTranslate="salesRecordsInputs." // string que identifica que grupo dentro de records usara el i18 para las traducciones
      pageTitle={'Clientes'} // title que viene en head del html
      GTLabels={{ buttonLabel: 'Nuevo producto', bcTitle: 'Productos' }} // labels para el toolbar
      bcLinks={bcLinks} // array de links que consumira Los breadcums
      headLabel={headLabel} // strings que tendran el head de la tabla de contenido, esta ligado al translategroup
      filterCells={['tipo']} // introducir array de los ids de las colunmas que contendran la funcion de filtrado
      disableOptions={['img', 'tallas', 'detalles', 'notas']} // array de las columnas que no tendran la opcion de ordenamiento
      addEditComponent={<AddEditProducto edit={false} open={open} onClose={handleClose} />} // componente que contiene el formulario para agregar nuevas filas
      isLoading={isLoading}
      error={error}
    >
      <ProductosTableBody fRecords={filtered} page={page} rowsPerPage={rowsPerPage} emptyRows={emptyRows} />
      {isNotFoundAux ? (
        <TableBody>
          <TableRow>
            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
              <SearchNotFound searchQuery={searchName} searchQuery2={searchName2} searchActive={searchActive} />
            </TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <></>
      )}
    </RecordsLayout>
  );
}
