import {
    faBuilding,
    faFile,
    faLock,
    faTableCellsLarge,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default function useSideBar() {
    const { pathname } = useLocation();

    const routes = useMemo(
        () => [
            {
                label: 'Thông tin cá nhân',
                icon: faUser,
                href: '/account/settings',
                active: pathname === '/account/settings',
            },
            {
                label: 'Đổi mật khẩu',
                icon: faLock,
                href: '/account/settings/password',
                active: pathname === '/account/settings/password',
            },
            {
                label: 'Giấy đăng ký doanh nghiệp',
                icon: faFile,
                href: '/account/settings/company-license',
                active: pathname === '/account/settings/company-license',
            },
            {
                label: 'Thông tin công ty',
                icon: faBuilding,
                href: '/account/settings/company',
                active: pathname === '/account/settings/company',
            },
        ],
        [pathname],
    );

    return routes;
}
