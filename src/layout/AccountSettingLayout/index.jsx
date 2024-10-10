import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

export default function AccountSettingLayout() {
    return (
        <div className="flex justify-center bg-slate-100">
            <div>
                <SideBar />
            </div>
            <div className="flex h-full w-full items-start justify-center p-2">
                <Outlet />
            </div>
        </div>
    );
}
