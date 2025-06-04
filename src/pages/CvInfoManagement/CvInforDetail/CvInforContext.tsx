import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DetailCvInfor, initDetailCvInfor } from '../cvInforType';

interface CvInforContextType {
    cvInfor: DetailCvInfor;
    setCvInfor: React.Dispatch<React.SetStateAction<DetailCvInfor>>;
}

export const CvInforContext = createContext<CvInforContextType | undefined>(
    undefined,
);

export const CvInforProvider = ({ children }: { children: ReactNode }) => {
    const [cvInfor, setCvInfor] = useState<DetailCvInfor>(initDetailCvInfor);

    return (
        <CvInforContext.Provider value={{ cvInfor, setCvInfor }}>
            {children}
        </CvInforContext.Provider>
    );
};

export const useCvInforContext = () => {
    const context = useContext(CvInforContext);
    if (!context) {
        throw new Error(
            'useCvInforContext must be used within CvInforProvider',
        );
    }
    return context;
};
