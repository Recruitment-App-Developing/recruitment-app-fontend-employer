import { Outlet } from 'react-router-dom';
import Header from './Header';
import { DetailSideBar as SideBar } from './SideBar';
import useSideBarRoutes from '../../hooks/useSideBarRoutes';
import cn from '../../utils/cn';
import useSider from '../../hooks/useSider';

export default function DefaultLayout() {
    const routes = useSideBarRoutes();
    const { isOpen } = useSider();
    const activeRoute = routes.find((item) => item.active);

    return (
        <div className="h-lvh w-full">
            <Header />
            <SideBar />
            <div
                className={cn(
                    `relative h-full w-full overflow-y-auto overflow-x-hidden bg-slate-200 pt-16
                    transition-all`,
                    isOpen ? 'md:pl-80' : 'md:pl-16',
                )}
            >
                {activeRoute && (
                    <div className="bg-white py-5 pl-4 shadow-sm">
                        {activeRoute.label}
                    </div>
                )}
                <div className="flex h-full w-full items-center justify-center px-5 pb-20 pt-5">
                    <div className="flex h-full w-full items-center justify-center rounded-md">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
