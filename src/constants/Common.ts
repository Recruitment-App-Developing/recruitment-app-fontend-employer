import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';
import Chip from '@mui/material/Chip';

export const openCvPdf = (cvId: string) => {
    axiosInstance
        .get(`cv/get-one/${cvId}`, {
            responseType: 'blob',
            headers: {
                Accept: 'application/pdf',
            },
        })
        .then((response) => {
            if (response.status === 200 && response.data) {
                const file = new Blob([response.data], {
                    type: 'application/pdf',
                });

                const fileURL = URL.createObjectURL(file);

                const newWindow = window.open(fileURL);
                if (!newWindow) {
                    alert(
                        'Trình duyệt đã chặn popup. Vui lòng cho phép để xem file PDF.',
                    );
                }
            } else {
                console.error('Không nhận được file PDF hợp lệ');
            }
        })
        .catch((error) => {
            toast.error('Lỗi khi tải PDF');
            console.error('Lỗi khi tải PDF:', error);
        });
};
