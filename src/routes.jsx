import { createBrowserRouter } from 'react-router-dom';
import Test from './test';
import { DefaultLayout, StatisticLayout } from './layout';
import AccountSettingLayout from './layout/AccountSettingLayout';
import MyTable from './pages/JobManagement/Table';
import JobDetailPage from './pages/JobManagement/JobDetail';
import AppliedCandidateByJob from './pages/JobManagement/JobDetail/AppliedCandidateByJob';

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
                id: 'job-management',
                path: 'jobs',
                children: [
                    {
                        id: 'job-list',
                        index: true,
                        element: (
                            <StatisticLayout>
                                <MyTable />
                            </StatisticLayout>
                        ),
                    },
                    {
                        id: 'job-detail',
                        path: 'job-detail',
                        element: <JobDetailPage />,
                        children: [
                            { id: 'view-job-detail', path: ':jobId' },
                            {
                                id: 'applied-candidate',
                                path: 'applied-candidate/:jobId',
                                element: <AppliedCandidateByJob />,
                            },
                            { id: 'edit-job', path: 'edit-job/:jobId' },
                        ],
                    },
                ],
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
