import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// MUI
import { Alert, LinearProgress, Table, TableContainer, TablePagination } from '@mui/material';
// components
import Page from '../../../components/Page';
import GenericToolbar from '../../../components/GenericToolbar';
import FilterOrderTableHead from '../../../components/FilterOrderTableHead';
import Scrollbar from '../../../components/scrollbar/Scrollbar';
// utils

export default function RecordsLayout({
  breadcrumbs = true,
  idValue,
  emptyCondicion,
  fullCondicion,
  emptyMessage,
  selectMessage,
  bcLinks,
  headLabel,
  headTranslate,
  pageTitle,
  GTLabels,
  page,
  rowsPerPage,
  paginationCount,
  handleChangeRowsPerPage,
  handleOpen,
  onPageChange,
  children,
  addEditComponent,
  searchInput,
  searchInput2,
  searchPlaceholder,
  searchPlaceholder2,
  searchValue,
  searchValue2,
  handleSearchChange,
  handleSearchChange2,
  handleRequestSort,
  handleFilter,
  order,
  orderBy,
  disableOptions = [],
  filterCells = [],
  filterChipLabels,
  handleResetFilter,
  data,
}) {
  // Added the translation for the tittle and other translations
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.recibos);

  return (
    <Page title={pageTitle}>
      <GenericToolbar
        searchPlaceholder={searchPlaceholder}
        searchPlaceholder2={searchPlaceholder2}
        searchValue={searchValue}
        searchValue2={searchValue2}
        handleSearchChange={handleSearchChange}
        handleSearchChange2={handleSearchChange2}
        searchInput={searchInput}
        searchInput2={searchInput2}
        breadcrumbs={breadcrumbs}
        hasMenu={false}
        idValue={idValue}
        bcLinks={bcLinks}
        handleClickOpen={handleOpen}
        error={!!error}
        isLoading={isLoading}
        labels={GTLabels}
        filterChipLabels={filterChipLabels}
        handleResetFilter={() => dispatch(handleResetFilter())}
      />

      {addEditComponent}

      {isLoading ? (
        <LinearProgress sx={{ my: 5 }} />
      ) : error ? (
        <p>error</p>
      ) : emptyCondicion ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          {'Agregar registros primero'}
        </Alert>
      ) : fullCondicion ? (
        <Scrollbar sx={{ maxHeight: '50%' }}>
          <TableContainer sx={{ minWidth: 600, my: 1, p: 0 }}>
            <Table stickyHeader>
              <FilterOrderTableHead
                headLabels={headLabel}
                handleRequestSort={handleRequestSort}
                order={order}
                orderBy={orderBy}
                disableOptions={disableOptions}
                filterCells={filterCells}
                translateGroup={headTranslate}
                handleFilter={handleFilter}
                allData={data}
              />
              {children}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={paginationCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={e => handleChangeRowsPerPage(e.target.value)}
          />
        </Scrollbar>
      ) : (
        <Alert severity="info" sx={{ mt: 2 }}>
          {' '}
          {'Seleccionar primero'}
        </Alert>
      )}
    </Page>
  );
}

RecordsLayout.propTypes = {
  breadcrumbs: PropTypes.bool,
  searchInput: PropTypes.bool,
  searchInput2: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  searchPlaceholder2: PropTypes.string,
  searchValue: PropTypes.string,
  searchValue1: PropTypes.string,
  idValue: PropTypes.string,
  emptyCondicion: PropTypes.bool.isRequired,
  fullCondicion: PropTypes.bool.isRequired,
  emptyMessage: PropTypes.string,
  selectMessage: PropTypes.string,
  headTranslate: PropTypes.string.isRequired,
  bcLinks: PropTypes.array.isRequired,
  headLabel: PropTypes.array.isRequired,
  pageTitle: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  GTLabels: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  paginationCount: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func,
  handleSearchChange2: PropTypes.func,
  handleOpen: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  handleResetFilter: PropTypes.func.isRequired,
  handleRequestSort: PropTypes.func.isRequired,
  children: PropTypes.any,
  addEditComponent: PropTypes.element,
  disableOptions: PropTypes.array,
  filterCells: PropTypes.array,
  filterChipLabels: PropTypes.object,
  data: PropTypes.array.isRequired,
};
