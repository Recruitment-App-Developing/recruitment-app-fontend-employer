import { Dialog, TextField } from '@mui/material';
import {
    Award,
    Experience,
    initAward,
    initExperience,
} from '../../cvInforType';
import useCvInfor from '../useCvInfor';
import { useState } from 'react';

interface UpdateexperienceModalProp {
    open: boolean;
    setOpen: any;
    experienceOld: Experience;
}

export default function UpdateexperienceModal({
    open = false,
    setOpen = () => {},
    experienceOld = initExperience,
}: UpdateexperienceModalProp) {
    const { updateExperience } = useCvInfor();
    const [experience, setexperience] = useState<Experience>(experienceOld);

    const handleSubmit = () => {
        updateExperience(experience);
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="responsive-dialog-title"
            maxWidth={false}
            PaperProps={{
                style: {
                    width: '700px',
                },
            }}
        >
            <div className="flex w-full flex-col gap-4 px-5 py-5">
                <h1 className="text-2xl font-bold text-success">
                    Cập nhật Kinh nghiệm ứng viên
                </h1>
                <TextField
                    id="experience-name"
                    label="Tên công ty"
                    variant="outlined"
                    size="small"
                    value={experience?.companyName || ''}
                    onChange={(e) =>
                        setexperience((prev) => ({
                            ...prev,
                            companyName: e.target.value,
                        }))
                    }
                    className="w-full"
                />
                <TextField
                    id="experience-industry"
                    label="Vị trí làm việc"
                    variant="outlined"
                    size="small"
                    value={experience?.position || ''}
                    onChange={(e) =>
                        setexperience((prev) => ({
                            ...prev,
                            position: e.target.value,
                        }))
                    }
                    className="w-full"
                />
                <TextField
                    id="experience-time"
                    label="Thời gian"
                    variant="outlined"
                    size="small"
                    value={experience?.timeStr || ''}
                    onChange={(e) =>
                        setexperience((prev) => ({
                            ...prev,
                            timeStr: e.target.value,
                        }))
                    }
                    className="w-full"
                />
                <TextField
                    id="experience-des"
                    label="Mô tả chi tiết"
                    variant="outlined"
                    size="small"
                    multiline
                    minRows={5}
                    value={experience?.detail || ''}
                    onChange={(e) =>
                        setexperience((prev) => ({
                            ...prev,
                            detail: e.target.value,
                        }))
                    }
                    className="w-full"
                />
                <div className="flex w-full justify-end gap-5">
                    <button
                        onClick={() => setOpen(false)}
                        className="rounded-md bg-slate-300 px-5 py-1 text-lg font-semibold text-black"
                    >
                        Huỷ
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="rounded-md bg-success px-5 py-1 text-lg font-semibold text-white"
                    >
                        Chỉnh sửa
                    </button>
                </div>
            </div>
        </Dialog>
    );
}
