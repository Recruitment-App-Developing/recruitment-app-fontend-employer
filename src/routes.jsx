import { createBrowserRouter } from 'react-router-dom';
import Test from './test';
import { DefaultLayout, StatisticLayout } from './layout';
import AccountSettingLayout from './layout/AccountSettingLayout';
import MyTable from './pages/JobManagement/Table';
import JobDetailPage from './pages/JobManagement/JobDetail';
import AppliedCandidateByJob from './pages/JobManagement/JobDetail/AppliedCandidateByJob';
import JobEditPage from './pages/JobManagement/JobEdit';
import CompanyInfor from './pages/AccountSetting';
import Login from './pages/Login';
import EmployerRegister from './pages/EmployerRegister';
import { AddAJob } from './pages/JobManagement/AddJob';
import JobInfor from './pages/JobManagement/JobDetail/JobInfor';
import MyInfor from './pages/AccountSetting/MyInfor';
import Dashboard from './pages/Dashboard';
import ChangePassword from './pages/AccountSetting/ChangePassword';

export const route = createBrowserRouter([
    {
        id: 'root',
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                id: 'dashboard',
                path: '/',
                element: <Dashboard />,
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
                        id: 'job-add',
                        path: 'job-add',
                        element: <AddAJob />,
                    },
                    {
                        id: 'job-detail',
                        path: 'job-detail',
                        element: <JobDetailPage />,
                        children: [
                            {
                                id: 'view-job-detail',
                                path: ':jobId',
                                element: <JobInfor />,
                            },
                            {
                                id: 'applied-candidate',
                                path: 'applied-candidate/:jobId',
                                element: <AppliedCandidateByJob />,
                            },
                            {
                                id: 'edit-job',
                                path: 'edit-job/:jobId',
                                element: <JobEditPage />,
                            },
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
                        element: <ChangePassword />,
                    },
                    {
                        id: 'my-info',
                        index: true,
                        element: <MyInfor />,
                    },
                    {
                        id: 'company-info',
                        path: 'company',
                        element: <CompanyInfor />,
                    },
                ],
            },
        ],
    },
    {
        id: 'login',
        path: '/login',
        element: <Login />,
    },
    {
        id: 'register',
        path: '/register',
        element: <EmployerRegister />,
    },
    {
        id: 'test',
        path: '/testUI',
        element: <Test />,
    },
]);
