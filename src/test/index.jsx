import { toast } from 'react-toastify';
import { DefaultLayout } from '../layout';
import Header from '../layout/DefaultLayout/Header';
import StepperCustom from '../components/Stepper';
import UploadPdfFolderModal from '../pages/CvInfoManagement/UploadCv/UploadCvModal';

export default function Test() {
    return (
        <div>
            <UploadPdfFolderModal open={true} />
        </div>
    );
}
