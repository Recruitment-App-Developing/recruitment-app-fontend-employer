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
            {/* <div className="flex h-[600px] w-full"> */}
            {/* <div className="container flex-1 flex-col justify-center bg-secondary"> */}
            <div
                className={cn(
                    'relative h-full w-full overflow-y-auto overflow-x-hidden pt-16 transition-all',
                    isOpen ? 'md:pl-80' : 'md:pl-16',
                )}
            >
                {activeRoute && (
                    <div className="bg-white py-5 pl-4">
                        {activeRoute.label}
                    </div>
                )}
                <Outlet />
            </div>
            {/* </div> */}
            {/* </div> */}
        </div>
    );
}
