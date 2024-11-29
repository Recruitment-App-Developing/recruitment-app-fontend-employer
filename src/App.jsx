import { RouterProvider } from 'react-router-dom';
import { route } from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Fragment } from 'react';

function App() {
    return (
        <Fragment>
            <RouterProvider router={route} />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                limit={5}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </Fragment>
    );
}

export default App;
