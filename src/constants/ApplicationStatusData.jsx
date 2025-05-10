import {
    faBan,
    faCalendarCheck,
    faComments,
    faEnvelopeOpen,
    faEye,
    faUserCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NEW = 'NEW';
export const VIEWD = 'VIEWED';
export const INTERVIEW_APPOINTMENT = 'INTERVIEW_APPOINTMENT';
export const INTERVIEWED = 'INTERVIEWED';
export const OFFERED = 'OFFERED';
export const HIRED = 'HIRED';
export const SKIP = 'SKIP';

export const applicationStatusData = [
    {
        code: NEW,
        title: 'Mới',
    },
    {
        code: VIEWD,
        title: 'Đã xem',
        icon: <FontAwesomeIcon icon={faEye} className="text-blue" />,
    },
    {
        code: INTERVIEW_APPOINTMENT,
        title: 'Hẹn phỏng vấn',
        icon: <FontAwesomeIcon icon={faCalendarCheck} className="text-green" />,
    },
    {
        code: INTERVIEWED,
        title: 'Đã phỏng vấn',
        icon: <FontAwesomeIcon icon={faComments} className="text-purple" />,
    },
    {
        code: OFFERED,
        title: 'Đã gửi offer',
        icon: <FontAwesomeIcon icon={faEnvelopeOpen} className="text-yellow" />,
    },
    {
        code: HIRED,
        title: 'Đã nhận việc',
        icon: <FontAwesomeIcon icon={faUserCheck} className="text-teal" />,
    },
    {
        code: SKIP,
        title: 'Bỏ qua',
        icon: <FontAwesomeIcon icon={faBan} className="text-red" />,
    },
];
