import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { fetchLogin } from '../../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function LoginForm() {
    const navigate = useNavigate();

    const { login } = useAuth();
    const [loginRequest, setLogin] = useState({
        username: '',
        password: '',
    });

    const handleSubmit = () => {
        fetchLogin(loginRequest).then((data) => {
            toast.success(data.message);
            login(data.data.token);
            navigate('/');
        });
    };

    return (
        <div className="flex flex-col gap-10">
            <TextField
                label="Tên đăng nhập"
                fullWidth
                onChange={(e) =>
                    setLogin({ ...loginRequest, username: e.target.value })
                }
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FontAwesomeIcon icon={faUser} />
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
            />
            <TextField
                label="Mật khẩu"
                fullWidth
                type="password"
                onChange={(e) =>
                    setLogin({ ...loginRequest, password: e.target.value })
                }
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FontAwesomeIcon icon={faLock} />
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
            />
            <button
                onClick={handleSubmit}
                className="w-full rounded-md bg-primary py-3 text-2xl font-semibold text-white"
            >
                Đăng nhập
            </button>
        </div>
    );
}
