import { Dialog } from '@mui/material';
import { useEffect } from 'react';
import { fetchDeleteJobAddress } from '../../../../services/jobService';
import { toast } from 'react-toastify';

export default function ConfirmDeleteModal({
    open,
    setOpen,
    jobId,
    jobAddressId,
    detail,
    wardName,
    districtName,
    provinceName,
    setAddressList,
}) {
    const handleConfirm = () => {
        console.log('Confirm');
        fetchDeleteJobAddress(jobId, jobAddressId).then((data) => {
            toast.success(data.message);
            setAddressList(data.data);
            setOpen(false);
        });
    };

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="responsive-dialog-title"
            maxWidth="700px"
            PaperProps={{
                style: {
                    width: '700px',
                },
            }}
        >
            <div className="px-7 py-5">
                <div className="flex flex-col gap-4">
                    <span className="text-2xl">
                        Bạn có chắc chắn muốn xoá địa chỉ:
                    </span>
                    <b className="text-xl text-success">
                        {detail +
                            ', ' +
                            wardName +
                            ', ' +
                            districtName +
                            ', ' +
                            provinceName}
                    </b>
                </div>
                <div className="mt-7 flex items-center justify-center gap-5">
                    <button
                        onClick={handleConfirm}
                        className="rounded-md bg-success px-5 py-1 text-lg font-semibold text-white"
                    >
                        Chắc chắn
                    </button>
                    <button
                        onClick={() => setOpen(false)}
                        className="rounded-md bg-slate-300 px-5 py-1 text-lg font-semibold text-black"
                    >
                        Huỷ bỏ
                    </button>
                </div>
            </div>
        </Dialog>
    );
}
