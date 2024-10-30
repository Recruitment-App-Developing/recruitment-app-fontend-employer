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
        // useEffect(() => {
        //     fetchDeleteJobAddress(jobId, jobAddressId).then((data) => {
        //         toast.success(data.message);
        //         setAddressList(data.data);
        //         setOpen(false);
        //     });
        // }, [jobId, jobAddressId]);
    };

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="responsive-dialog-title"
            maxWidth="650px"
            PaperProps={{
                style: {
                    width: '500px',
                    height: '300px',
                },
            }}
        >
            <div className="flex flex-col">
                <span>Bạn có chắc chắn muốn xoá địa chỉ:</span>
                <b>
                    {detail +
                        ', ' +
                        wardName +
                        ', ' +
                        districtName +
                        ', ' +
                        provinceName}
                </b>
            </div>
            <div className="flex items-center justify-center">
                <button onClick={handleConfirm}>Chắc chắn</button>
                <button onClick={() => setOpen(false)}>Huỷ bỏ</button>
            </div>
        </Dialog>
    );
}
