import SideBarItem from '../DefaultLayout/SideBar/SideBarItem';
import useSideBar from './useSideBar';

export default function SideBar() {
    const routes = useSideBar();

    return (
        <ul className="flex flex-col">
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
        </ul>
    );
}
