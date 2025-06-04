import { useContext } from 'react';
import { Award, Education, Experience } from '../cvInforType';
import { useCvInforContext } from './CvInforContext';

export default function useCvInfor() {
    const { cvInfor, setCvInfor } = useCvInforContext();

    const updateAward = (award: Award) => {
        setCvInfor((prev) => {
            const existingIndex = prev.awards.findIndex(
                (item) => item.id === award.id,
            );
            let updatedAwards: Award[];

            if (existingIndex !== -1) {
                updatedAwards = [...prev.awards];
                updatedAwards[existingIndex] = award;
            } else {
                updatedAwards = [...prev.awards, award];
            }

            return {
                ...prev,
                awards: updatedAwards,
            };
        });
    };

    const updateEducation = (education: Education) => {
        setCvInfor((prev) => {
            const existingIndex = prev.educations.findIndex(
                (item) => item.id === education.id,
            );

            let updatedEducations: Education[];
            if (education.id !== null && existingIndex !== -1) {
                updatedEducations = [...prev.educations];
                updatedEducations[existingIndex] = education;
            } else {
                updatedEducations = [...prev.educations, education];
            }

            return {
                ...prev,
                educations: updatedEducations,
            };
        });
    };

    const updateExperience = (experience: Experience) => {
        setCvInfor((prev) => {
            const existingIndex = prev.experiences.findIndex(
                (item) => item.id === experience.id,
            );

            let updatedExperiences: Experience[];
            if (experience.id !== null && existingIndex !== -1) {
                updatedExperiences = [...prev.experiences];
                updatedExperiences[existingIndex] = experience;
            } else {
                updatedExperiences = [...prev.experiences, experience];
            }

            return {
                ...prev,
                experiences: updatedExperiences,
            };
        });
    };

    const deleteAward = (id: string | null) => {
        setCvInfor((prev) => {
            const updatedAwards = prev.awards.filter((item) => item.id !== id);

            return {
                ...prev,
                awards: updatedAwards,
            };
        });
    };

    const deleteEducaiton = (id: string | null) => {
        setCvInfor((prev) => {
            const updatedEducations = prev.educations.filter(
                (item) => item.id !== id,
            );

            return {
                ...prev,
                educations: updatedEducations,
            };
        });
    };

    const deleteExperience = (id: string | null) => {
        setCvInfor((prev) => {
            const updatedExperiences = prev.experiences.filter(
                (item) => item.id !== id,
            );

            return {
                ...prev,
                experiences: updatedExperiences,
            };
        });
    };

    return {
        cvInfor,
        setCvInfor,
        updateAward,
        updateEducation,
        updateExperience,
        deleteAward,
        deleteEducaiton,
        deleteExperience,
    };
}
