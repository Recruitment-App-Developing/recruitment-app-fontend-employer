import {
    faArrowRightFromBracket,
    faBriefcase,
    faCircleUser,
    faFileAlt,
    faGear,
    faMarker,
    faQuestionCircle,
    faTableCellsLarge,
    faWandMagic,
} from '@fortawesome/free-solid-svg-icons';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default function useSideBarRoutes() {
    const { pathname } = useLocation();

    const routes = useMemo(
        () => [
            { divider: true },
            {
                label: 'Bảng tin',
                href: '/',
                icon: faTableCellsLarge,
            },
            {
                label: 'Dịch vụ của tôi',
                href: '/services',
                icon: faWandMagic,
                active: pathname === '/services',
            },
            {
                divider: true,
            },
            {
                label: 'Chiến dịch tuyển dụng',
                href: '/recruitment-campaigns',
                icon: faBriefcase,
                active: pathname === '/recruitment-campaigns',
            },
            {
                label: 'Tin tuyển dụng',
                href: '/jobs',
                icon: faFileAlt,
                active: pathname === '/jobs',
            },
            {
                label: 'Tạo tin mới',
                href: '/jobs/job-add',
                icon: faMarker,
                active: pathname === '/create-job',
            },
            {
                label: 'Quản lý CV',
                href: '/cvs-management',
                icon: faCircleUser,
                active: pathname === '/cvs-management',
            },
            {
                divider: true,
            },
            {
                label: 'Cài đặt tài khoản',
                href: '/account/settings',
                icon: faGear,
                active: pathname.includes('/account/settings'),
            },
            {
                divider: true,
            },
            {
                label: 'Trợ giúp',
                href: '/help',
                icon: faQuestionCircle,
                active: pathname === '/help',
            },
            {
                label: 'Đăng xuất',
                onClick: open,
                icon: faArrowRightFromBracket,
            },
        ],
        [pathname],
    );

    return routes;
}
