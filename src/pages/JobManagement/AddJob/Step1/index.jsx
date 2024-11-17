import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddJobFirstForm from '../AddJobFirstForm';
import AddressProvider from '../components/Address/AddressContext';
import FieldCard from '../FieldCard';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import MultipleUploadImages from '../../../../components/MultiImage/MutilpleUploadImages';

export default function Step1({ job, setJob }) {
    return (
        <>
            <AddressProvider>
                <AddJobFirstForm job={job} setJob={setJob} />
            </AddressProvider>

            <div className="mt-3">
                <FieldCard
                    icon={<FontAwesomeIcon icon={faBriefcase} />}
                    title="Ảnh minh hoạ công việc"
                >
                    <MultipleUploadImages
                        limit={5}
                        value={job.imageList}
                        onChange={(v) => {
                            setJob({ ...job, imageList: v });
                        }}
                    />
                </FieldCard>
            </div>
        </>
    );
}
