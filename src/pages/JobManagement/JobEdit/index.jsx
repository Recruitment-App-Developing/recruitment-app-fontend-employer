import { useEffect, useState } from 'react';
import JobContentEdit from './JobContentEdit';
import { fetchDetailJobById, fetchEditJob } from '../../../services/jobService';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import AddressEdit from './AddressEdit';

export default function JobEditPage() {
    const { jobId } = useParams();

    const [openContentEdit, setOpenContentEdit] = useState(false);
    const [openAddressEdit, setOpenAddressEdit] = useState(false);
    const [job, setJob] = useState();

    useEffect(() => {
        fetchDetailJobById(jobId).then((data) => {
            setJob(data.data);
        });
    }, []);

    return (
        <div className="mt-3 flex h-fit flex-col gap-3 px-2">
            <div
                onClick={() => setOpenContentEdit(!openContentEdit)}
                className="w-full cursor-pointer rounded-lg bg-primary p-3 text-xl font-bold text-white"
            >
                Nội dung tin tuyển dụng
            </div>
            <div
                className={`${openContentEdit ? 'opacity-100' : 'max-h-0 opacity-0'} overflow-hidden
                    transition-all duration-300 ease-in-out`}
            >
                {openContentEdit && (
                    <JobContentEdit jobId={jobId} job={job} setJob={setJob} />
                )}
            </div>
            <div
                onClick={() => setOpenAddressEdit(!openAddressEdit)}
                className="w-full cursor-pointer rounded-lg bg-primary p-3 text-xl font-bold text-white"
            >
                Địa chỉ việc làm
            </div>
            <div
                className={`${openAddressEdit ? 'opacity-100' : 'max-h-0 opacity-0'} overflow-hidden
                    transition-all duration-300 ease-in-out`}
            >
                {openAddressEdit && <AddressEdit jobId={jobId} />}
            </div>
        </div>
    );
}
