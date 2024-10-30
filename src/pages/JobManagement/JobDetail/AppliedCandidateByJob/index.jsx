import {
    faBriefcase,
    faCalendarDay,
    faEllipsis,
    faFileLines,
    faGear,
    faGraduationCap,
    faInbox,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cn from '../../../../utils/cn';
import AdditionLine from './AdditionLine';
import { fetchAppliedCandidateByJob } from '../../../../services/applicationService';
import { toast } from 'react-toastify';
import { Tooltip } from '@mui/material';

export default function AppliedCandidateByJob() {
    const navigate = useNavigate();

    const { jobId } = useParams();
    const [candidateList, setCandidateList] = useState([]);

    const clasaBorder = '1px solid #C0C0C0';
    const classTextIcon = 'pl-2 flex items-center gap-3 text-base';

    useEffect(() => {
        fetchAppliedCandidateByJob(jobId).then((data) => {
            setCandidateList(data.data);
            toast.success(data.message);
        });
    }, []);

    return (
        <div className="h-full w-full">
            <table border={1} cellPadding={10} style={{ width: '100%' }}>
                <caption>Danh sách ứng viên ứng tuyển</caption>
                <tr>
                    <td
                        style={{
                            width: '80%',
                            border: clasaBorder,
                            fontSize: '20px',
                            fontWeight: 'bold',
                        }}
                    >
                        Ứng viên
                    </td>
                    <td
                        style={{
                            width: '20%',
                            border: clasaBorder,
                            fontSize: '20px',
                            fontWeight: 'bold',
                        }}
                    >
                        Trạng thái
                    </td>
                    <td style={{ border: clasaBorder }}>
                        <FontAwesomeIcon className="text-xl" icon={faGear} />
                    </td>
                </tr>
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
                                        <FontAwesomeIcon icon={faCalendarDay} />
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
            </table>
        </div>
    );
}
