import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
// @mui
import {
  Box,
  Card,
  Table,
  Modal,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import Fade from '@mui/material/Fade';
// import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import axios from 'axios';
import moment from 'moment/moment';
// components


import CreateProduct from '../../sections/@agency/product/CreateProduct';

import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections

import { ProductListHead, ProductListToolbar } from '../../sections/@agency/product';
// mock
// 
import { fCurrency } from '../../utils/formatNumber';
// ----------------------------------------------------------------------
const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 3,
};
const TABLE_HEAD = [
  { id: 'id', label: 'Mã đơn', alignRight: false },
  { id: 'code', label: 'Mã sản phẩm', alignRight: false },
  { id: 'quanity', label: 'Số lượng', alignRight: false },
  { id: 'from', label: 'Nguồn hàng', alignRight: false },
  { id: 'createdAt', label: 'Ngày giao', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.code.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ImportPage() {
  const [open, setOpen] = useState(null);
  const [test,setTest] = useState([]);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('code');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [createPanelOpen, setCreatePanelOpen] = useState(false);
  const [createOpenEdit, setOpenEdit] = useState(false);
  const [PRODUCTLIST, setProductList] = useState([]);
  const [rowData, setRowData] = useState({ idDelivery:'', code:'', quantity: '', });
  const [id, setId] = useState('');
  const columnsPanel = useMemo(
    () => [
      {
        accessorKey: 'code',
        header: 'Name',
      },
      {
        accessorKey: 'username',
        header: 'Username',
      },
      {
        accessorKey: 'password',
        header: 'Password'
      },
      {
        accessorKey: 'role',
        header: 'Role',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'sdt',
        header: 'Phone',
      },

    ],
    [],
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/delivery/fta-delivering/${localStorage.getItem('id')}`);
        
        setProductList(res.data);
     
      } catch (err) {
        // console.log('fe : ' + err.message);
      }
    };
    getData();
  }, []);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = PRODUCTLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, code) => {
    const selectedIndex = selected.indexOf(code);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, code);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/factory/import-product`, rowData
      );

      window.location.reload();


    } catch (err) {
      console.log(err.message);
    }
  };
  const handleImport = async (idD) => {
    try {
        console.log(rowData);
      const res = await axios.post(`http://localhost:8000/agency/submit-fta`, {idDelivery: idD}
      );

      window.location.reload();


    } catch (err) {
      console.log(err.message);
    }
  };
  const handleDelete = () => {
    console.log(id);
    axios.delete(`http://localhost:8000/user/delete/${id}`);
    window.location.reload();
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - PRODUCTLIST.length) : 0;

  const filteredUsers = applySortFilter(PRODUCTLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Nhập sản phẩm
          </Typography>
          <Button variant="contained" onClick={() => setCreatePanelOpen(true)} startIcon={<Iconify icon="eva:plus-fill" />}>
            Thêm sản phẩm
          </Button>
          <CreateProduct
            columns={columnsPanel}
            open={createPanelOpen}
            onClose={() => setCreatePanelOpen(false)}
          />
        </Stack>

        <Card>
          <ProductListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProductListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={PRODUCTLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, code, quantity, from, createdAt, updatedAt, _v } = row;
                    
                      // console.log(test);
                    const selectedUser = selected.indexOf(code) !== -1;
                    return (
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell/>

                        <TableCell align='left'>{_id}</TableCell>

                        <TableCell align="left">{code}</TableCell>

                        <TableCell align="left">{quantity}</TableCell>

                        <TableCell align="left">{from}</TableCell>

                        <TableCell align="left">{createdAt}</TableCell>

                        <TableCell align="right">
                          <Button onClick={() => {
                            handleImport(row._id);
                            }}>
                            Nhận hàng
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={PRODUCTLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={createOpenEdit}
        onClose={() => setOpenEdit(false)}
        closeAfterTransition
      >
        <Fade in={createOpenEdit}>
          <Box sx={styleModal}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Thêm sản phẩm vào kho
            </Typography>
            <ValidatorForm onSubmit={handleUpdate}>
              <TextValidator
                sx={{ marginTop: '10px' }}
                fullWidth
                value={localStorage.getItem('id')}
                label="Mã kho"
                variant="standard"
                color="secondary"
              // disabled
              />
              <TextValidator
                sx={{ marginTop: '10px' }}
                fullWidth
                value={rowData.code}
                label="Name"
                variant="standard"
                color="secondary"
              // disable
              />
              <TextValidator
                sx={{ marginTop: '10px' }}
                fullWidth
                label="Số lượng"
                variant="standard"
                color="secondary"
                onChange={(e) => {
                  setRowData(rowData => ({
                    ...rowData,
                    quantity: e.target.value,
                  }))
                }}
              />
              <Button
                sx={{ marginTop: '10px' }}
                variant="contained"
                //      startIcon={<SendIcon />}
                fullWidth
                type="submit"
              >
                Thêm
              </Button>
            </ValidatorForm>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
