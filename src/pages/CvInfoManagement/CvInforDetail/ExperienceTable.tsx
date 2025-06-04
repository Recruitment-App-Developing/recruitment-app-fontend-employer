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
    faEdit,
    faGear,
    faPlus,
    faTrashAlt,
    faUpDown,
} from '@fortawesome/free-solid-svg-icons';
import { Experience, initExperience } from '../cvInforType';
import UpdateexperienceModal from './UpdateModal/UpdateExperienceModal';
import useCvInfor from './useCvInfor';

interface ExperienceTableProps {
    data?: Experience[];
}

function Row(props: { row: Experience }) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const { deleteExperience } = useCvInfor();

    const handleUpdate = (data: Experience) => {
        setOpenUpdate(true);
    };

    const handleDelete = (id: string | null) => {
        deleteExperience(id);
    };

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset', py: 0 } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <FontAwesomeIcon icon={faUpDown} />
                        ) : (
                            <FontAwesomeIcon icon={faUpDown} />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.companyName}
                </TableCell>
                <TableCell>{row.timeStr}</TableCell>
                <TableCell>{row.position}</TableCell>
                <TableCell>{row.detail}</TableCell>
                <TableCell>
                    <div className="flex items-center justify-center gap-2">
                        <button>
                            <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() => handleUpdate(row)}
                            />
                        </button>
                        <UpdateexperienceModal
                            open={openUpdate}
                            setOpen={setOpenUpdate}
                            experienceOld={row}
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
            {/* <TableRow>
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
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">
                                            Amount
                                        </TableCell>
                                        <TableCell align="right">
                                            Total price ($)
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>
                                                {historyRow.customerId}
                                            </TableCell>
                                            <TableCell align="right">
                                                {historyRow.amount}
                                            </TableCell>
                                            <TableCell align="right">
                                                {Math.round(
                                                    historyRow.amount *
                                                        row.price *
                                                        100,
                                                ) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow> */}
        </Fragment>
    );
}

export default function ExperienceTable({ data = [] }: ExperienceTableProps) {
    const [openAdd, setOpenAdd] = useState<boolean>(false);

    return (
        <TableContainer
            component={Paper}
            sx={{
                minHeight: 160,
                height: 160,
                maxHeight: 500,
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
                                <UpdateexperienceModal
                                    open={openAdd}
                                    setOpen={setOpenAdd}
                                    experienceOld={initExperience}
                                />
                            </div>
                        </TableCell>
                        <TableCell>Tên công ty</TableCell>
                        <TableCell>Thời gian</TableCell>
                        <TableCell>Vị trí làm việc</TableCell>
                        <TableCell>Mô tả chi tiết</TableCell>
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
