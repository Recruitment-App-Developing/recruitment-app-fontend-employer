import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

export default function AccountSettingLayout() {
    return (
        <div className="flex h-fit w-full justify-center bg-white">
            <div className="bg-[#f5f8fa]">
                <SideBar />
            </div>
            <div className="flex h-fit w-full items-start justify-center p-2">
                <Outlet />
            </div>
        </div>
    );
}
