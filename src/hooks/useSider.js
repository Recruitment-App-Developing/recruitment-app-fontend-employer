import { useDispatch, useSelector } from 'react-redux';
import { siderSelector, toggleSider } from '../toolkits/siderSlice';

export default function useSider() {
    const { isOpen } = useSelector(siderSelector);
    const dispatch = useDispatch();

    const toggle = () => {
        dispatch(toggleSider());
    };

    return { isOpen, toggle };
}
