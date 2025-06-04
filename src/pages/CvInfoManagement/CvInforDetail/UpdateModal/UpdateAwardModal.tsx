import { Dialog, TextField } from '@mui/material';
import { Award, initAward } from '../../cvInforType';
import useCvInfor from '../useCvInfor';
import { useState } from 'react';

interface UpdateAwardModalProp {
    open: boolean;
    setOpen: any;
    awardOld: Award;
}

export default function UpdateAwardModal({
    open = false,
    setOpen = () => {},
    awardOld = initAward,
}: UpdateAwardModalProp) {
    const { updateAward } = useCvInfor();
    const [award, setAward] = useState<Award>(awardOld);

    const handleSubmit = () => {
        updateAward(award);
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
                    Cập nhật Giải thưởng ứng viên
                </h1>
                <TextField
                    id="award-name"
                    label="Tên giải thưởng"
                    variant="outlined"
                    size="small"
                    value={award?.name || ''}
                    onChange={(e) =>
                        setAward((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full"
                />
                <TextField
                    id="award-time"
                    label="Thời gian"
                    variant="outlined"
                    size="small"
                    value={award?.timeStr || ''}
                    onChange={(e) =>
                        setAward((prev) => ({
                            ...prev,
                            timeStr: e.target.value,
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
