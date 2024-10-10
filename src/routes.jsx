import { createBrowserRouter } from 'react-router-dom';
import Test from './test';
import { DefaultLayout } from './layout';
import AccountSettingLayout from './layout/AccountSettingLayout';

export const route = createBrowserRouter([
    {
        id: 'root',
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                id: 'home',
                path: '/',
                element: <div>Home</div>,
            },
            {
                id: 'services',
                path: 'services',
                element: <div>Services</div>,
            },
            {
                id: 'account-setting',
                path: 'account/settings',
                element: <AccountSettingLayout />,
                children: [
                    {
                        id: 'change-password',
                        path: 'password',
                        element: <div>Change password</div>,
                    },
                    {
                        id: 'my-info',
                        index: true,
                        element: <div>My Info</div>,
                    },
                    {
                        id: 'company-info',
                        path: 'company',
                        element: <div>Company</div>,
                    },
                ],
            },
        ],
    },
    {
        id: 'test',
        path: '/testUI',
        element: <Test />,
    },
]);
