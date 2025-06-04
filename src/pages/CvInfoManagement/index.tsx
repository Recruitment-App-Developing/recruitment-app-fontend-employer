import React, { useEffect, useState } from 'react';
import { CvInforItem } from './cvInforType';
import { fetchListCvInfor } from '../../services/cvInforService';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import UploadPdfFolderModal from './UploadCv/UploadCvModal';

export default function CvInforList() {
    const [cvInforList, setCvInfoList] = useState<CvInforItem[]>([]);
    const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const temp = await fetchListCvInfor();
            console.log(temp.data);
            setCvInfoList(temp.data);
        };

        fetchData();
    }, []);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDetail = (cvInforId: string) => {
        navigate(`/cvs-management/detail/${cvInforId}`);
    };

    return (
        <div className="w-full overflow-hidden">
            <button
                onClick={() => setIsOpenAdd(true)}
                className="flex items-center gap-4 bg-stone-300 px-3 py-2"
            >
                <FontAwesomeIcon icon={faPlusCircle} />
                <span>Upload CV ứng viên</span>
            </button>
            {isOpenAdd && (
                <UploadPdfFolderModal
                    open={isOpenAdd}
                    onClose={() => setIsOpenAdd(false)}
                />
            )}
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align={'left'} style={{}}>
                                    Tên ứng viên
                                </TableCell>
                                <TableCell align={'right'} style={{}}>
                                    Tên CV
                                </TableCell>
                                <TableCell align={'right'} style={{}}>
                                    Vị trí ứng tuyển
                                </TableCell>
                                <TableCell align={'right'} style={{}}>
                                    Địa chỉ
                                </TableCell>
                                <TableCell align={'right'} style={{}}>
                                    Giải thưởng
                                </TableCell>
                                <TableCell align={'right'} style={{}}>
                                    Học vấn
                                </TableCell>
                                <TableCell align={'right'} style={{}}>
                                    Kinh nghiệm
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cvInforList.map((row) => {
                                return (
                                    <TableRow
                                        key={row.cvInforId}
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                    >
                                        <TableCell align={'left'}>
                                            {row?.fullName}
                                        </TableCell>
                                        <TableCell align={'left'}>
                                            {row?.cvName}
                                        </TableCell>
                                        <TableCell align={'left'}>
                                            {row?.applicationPosition}
                                        </TableCell>
                                        <TableCell align={'left'}>
                                            {row?.address}
                                        </TableCell>
                                        <TableCell align={'left'}>
                                            {row?.awardQuantity}
                                        </TableCell>
                                        <TableCell align={'left'}>
                                            {row?.educationQuantity}
                                        </TableCell>
                                        <TableCell align={'left'}>
                                            {row?.experienceQuantity}
                                        </TableCell>
                                        <TableCell>
                                            <button>
                                                <FontAwesomeIcon
                                                    icon={faEye}
                                                    onClick={() =>
                                                        handleDetail(
                                                            row?.cvInforId,
                                                        )
                                                    }
                                                />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={cvInforList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
