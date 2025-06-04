import {
    Dialog,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { AwardAuditDto } from '../../cvInforType';
import { fetchGetAwardAuditByCvInfoId } from '../../../../services/cvInforService';
import { green } from '@mui/material/colors';

interface AwardDetailModalProp {
    open: boolean;
    setOpen: (open: boolean) => void;
    cvInfoId: string | null;
}

export default function AwardDetailModal({
    open = false,
    setOpen,
    cvInfoId,
}: AwardDetailModalProp) {
    const [data, setData] = useState<AwardAuditDto[]>([]);

    useEffect(() => {
        fetchGetAwardAuditByCvInfoId(cvInfoId).then((data) =>
            setData(data.data.data),
        );
    }, []);

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
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="responsive-dialog-title"
            maxWidth={false}
            PaperProps={{
                style: {
                    width: '900px',
                },
            }}
        >
            <div className="flex w-full flex-col gap-4 px-5 py-5">
                <h1 className="text-2xl font-bold text-success">
                    Thông tin thay đổi Giải thưởng ứng viên
                </h1>
                <TableContainer
                    component={Paper}
                    sx={{
                        minHeight: 100,
                        maxHeight: 500,
                        maxWidth: 1000,
                    }}
                >
                    <Table
                        aria-label="collapsible table"
                        size="small"
                        stickyHeader
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: '5px' }}></TableCell>
                                <TableCell>Tên giải thưởng</TableCell>
                                <TableCell align="right">Thời gian</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow
                                    sx={getColorHistoryChange(item.revtype)}
                                >
                                    <TableCell
                                        sx={getColorHistoryChange(item.revtype)}
                                    >
                                        {getChipHistoryChange(item.revtype)}
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell align="right">
                                        {item.time}
                                    </TableCell>
                                    <TableCell>{item.revtstmp}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Dialog>
    );
}
