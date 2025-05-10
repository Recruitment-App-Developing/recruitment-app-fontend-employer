import { useState } from 'react';
import { toast } from 'react-toastify';
import { formatDateTime } from '../../../utils/dateFormat';
import { fetchAddJob } from '../../../services/jobService';
import Step1 from './Step1';
import StepperCustom from '../../../components/Stepper';
import Step2 from './Step2';

export function AddAJob() {
    const [job, setJob] = useState({
        name: '',
        addressList: [],
        jobPosition: '',
        numberOfVacancy: '',
        workMethod: '',
        sexRequired: '',
        salary: '',
        salaryType: '',
        salaryUnit: '',
        salaryFrom: null,
        salaryTo: null,
        jobExp: '',
        applicationDueTime: new Date(),
        jobBenefit: '',
        jobDescript: '',
        jobRequirement: '',
        addApplicationInfor: '',
        receiverName: '',
        receiverPhone: '',
        receiverEmail: '',
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

        console.log(newJob);

        fetchAddJob(newJob).then((data) => {
            toast.success(data.message);
            setJob({
                name: '',
                addressList: [],
                jobPosition: '',
                numberOfVacancy: '',
                workMethod: '',
                sexRequired: '',
                salary: '',
                salaryType: '',
                salaryUnit: '',
                salaryFrom: null,
                salaryTo: null,
                jobExp: '',
                applicationDueTime: new Date(),
                jobBenefit: '',
                jobDescript: '',
                jobRequirement: '',
                addApplicationInfor: '',
                receiverName: '',
                receiverPhone: '',
                receiverEmail: '',
                isActive: true,
                applicationMethod: 'ONLINE',
                imageList: [],
                mainIndustry: '',
                subIndustries: [],
            });
        });
    };

    const stepperTitle = [
        'Nội dung đăng tuyển',
        'Hình thức hiển thị',
        'Test đầu vào',
    ];

    const stepperContent = [
        <Step1 job={job} setJob={setJob} />,
        <Step2 />,
        <Step2 />,
    ];

    return (
        <div className="h-full w-full items-center">
            {/* <ul className="flex-start flex gap-10 rounded-md bg-white py-3">
                <li>1.Nội dung đăng tuyển</li>
                <li>2. Hình thức hiển thị</li>
                <li>3. Test đầu vào</li>
            </ul> */}
            <StepperCustom
                stepperTitle={stepperTitle}
                stepperContent={stepperContent}
                finishButton="Thêm tin tuyển dụng"
                handleSubmit={handleSubmit}
            />
        </div>
    );
}
