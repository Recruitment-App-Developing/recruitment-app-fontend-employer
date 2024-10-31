import { useDispatch, useSelector } from 'react-redux';
import { authSelector, login, logout } from '../toolkits/authSlice';

export default function useAuth() {
    const { isAuthenticated } = useSelector(authSelector);
    const dispatch = useDispatch();

    const handleLogin = (token) => {
        dispatch(login(token));
    };
    const handleLogout = () => {
        dispatch(logout());
    };

    return { isAuthenticated, login: handleLogin, logout: handleLogout };
}
