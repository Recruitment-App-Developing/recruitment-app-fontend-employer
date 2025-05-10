import { faAnglesRight, faShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';
import cn from '../../../utils/cn';
import useSideBarRoutes from '../../../hooks/useSideBarRoutes';
import SideBarItem from './SideBarItem';
import useSider from '../../../hooks/useSider';
import { defaultAvatar } from '../../../constants/defaultImage';
import { USER_INFOR } from '../../../constants/Constant';

export default function DetailSideBar() {
    const text = 'text';

    const { isOpen } = useSider();
    const routes = useSideBarRoutes();

    const userInfor = JSON.parse(localStorage.getItem(USER_INFOR));

    return (
        <aside
            className={cn(
                `fixed top-0 z-40 h-full bg-white pt-16 shadow-md transition-all hover:w-80
                hover:overflow-y-auto`,
                isOpen ? 'w-80 overflow-y-auto' : 'w-14 overflow-hidden',
            )}
        >
            <div className="flex items-center whitespace-nowrap px-3">
                <div className="mr-4 flex items-center justify-center">
                    <Avatar
                        alt="avatar"
                        src={userInfor.avatar || defaultAvatar}
                        sx={{ width: 32, height: 32 }}
                    />
                </div>
                <div className="flex flex-col">
                    <span className={cn(text)}>Phạm Đức Thông</span>
                    <span className={cn(text)}>Employer</span>
                    <span className={cn(text)}>
                        Tài khoản xác thực:{' '}
                        <span className="text-primary">Cấp 1/3</span>
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-6 whitespace-nowrap py-3 pl-5">
                <FontAwesomeIcon icon={faShield} />
                <span>Xác thực tài khoản điện tử</span>
                <FontAwesomeIcon icon={faAnglesRight} />
            </div>
            {routes.map((item, index) => (
                <SideBarItem
                    key={index}
                    divider={item.divider}
                    icon={item.icon}
                    href={item.href}
                    active={item.active}
                    lable={item.label}
                    onClick={item.onClick}
                />
            ))}
        </aside>
    );
}
