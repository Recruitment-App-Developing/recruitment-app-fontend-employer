import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AddressProvider from './components/Address/AddressContext';
import AddJobFirstForm from './AddJobFirstForm';
import { formatDateTime } from '../../../utils/dateFormat';
import { base64Converter } from '../../../utils/base64Converter';
import { fetchAddJob } from '../../../services/jobService';
import MultipleUploadImages from '../../../components/MultiImage/MutilpleUploadImages';
import FieldCard from './FieldCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

export function AddAJob() {
    const [job, setJob] = useState({
        name: '',
        addressList: [],
        jobPosition: '',
        numberOfVacancy: '',
        workMethod: '',
        sexRequired: '',
        salary: '',
        jobExp: '',
        applicationDueTime: new Date(),
        jobBenefit: '',
        jobDescript: '',
        jobRequirement: '',
        addApplicationInfor: '',
        isActive: true,
        applicationMethod: 'ONLINE',
        imageList: [],
        mainIndustry: '',
        subIndustries: [],
    });

    const handleSubmit = () => {
        const newJob = {
            ...job,
            applicationDueTime: formatDateTime(job.applicationDueTime),
        };

        fetchAddJob(newJob).then((data) => {
            toast.success(data.message);
            setJob({
                name: '',
                jobPosition: '',
                numberOfVacancy: '',
                workMethod: '',
                sexRequired: '',
                salary: '',
                jobExp: '',
                applicationDueTime: new Date(),
                jobBenefit: '',
                jobDescript: '',
                jobRequirement: '',
                addApplicationInfor: '',
                isActive: true,
                applicationMethod: 'ONLINE',
                imageList: [],
                mainIndustry: '',
                subIndustries: [],
            });
        });
    };

    return (
        <div className="h-full w-full items-center">
            <ul className="flex-start flex gap-10 rounded-md bg-white py-3">
                <li>1.Nội dung đăng tuyển</li>
                <li>2. Hình thức hiển thị</li>
                <li>3. Test đầu vào</li>
            </ul>
            <AddressProvider>
                <AddJobFirstForm job={job} setJob={setJob} />
            </AddressProvider>
            {/* <ImageItem src={src} onChange={setSrc} /> */}

            <div className="mt-3">
                <FieldCard
                    icon={<FontAwesomeIcon icon={faBriefcase} />}
                    title="Ảnh minh hoạ công việc"
                >
                    <MultipleUploadImages
                        limit={5}
                        value={job.imageList}
                        onChange={(v) => {
                            setJob({ ...job, imageList: v });
                        }}
                    />
                </FieldCard>
            </div>
            <button
                onClick={handleSubmit}
                className="mt-3 rounded-md bg-primary px-4 py-2 font-medium text-white"
            >
                Thêm tin tuyển dụng
            </button>
        </div>
    );
}
