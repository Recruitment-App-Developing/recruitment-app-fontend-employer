import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { fetchLogin } from '../../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        username: '',
        password: '',
    });

    console.log(login);

    const handleSubmit = () => {
        fetchLogin(login).then((data) => {
            toast.success(data.message);
            navigate('/');
        });
    };

    return (
        <div className="flex flex-col gap-10">
            <TextField
                id="input-with-icon-textfield"
                label="Tên đăng nhập"
                fullWidth
                onChange={(e) =>
                    setLogin({ ...login, username: e.target.value })
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
                id="input-with-icon-textfield"
                label="Mật khẩu"
                fullWidth
                type="password"
                onChange={(e) =>
                    setLogin({ ...login, password: e.target.value })
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
