import {
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import EnhancedTableHead from './EnhancedTableHead';
import handleClickRow from './handleClickRow';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import { fetchListJobByCompany } from '../../../services/jobService';

// const rowData = [
//     {
//         id: 8,
//         name: 'Nhân Viên Tư Vấn Tuyển Sinh Chỉ Tuyển Nữ, Kinh Nghiệm Telesales Từ 6 Tháng Trở Lên',
//         postingTime: '10:46 09-09-2024',
//         numberOfView: 10,
//         numberOfApplicated: 5,
//         applicationRate: 0.0,
//     },
//     {
//         id: 9,
//         name: 'Nhân Viên Tư Vấn Tuyển Sinh Chỉ Tuyển Nữ, Kinh Nghiệm Telesales Từ 6 Tháng Trở Lên',
//         postingTime: '10:57 09-09-2024',
//         numberOfView: 10,
//         numberOfApplicated: 5,
//         applicationRate: 0.0,
//     },
//     {
//         id: 10,
//         name: 'Nhân Viên Tư Vấn Tuyển Sinh Chỉ Tuyển Nữ, Kinh Nghiệm Telesales Từ 6 Tháng Trở Lên',
//         postingTime: '11:12 09-09-2024',
//         numberOfView: 10,
//         numberOfApplicated: 5,
//         applicationRate: 0.0,
//     },
//     {
//         id: 11,
//         name: 'Nhân Viên Tư Vấn Tuyển Sinh Chỉ Tuyển Nữ, Kinh Nghiệm Telesales Từ 6 Tháng Trở Lên',
//         postingTime: '11:54 18-09-2024',
//         numberOfView: 10,
//         numberOfApplicated: 5,
//         applicationRate: 0.0,
//     },
//     {
//         id: 12,
//         name: 'Test1',
//         postingTime: '11:56 18-09-2024',
//         numberOfView: 10,
//         numberOfApplicated: 5,
//         applicationRate: 0.0,
//     },
// ];

export default function MyTable() {
    const [orderDir, setOrderDir] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetchListJobByCompany(pageSize, currentPage, orderBy, orderDir).then(
            (data) => {
                setRows(data.data);
                setCurrentPage(data.meta.currentPage);
                setPageSize(data.meta.pageSize);
                setTotalItem(data.meta.totalItems);
            },
        );
    }, [pageSize, currentPage, orderBy, orderDir]);

    const handleSelectAllClick = (e) => {
        if (e.target.checked) {
            const newSelected = rows.map((item) => item.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleRequestSort = (e, property) => {
        const isAsc = orderBy === property && orderDir == 'asc';
        setOrderDir(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    const emptyRows =
        currentPage > 0
            ? Math.max(0, (1 + currentPage) * pageSize - rows.length)
            : 0;

    return (
        <div>
            <Paper sx={{ width: '100%' }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    title="Danh sách tin tuyển dụng"
                />
                <TableContainer>
                    <Table aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            headCells={headCellList}
                            numSelected={selected.length}
                            rowCount={rows.length}
                            onSelectAllClick={handleSelectAllClick}
                            orderDir={orderDir}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {rows?.map((row, index) => {
                                const isItemSelected = selected.includes(
                                    row.id,
                                );

                                return (
                                    <TableRow
                                        hover
                                        key={row.id}
                                        role="checkbox"
                                        tabIndex={-1}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() =>
                                            setSelected(
                                                handleClickRow(
                                                    selected,
                                                    row.id,
                                                ),
                                            )
                                        }
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                            />
                                        </TableCell>
                                        {columnData.map((item, index) => (
                                            <TableCell
                                                key={index}
                                                align="justify"
                                            >
                                                {row[item]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })}
                            {/* {emptyRows > 0 &&
                                [...Array(emptyRows)].map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell colSpan={7} />
                                    </TableRow>
                                ))} */}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalItem}
                    rowsPerPage={pageSize}
                    page={currentPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

const headCellList = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Tin tuyển dụng',
        sort: true,
    },
    {
        id: 'postingTime',
        numeric: true,
        disablePadding: false,
        label: 'Ngày tạo',
        sort: true,
    },
    {
        id: 'numberOfView',
        numeric: true,
        disablePadding: false,
        label: 'Số lượt xem',
        sort: true,
    },
    {
        id: 'numberOfApplicated',
        numeric: true,
        disablePadding: false,
        label: 'Số lượt ứng tuyển',
        sort: true,
    },
    {
        id: 'applyRating',
        numeric: true,
        disablePadding: false,
        label: 'Tỷ lệ ứng tuyển',
        sort: false,
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Thao tác',
        sort: false,
    },
];

const columnData = [
    'name',
    'postingTime',
    'numberOfView',
    'numberOfApplicated',
    'applyRating',
];
