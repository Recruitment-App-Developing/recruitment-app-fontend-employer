import {
    faBriefcase,
    faCalendarDay,
    faFileLines,
    faGear,
    faGraduationCap,
    faInbox,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from '../../../../utils/cn';
import AdditionLine from './AdditionLine';
import {
    fetchAppliedCandidateByJob,
    fetchSearchCandidateByJob,
} from '../../../../services/applicationService';
import { Pagination, TextField, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function AppliedCandidateByJob() {
    const { jobId } = useParams();
    const [candidateList, setCandidateList] = useState([]);
    const [condition, setCondition] = useState({
        username: '',
        status: 'all',
        startTime: dayjs('2010-01-02', 'YYYY-MM-DD'),
        endTime: dayjs(),
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const clasaBorder = '1px solid #C0C0C0';
    const classTextIcon = 'pl-2 flex items-center gap-3 text-base';

    useEffect(() => {
        const temp = {
            ...condition,
            startTime: condition?.startTime.format('YYYY-MM-DD'),
            endTime: condition?.endTime.format('YYYY-MM-DD'),
        };

        const queryString = new URLSearchParams(temp);
        fetchSearchCandidateByJob(jobId, queryString, currentPage - 1).then(
            (data) => {
                setCandidateList(data.data);
                setTotalPages(data.meta.totalPages);
            },
        );
    }, [condition, currentPage]);

    return (
        <div className="h-full w-full px-4 pb-4">
            <div className="my-6 flex justify-between gap-4">
                <TextField
                    fullWidth
                    value={condition?.username || ''}
                    onChange={(e) =>
                        setCondition({ ...condition, username: e.target.value })
                    }
                    label="Nhập tên ứng viên"
                    variant="outlined"
                    size="medium"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{ width: '250px' }}
                        label="Thời gian bắt đầu"
                        value={condition?.startTime}
                        onChange={(v) =>
                            setCondition({
                                ...condition,
                                startTime: v,
                            })
                        }
                        format="DD-MM-YYYY"
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{ width: '250px' }}
                        label="Thời gian kết thúc"
                        value={condition?.endTime}
                        onChange={(v) =>
                            setCondition({
                                ...condition,
                                endTime: v,
                            })
                        }
                        format="DD-MM-YYYY"
                    />
                </LocalizationProvider>
            </div>
            <table border={1} cellPadding={10} style={{ width: '100%' }}>
                <caption className="my-3 text-2xl font-bold">
                    Danh sách ứng viên ứng tuyển
                </caption>
                <thead>
                    <tr>
                        <th
                            style={{
                                width: '80%',
                                border: clasaBorder,
                                fontSize: '20px',
                                fontWeight: 'bold',
                            }}
                        >
                            Ứng viên
                        </th>
                        <th
                            style={{
                                width: '20%',
                                border: clasaBorder,
                                fontSize: '20px',
                                fontWeight: 'bold',
                            }}
                        >
                            Trạng thái
                        </th>
                        <th style={{ border: clasaBorder }}>
                            <FontAwesomeIcon
                                className="text-xl"
                                icon={faGear}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {candidateList?.map((item, index) => (
                        <tr key={index}>
                            <td style={{ border: clasaBorder }}>
                                <div className="flex h-fit w-full items-center justify-center">
                                    <div className="flex h-full w-[40%] flex-col gap-2">
                                        <span className="text-lg font-medium">
                                            {item.name}
                                        </span>
                                        <div className={cn(classTextIcon)}>
                                            <FontAwesomeIcon icon={faInbox} />
                                            <span>{item.email}</span>
                                        </div>
                                        <div className={cn(classTextIcon)}>
                                            <FontAwesomeIcon icon={faPhone} />
                                            <span>{item.phoneNumber}</span>
                                        </div>
                                        <div className={cn(classTextIcon)}>
                                            <FontAwesomeIcon
                                                icon={faCalendarDay}
                                            />
                                            <span>
                                                Ứng tuyển lúc: {item.applyDay}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-[60%]">
                                        <div>
                                            <AdditionLine
                                                titile="Kinh nghiệm"
                                                data={item.experiences}
                                                icon={faBriefcase}
                                            />
                                        </div>
                                        <div>
                                            <AdditionLine
                                                titile="Học vấn"
                                                data={item.education}
                                                icon={faGraduationCap}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td style={{ border: clasaBorder }}>
                                <span className="text-lg">
                                    {item.statusApplication}
                                </span>
                            </td>
                            <td style={{ border: clasaBorder }}>
                                <Tooltip title="Xem CV ứng tuyển">
                                    <a
                                        href={item.cvLink}
                                        className="text-2xl text-primary"
                                        target="_blank"
                                    >
                                        <FontAwesomeIcon icon={faFileLines} />
                                    </a>
                                </Tooltip>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="my-5 flex w-full items-center justify-center">
                <Pagination
                    className="flex-center"
                    onChange={(_e, p) => {
                        setCurrentPage(p);
                    }}
                    page={currentPage}
                    count={totalPages}
                    variant="outlined"
                    color="primary"
                />
            </div>
        </div>
    );
}
