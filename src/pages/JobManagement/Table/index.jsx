import {
    Checkbox,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Tooltip,
} from '@mui/material';
import { useEffect, useState } from 'react';
import EnhancedTableHead from './EnhancedTableHead';
import handleClickRow from './handleClickRow';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import { fetchListJobByCompany } from '../../../services/jobService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faMagnifyingGlass,
    faPenToSquare,
    faTrash,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import InputTextIcon from '../../../components/InputTextIcon';
import { fetchListProvince } from '../../../services/addressService';

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
    const className = 'text-xl';

    const navigate = useNavigate();

    const [orderDir, setOrderDir] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [rows, setRows] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [condition, setCondition] = useState({
        keyword: '',
        address: 'all',
    });

    useEffect(() => {
        fetchListProvince().then((data) => setProvinces(data.data));
    }, []);

    useEffect(() => {
        const queryString = new URLSearchParams(condition);
        fetchListJobByCompany(
            pageSize,
            currentPage,
            orderBy,
            orderDir,
            queryString,
        ).then((data) => {
            setRows(data.data);
            setCurrentPage(data.meta.currentPage);
            setPageSize(data.meta.pageSize);
            setTotalItem(data.meta.totalItems);
        });
    }, [condition, pageSize, currentPage, orderBy, orderDir]);

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

    const handleAppliedCandidateList = (jobId) => {
        navigate(`/jobs/job-detail/applied-candidate/${jobId}`);
    };

    const handleDetailJob = (jobId) => {
        navigate(`/jobs/job-detail/${jobId}`);
    };

    const handleEditJob = (jobId) => {
        navigate(`/jobs/job-detail/edit-job/${jobId}`);
    };

    const handleHiddenJob = (jobId) => {};

    return (
        <div>
            <div className="mb-4 flex w-full flex-grow items-center rounded-md">
                <InputTextIcon
                    placeholder="Tìm kiếm theo tên công việc"
                    value={condition?.keyword || ''}
                    onChange={(e) =>
                        setCondition({ ...condition, keyword: e.target.value })
                    }
                    className="h-10 w-full"
                    classInput="rounded-r-none"
                    leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                />
                <FormControl sx={{ width: '200px' }} size="small">
                    <InputLabel id="filter-address-label">Địa chỉ</InputLabel>
                    <Select
                        labelId="filter-address-label"
                        label="Địa chỉ"
                        value={condition?.address}
                        onChange={(e) =>
                            setCondition({
                                ...condition,
                                address: e.target.value,
                            })
                        }
                    >
                        <MenuItem value="all">
                            <em>Tất cả</em>
                        </MenuItem>
                        {provinces.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
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
                                        <TableCell
                                            sx={{
                                                maxWidth: '300px',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '190px',
                                            }}
                                        >
                                            {row.postingTime}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '100px',
                                                textAlign: 'right',
                                            }}
                                        >
                                            {row.numberOfView}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: '100px',
                                                textAlign: 'right',
                                            }}
                                        >
                                            {row.numberOfApplicated}
                                        </TableCell>
                                        <TableCell sx={{ maxWidth: '100px' }}>
                                            <div className="flex items-center justify-between pl-3">
                                                <Tooltip title="Xem danh sách Ứng viên">
                                                    <button
                                                        onClick={() =>
                                                            handleAppliedCandidateList(
                                                                row.id,
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            className={clsx(
                                                                className,
                                                                'text-primary',
                                                            )}
                                                            icon={faUsers}
                                                        />
                                                    </button>
                                                </Tooltip>
                                                <Tooltip title="Xem chi tiết Tin tuyển dụng">
                                                    <button
                                                        onClick={() =>
                                                            handleDetailJob(
                                                                row.id,
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            className={clsx(
                                                                className,
                                                                'text-sky-400',
                                                            )}
                                                            icon={faEye}
                                                        />
                                                    </button>
                                                </Tooltip>
                                                <Tooltip title="Chỉnh sửa tin tuyển dụng">
                                                    <button
                                                        onClick={() =>
                                                            handleEditJob(
                                                                row.id,
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            className={clsx(
                                                                className,
                                                                'text-yellow',
                                                            )}
                                                            icon={faPenToSquare}
                                                        />
                                                    </button>
                                                </Tooltip>
                                                <Tooltip title="Ẩn tin tuyển dụng">
                                                    <button
                                                        onClick={() =>
                                                            handleHiddenJob(
                                                                row.id,
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            className={clsx(
                                                                className,
                                                                'text-rose-500',
                                                            )}
                                                            icon={faTrash}
                                                        />
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
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
        numeric: false,
        disablePadding: false,
        label: 'Ngày tạo',
        sort: true,
    },
    {
        id: 'numberOfView',
        numeric: true,
        disablePadding: true,
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
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: 'Hành Động',
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
