import { Divider } from '@mui/material';
import cn from '../../../utils/cn';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SideBarItem({
    divider,
    icon,
    href,
    active,
    lable,
    onClick,
}) {
    const className =
        'flex items-center p-2 pl-5 gap-6 hover:text-primary rounded-lg transition-all hover:bg-gray-50 text-nowrap';
    if (divider) return <Divider />;

    if (!href)
        return (
            <button onClick={onClick} className={cn(className)}>
                {lable}
            </button>
        );

    return (
        <Link to={href} className={cn(className, active && 'text-primary')}>
            <FontAwesomeIcon icon={icon} />
            <span>{lable}</span>
        </Link>
    );
}
