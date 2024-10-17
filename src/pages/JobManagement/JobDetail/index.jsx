import { Outlet, useParams } from 'react-router-dom';
import SideBar from './SideBar';

export default function JobDetailPage() {
    const jobId = useParams();

    return (
        <div className="h-full w-full bg-white">
            <SideBar />
            <div>
                <Outlet />
            </div>
        </div>
    );
}
