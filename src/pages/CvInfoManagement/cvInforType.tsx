export class DetailCvInfor {
    cvId: string;
    cvInforId: string;
    cvName: string;
    fullName: string;
    phone: string;
    email: string;
    dob: string;
    address: string;
    applicationPosition: string;
    softSkills: string[];
    techSkills: string[];
    awards: Award[];
    educations: Education[];
    experiences: Experience[];
}

export const initDetailCvInfor: DetailCvInfor = {
    cvId: '',
    cvInforId: '',
    cvName: '',
    fullName: '',
    phone: '',
    email: '',
    dob: '',
    address: '',
    applicationPosition: '',
    softSkills: [],
    techSkills: [],
    awards: [],
    educations: [],
    experiences: [],
};

export class Award {
    id: string | null;
    name: string;
    timeStr: string;
}

export const initAward: Award = {
    id: null,
    name: '',
    timeStr: '',
};

export class Education {
    id: string | null;
    schoolName: string;
    industry: string;
    timeStr: string;
    detail: string;
}

export const initEducation: Education = {
    id: null,
    schoolName: '',
    industry: '',
    timeStr: '',
    detail: '',
};

export interface Experience {
    id: string | null;
    companyName: string;
    position: string;
    timeStr: string;
    detail: string;
}

export const initExperience: Experience = {
    id: null,
    companyName: '',
    position: '',
    timeStr: '',
    detail: '',
};

export interface CvInforItem {
    cvInforId: string;
    fullName: string;
    cvName: string;
    applicationPosition: string;
    address: string;
    awardQuantity: number;
    educationQuantity: number;
    experienceQuantity: number;
}

export interface AwardAuditDto {
    id: string;
    rev: number;
    revtype: number;
    name: string;
    time: string;
    revtstmp: string;
}

export interface CvProgressV2 {
    cvId: string;
    status: string;
    totalFiles: number;
    completedFiles: number;
}
