import {
    faArrowRightFromBracket,
    faBell,
    faBookmark,
    faCaretDown,
    faCircleQuestion,
    faComment,
    faLightbulb,
    faPen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from '../../../utils/cn';
import { Link } from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { Avatar, Badge } from '@mui/material';
import BasicPopover from '../../../components/Popover';
import useSider from '../../../hooks/useSider';
import useAuth from '../../../hooks/useAuth';

export default function Header() {
    const { toggle } = useSider();

    const button =
        'w-fit flex items-center justify-center rounded-[30px] bg-[#3b546f] text-white text-sm px-4 py-1 font-medium gap-2 hover:opacity-80';
    const icon = 'bg-white rounded-[50%] text-[#3b546f] w-2 h-2 p-[3px]';

    const { logout } = useAuth();

    return (
        <div>
            <div className="absolute z-50 flex h-16 w-screen items-center justify-between bg-[#212f3f] px-5">
                <div>
                    <button onClick={toggle}>
                        <FontAwesomeIcon icon={faBars} className="text-white" />
                    </button>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <Link className={cn(button)}>
                        <FontAwesomeIcon
                            icon={faBookmark}
                            className={cn(icon)}
                        />
                        <span>HR Insider</span>
                    </Link>
                    <Link className={cn(button)}>
                        <FontAwesomeIcon icon={faPen} className={cn(icon)} />
                        <span>Đăng tin</span>
                    </Link>
                    <Link className={cn(button)}>
                        <FontAwesomeIcon icon={faPen} className={cn(icon)} />
                        <span>Tìm CV</span>
                    </Link>
                    <Link className={cn(button)}>
                        <FontAwesomeIcon
                            icon={faComment}
                            className={cn(icon)}
                        />
                        <span>Connect</span>
                    </Link>
                    <Link className={cn(button)}>
                        <FontAwesomeIcon
                            icon={faLightbulb}
                            className={cn(icon)}
                        />
                        <span>Insights</span>
                    </Link>
                    <Badge
                        color=""
                        overlap="circular"
                        badgeContent="2"
                        variant="dot"
                    >
                        <FontAwesomeIcon
                            icon={faBell}
                            className="p-[5px] text-sm"
                        />
                    </Badge>
                    <BasicPopover
                        content={
                            <ul>
                                <li className="flex items-center gap-3 py-1 hover:opacity-80">
                                    <FontAwesomeIcon icon={faCircleQuestion} />
                                    <span>Hỗ trợ</span>
                                </li>
                                <li className="flex items-center gap-3 py-1 hover:opacity-80">
                                    <FontAwesomeIcon
                                        icon={faArrowRightFromBracket}
                                    />
                                    <button onClick={logout}>Đăng xuất</button>
                                </li>
                            </ul>
                        }
                    >
                        <div className={cn(button, 'gap-3 px-1 pr-3')}>
                            <Avatar
                                alt="avatar"
                                src="https://mui.com/static/images/avatar/1.jpg"
                                sx={{ width: 22, height: 22 }}
                            />
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    </BasicPopover>
                </div>
            </div>
        </div>
    );
}
