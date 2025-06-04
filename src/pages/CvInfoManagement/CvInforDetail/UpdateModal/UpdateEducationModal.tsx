import { Dialog, TextField } from '@mui/material';
import { Award, Education, initAward, initEducation } from '../../cvInforType';
import useCvInfor from '../useCvInfor';
import { useState } from 'react';

interface UpdateEducationModalProp {
    open: boolean;
    setOpen: any;
    educationOld: Education;
}

export default function UpdateEducationModal({
    open = false,
    setOpen = () => {},
    educationOld = initEducation,
}: UpdateEducationModalProp) {
    const { updateEducation } = useCvInfor();
    const [education, setEducation] = useState<Education>(educationOld);

    const handleSubmit = () => {
        updateEducation(education);
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
                    Cập nhật Học vấn ứng viên
                </h1>
                <TextField
                    id="education-name"
                    label="Tên trường học"
                    variant="outlined"
                    size="small"
                    value={education?.schoolName || ''}
                    onChange={(e) =>
                        setEducation((prev) => ({
                            ...prev,
                            schoolName: e.target.value,
                        }))
                    }
                    className="w-full"
                />
                <TextField
                    id="education-industry"
                    label="Tên ngành học"
                    variant="outlined"
                    size="small"
                    value={education?.industry || ''}
                    onChange={(e) =>
                        setEducation((prev) => ({
                            ...prev,
                            industry: e.target.value,
                        }))
                    }
                    className="w-full"
                />
                <TextField
                    id="education-time"
                    label="Thời gian"
                    variant="outlined"
                    size="small"
                    value={education?.timeStr || ''}
                    onChange={(e) =>
                        setEducation((prev) => ({
                            ...prev,
                            timeStr: e.target.value,
                        }))
                    }
                    className="w-full"
                />
                <TextField
                    id="education-des"
                    label="Mô tả chi tiết"
                    variant="outlined"
                    size="small"
                    multiline
                    minRows={5}
                    value={education?.detail || ''}
                    onChange={(e) =>
                        setEducation((prev) => ({
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
