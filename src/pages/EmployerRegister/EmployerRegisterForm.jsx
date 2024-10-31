import {
    faEnvelope,
    faLock,
    faPhone,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    InputAdornment,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material';
import { useState } from 'react';
import { fetchRegisterEmployer } from '../../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function EmployerRegisterForm() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [employer, setEmployer] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        gender: 'MALE',
        email: '',
        phoneNumber: '',
    });

    const handleSubmit = () => {
        fetchRegisterEmployer(employer).then((data) => {
            toast.success(data.message);
            login(data.data.token);
            navigate('/');
        });
    };

    const handleChange = (key, value) => {
        setEmployer((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className="flex flex-col gap-10">
            <TextField
                label="Tên đăng nhập"
                fullWidth
                onChange={(e) => handleChange('username', e.target.value)}
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
                label="Email"
                fullWidth
                onChange={(e) => handleChange('email', e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
            />
            <TextField
                label="Mật khẩu"
                type="password"
                fullWidth
                onChange={(e) => handleChange('password', e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FontAwesomeIcon icon={faLock} />
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
            />
            <TextField
                label="Nhập lại mật khẩu"
                type="password"
                fullWidth
                onChange={(e) =>
                    handleChange('confirmPassword', e.target.value)
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
            <div className="flex justify-between">
                <div className="w-1/2">
                    <TextField
                        label="Số điện thoại"
                        fullWidth
                        onChange={(e) =>
                            handleChange('phoneNumber', e.target.value)
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={faPhone} />
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                    />
                </div>
                <FormControl>
                    <FormLabel>Giới tính</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        value={employer.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                    >
                        <div className="flex">
                            <FormControlLabel
                                value="MALE"
                                control={<Radio />}
                                label="Nam"
                            />
                            <FormControlLabel
                                value="FEMALE"
                                control={<Radio />}
                                label="Nữ"
                            />
                        </div>
                    </RadioGroup>
                </FormControl>
            </div>
            <button
                onClick={handleSubmit}
                className="w-full rounded-md bg-success py-3 text-2xl font-semibold text-white"
            >
                Đăng ký
            </button>
        </div>
    );
}
