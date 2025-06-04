import {
    faBan,
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
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import cn from '../../../../utils/cn';
import AdditionLine from './AdditionLine';
import {
    fetchAppliedCandidateByJob,
    fetchSearchCandidateByJob,
    fetchUpdateStatus,
} from '../../../../services/applicationService';
import { Pagination, TextField, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
    applicationStatusData,
    HIRED,
    INTERVIEW_APPOINTMENT,
    INTERVIEWED,
    NEW,
    OFFERED,
    SKIP,
    VIEWD,
} from '../../../../constants/ApplicationStatusData';
import { toast } from 'react-toastify';
import { openCvPdf } from '../../../../constants/Common';

export default function AppliedCandidateByJob() {
    // Khởi tạo searchParams, navigate, param
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { jobId } = useParams();

    // Helper để parse condition cho an toàn
    const parseCondition = () => {
        const rawCondition = searchParams.get('condition');
        if (!rawCondition) {
            return {
                username: '',
                status: 'all',
                startTime: dayjs('2010-01-02', 'YYYY-MM-DD'),
                endTime: dayjs(),
            };
        }

        try {
            const parsed = JSON.parse(rawCondition);
            return {
                username: parsed.username || '',
                status: parsed.status || 'all',
                startTime: parsed.startTime
                    ? dayjs(parsed.startTime)
                    : dayjs('2010-01-02', 'YYYY-MM-DD'),
                endTime: parsed.endTime ? dayjs(parsed.endTime) : dayjs(),
            };
        } catch (error) {
            console.error('Failed to parse condition:', error);
            return {
                username: '',
                status: 'all',
                startTime: dayjs('2010-01-02', 'YYYY-MM-DD'),
                endTime: dayjs(),
            };
        }
    };

    // State
    const [isClick, setIsClick] = useState(false);
    const [candidateList, setCandidateList] = useState([]);
    const [condition, setCondition] = useState(parseCondition());
    const [currentPage, setCurrentPage] = useState(
        Number(searchParams.get('currentPage')) || 1,
    );
    const [totalPages, setTotalPages] = useState(1);

    // Style
    const clasaBorder = '1px solid #C0C0C0';
    const classTextIcon = 'pl-2 flex items-center gap-3 text-base';
    // Effect để fetch danh sách ứng viên
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const temp = {
                    ...condition,
                    startTime: condition.startTime.format('YYYY-MM-DD'),
                    endTime: condition.endTime.format('YYYY-MM-DD'),
                };
                const queryString = new URLSearchParams(temp);

                const data = await fetchSearchCandidateByJob(
                    jobId,
                    queryString,
                    currentPage - 1,
                );
                setCandidateList(data.data);
                setTotalPages(data.meta.totalPages);
            } catch (error) {
                console.error('Failed to fetch candidates:', error);
            }
        };

        fetchCandidates();
    }, [condition, currentPage, jobId, searchParams, isClick]);

    console.log('reload');

    const handleClickStatus = (status, apllicationId) => {
        const request = { applicationId: apllicationId, status: status };
        searchParams.set('condition', JSON.stringify(condition));
        searchParams.set('currentPage', currentPage);
        setSearchParams(searchParams);
        console.log(request);
        fetchUpdateStatus(request).then((data) => {
            if (data.success) {
                toast.success(data.message);
                navigate(`?${searchParams.toString()}`);
                setIsClick(!isClick);
            } else toast.error(data.message);
        });
    };

    const handleShowButton = (status, apllicationId) => {
        let statusRes;
        console.log(status);

        switch (status) {
            case NEW: {
                statusRes = applicationStatusData.find(
                    (item) => item.code === VIEWD,
                );
                break;
            }
            case VIEWD: {
                statusRes = applicationStatusData.find(
                    (item) => item.code === INTERVIEW_APPOINTMENT,
                );
                break;
            }
            case INTERVIEW_APPOINTMENT: {
                statusRes = applicationStatusData.find(
                    (item) => item.code === INTERVIEWED,
                );
                break;
            }
            case INTERVIEWED: {
                statusRes = applicationStatusData.find(
                    (item) => item.code === OFFERED,
                );
                break;
            }
            case OFFERED: {
                statusRes = applicationStatusData.find(
                    (item) => item.code === HIRED,
                );
                break;
            }
            case HIRED:
                return '';
            case SKIP:
                return '';
        }
        console.log(statusRes);
        if (statusRes !== null) {
            return (
                <Tooltip title={statusRes.title}>
                    <button
                        className="text-2xl"
                        onClick={() =>
                            handleClickStatus(statusRes.code, apllicationId)
                        }
                    >
                        {statusRes.icon}
                    </button>
                </Tooltip>
            );
        }
        return '';
    };

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
                                    {
                                        applicationStatusData.find(
                                            (subItem) =>
                                                subItem.code ===
                                                item.statusApplication,
                                        )?.title
                                    }
                                </span>
                            </td>
                            <td style={{ border: clasaBorder }}>
                                <div className="flex items-center justify-center gap-4">
                                    <Tooltip title="Xem CV ứng tuyển">
                                        <button
                                            onClick={() =>
                                                openCvPdf(item.cvLink)
                                            }
                                            className="text-2xl text-slate-400"
                                        >
                                            <FontAwesomeIcon
                                                icon={faFileLines}
                                            />
                                        </button>
                                        {/* <a
                                            href={item.cvLink}
                                            className="text-2xl text-slate-400"
                                            target="_blank"
                                        >
                                            <FontAwesomeIcon
                                                icon={faFileLines}
                                            />
                                        </a> */}
                                    </Tooltip>
                                    {handleShowButton(
                                        item?.statusApplication,
                                        item.id,
                                    )}
                                    {item.statusApplication !== HIRED &&
                                        item.statusApplication !== SKIP && (
                                            <Tooltip title="Bỏ qua">
                                                <button
                                                    className="text-2xl"
                                                    onClick={() =>
                                                        handleClickStatus(
                                                            SKIP,
                                                            item.id,
                                                        )
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faBan}
                                                        className="text-red"
                                                    />
                                                </button>
                                            </Tooltip>
                                        )}
                                </div>
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
