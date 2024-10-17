import { NavLink } from 'react-router-dom';

const routes = [
    {
        label: 'Danh sách ứng viên',
        href: '/jobs/job-detail/applied-candidate/:jobId',
    },
    {
        label: 'Xem chi tiết tin',
        href: '/jobs/job-detail/:jobId',
    },
    {
        label: 'Chỉnh sửa tin',
        href: '/jobs/job-detail/edit-job/:jobId',
    },
];

export default function SideBar({ jobId = 1 }) {
    return (
        <ul className="flex h-10 w-full">
            {routes.map((item, index) => (
                <li key={index} className="px-3 py-2">
                    <NavLink to={item.href.replace(':jobId', jobId)}>
                        {item.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}
