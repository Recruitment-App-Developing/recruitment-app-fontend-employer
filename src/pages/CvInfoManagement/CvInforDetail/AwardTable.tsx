import React, { Fragment, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAngleUp,
    faEdit,
    faGear,
    faPlus,
    faTrash,
    faTrashAlt,
    faUpDown,
} from '@fortawesome/free-solid-svg-icons';
import { Award, AwardAuditDto, initAward } from '../cvInforType';
import UpdateAwardModal from './UpdateModal/UpdateAwardModal';
import useCvInfor from './useCvInfor';
import { Box, Collapse, Typography } from '@mui/material';
import { fetchGetAwardAuditById } from '../../../services/cvInforService';
import { green } from '@mui/material/colors';

interface AwardTableProps {
    data?: Award[];
}

function Row(props: { row: Award }) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [history, setHistory] = useState<AwardAuditDto[]>([]);
    const { deleteAward } = useCvInfor();

    const handleUpdate = (data: Award) => {
        setOpenUpdate(true);
    };

    const handleDelete = (id: string | null) => {
        deleteAward(id);
    };

    const handleHistory = (id: string | null) => {
        setOpen(!open);
        if (!open) {
            fetchGetAwardAuditById(id).then((data) => {
                setHistory(data.data.data);
                console.log(data.data);
            });
        }
    };

    const getColorHistoryChange = (type: number) => {
        switch (type) {
            case 0:
                return { bgcolor: green['A100'] };
            case 1:
                return { bgcolor: '#caecff' };
            case 2:
                return { bgcolor: '#ffebe9' };
            default:
                return null;
        }
    };

    const getChipHistoryChange = (type: number) => {
        switch (type) {
            case 0:
                return (
                    <div
                        className="flex h-5 w-5 items-center justify-center rounded-sm bg-green text-xs font-bold
                            text-white"
                    >
                        +
                    </div>
                );
            case 1:
                return (
                    <div
                        className="flex h-5 w-5 items-center justify-center rounded-sm bg-[#218bff] text-sm
                            font-bold text-white"
                    >
                        ·
                    </div>
                );
            case 2:
                return (
                    <div
                        className="flex h-5 w-5 items-center justify-center rounded-sm bg-[#df0c24] text-sm
                            font-bold text-white"
                    >
                        -
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset', py: 0 } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleHistory(row?.id)}
                    >
                        {open ? (
                            <FontAwesomeIcon icon={faAngleUp} />
                        ) : (
                            <FontAwesomeIcon icon={faAngleDown} />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.timeStr}</TableCell>
                <TableCell>
                    <div className="flex items-center justify-center gap-2">
                        <button>
                            <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() => handleUpdate(row)}
                            />
                        </button>
                        <UpdateAwardModal
                            open={openUpdate}
                            setOpen={setOpenUpdate}
                            awardOld={row}
                        />
                        <button>
                            <FontAwesomeIcon
                                icon={faTrashAlt}
                                onClick={() => handleDelete(row?.id)}
                            />
                        </button>
                    </div>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Lịch sử
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Tên giải thưởng</TableCell>
                                        <TableCell>Thời gian</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {history?.map((historyRow) => (
                                        <TableRow
                                            key={historyRow?.rev}
                                            sx={getColorHistoryChange(
                                                historyRow?.revtype,
                                            )}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {getChipHistoryChange(
                                                    historyRow?.revtype,
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {historyRow?.name}
                                            </TableCell>
                                            <TableCell>
                                                {historyRow?.time}
                                            </TableCell>
                                            <TableCell align="right">
                                                {historyRow?.revtstmp}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default function AwardTable({ data = [] }: AwardTableProps) {
    const [openAdd, setOpenAdd] = useState<boolean>(false);

    return (
        <TableContainer
            component={Paper}
            sx={{
                minHeight: 100,
                maxHeight: 500,
                maxWidth: 800,
            }}
        >
            <Table aria-label="collapsible table" size="small" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: 1.5, px: 0 }}>
                            <div className="flex items-center justify-center">
                                <button onClick={() => setOpenAdd(true)}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <UpdateAwardModal
                                    open={openAdd}
                                    setOpen={setOpenAdd}
                                    awardOld={initAward}
                                />
                            </div>
                        </TableCell>
                        <TableCell>Tên giải thưởng</TableCell>
                        <TableCell align="right">Thời gian</TableCell>
                        <TableCell>
                            <div className="flex items-center justify-center">
                                <FontAwesomeIcon icon={faGear} />
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
