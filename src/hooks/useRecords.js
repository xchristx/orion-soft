import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// notistack
import { useSnackbar } from 'notistack';
import { getValidationError } from '../utils/getValidationError';
// utils

export default function useRecords({ getters, ueDependencies, data, filteredData, searchFilter, hasTwoSearch = false }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.recibos);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dependecies = ueDependencies ? [dispatch].concat(ueDependencies) : [dispatch];

  const handleChangeRowsPerPage = value => {
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
  };

  const handleClose = e => setOpen(false);

  const handleOpen = e => setOpen(true);

  const onPageChange = (e, page) => setPage(page);
  const [searchName, setSearchName] = useState('');
  const [searchName2, setSearchName2] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(searchFilter);

  const [searchActive, setSearchActive] = useState('search1');

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filtered1 = applySortFilter(filteredData, getComparator(order, orderBy), searchName);
  const isNotFound1 = !filtered1.length && Boolean(searchName);

  const filtered2 = applySortFilter(filteredData, getComparator(order, orderBy), searchName2);
  const isNotFound2 = !filtered2.length && Boolean(searchName2);

  const filtered = searchActive === 'search1' ? filtered1 : filtered2;
  const isNotFound = searchActive === 'search1' ? isNotFound1 : isNotFound2;

  const handleSearchChange = e => {
    setSearchActive('search1');
    setSearchName(e.target.value);
  };
  const handleSearchChange2 = e => {
    setSearchActive('search2');
    setSearchName2(e.target.value);
  };
  const handleRequestSort = property => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return array.filter(_user => String(_user[searchFilter]).toLowerCase().indexOf(String(query).toLowerCase()) !== -1);
    }
    return stabilizedThis.map(el => el[0]);
  }
  useEffect(() => {
    getters.forEach(func => {
      dispatch(func());
    });
  }, dependecies);

  useEffect(() => {
    if (!isLoading && !!error) {
      enqueueSnackbar(getValidationError(error), { variant: 'error' });
    }
  }, [error]);
  return {
    open,
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
    handleClose,
    handleOpen,
    onPageChange,
    filtered,
    isNotFound,
    emptyRows,
    handleSearchChange,
    handleSearchChange2,
    handleRequestSort,
    searchName,
    searchName2,
    order,
    orderBy,
  };
}
useRecords.propTypes = {
  getters: PropTypes.array.isRequired,
  ueDependencies: PropTypes.array,
};

function descendingComparator(a, b, orderBy) {
  if (typeof a[orderBy] === 'string') {
    if (b[orderBy].toLowerCase() < a[orderBy].toLowerCase()) {
      return -1;
    }
    if (b[orderBy].toLowerCase() > a[orderBy].toLowerCase()) {
      return 1;
    }
    return 0;
  } else if (typeof a[orderBy] === 'number') {
    return parseFloat(a[orderBy]) - parseFloat(b[orderBy]);
  }
}
function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}
