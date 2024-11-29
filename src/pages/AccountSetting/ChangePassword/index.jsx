import { TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchChangePassword } from '../../../services/authService';
import { toast } from 'react-toastify';

export default function ChangePassword() {
    const navigate = useNavigate();
    const [changePassword, setChangePassword] = useState({
        newPassword: '',
        confirmNewPassword: '',
        oldPassword: '',
    });

    const handleCancel = () => {
        navigate('/');
    };

    const handleSubmit = () => {
        fetchChangePassword(changePassword).then((data) => {
            toast.success(data.message);
            setChangePassword({
                newPassword: '',
                confirmNewPassword: '',
                oldPassword: '',
            });
        });
    };

    const handleChange = (key, value) => {
        setChangePassword((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex w-full flex-col gap-3 p-3">
            <h2 className="text-lg font-semibold">Thay đổi mật khẩu</h2>
            <div className="flex flex-col gap-4 border-[1px] border-solid border-slate-200 px-4 py-5">
                <div className="flex items-center justify-center">
                    <h2 className="w-[300px]">Mật khẩu hiện tại</h2>
                    <TextField
                        fullWidth
                        value={changePassword?.oldPassword}
                        size="small"
                        label="Mật khẩu hiện tại"
                        placeholder="Nhập mật khẩu hiện tại"
                        onChange={(e) =>
                            handleChange('oldPassword', e.target.value)
                        }
                    />
                </div>
                <div className="flex items-center justify-center">
                    <h2 className="w-[300px]">Mật khẩu mới</h2>
                    <TextField
                        fullWidth
                        value={changePassword?.newPassword}
                        size="small"
                        label="Mật khẩu mới"
                        placeholder="Nhập mật khẩu mới"
                        onChange={(e) =>
                            handleChange('newPassword', e.target.value)
                        }
                    />
                </div>
                <div className="flex items-center justify-center">
                    <h2 className="w-[300px]">Xác nhận mật khẩu</h2>
                    <TextField
                        fullWidth
                        value={changePassword?.confirmNewPassword}
                        size="small"
                        label="Xác nhận mật khẩu"
                        placeholder="Nhập lại mật khẩu mới"
                        onChange={(e) =>
                            handleChange('confirmNewPassword', e.target.value)
                        }
                    />
                </div>
                <div className="flex items-center justify-center">
                    <h2 className="w-[300px]"></h2>
                    <div className="flex w-full items-center gap-4">
                        <button
                            onClick={handleCancel}
                            className="rounded-md bg-slate-300 px-6 py-2 text-black"
                        >
                            Huỷ
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="rounded-md bg-primary px-4 py-2 text-white"
                        >
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
