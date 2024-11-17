import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function StepperCustom({
    stepperTitle = [],
    stepperContent = [],
    finishButton = 'Hoàn thành',
    handleSubmit = () => {},
}) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const totalSteps = () => {
        return stepperTitle.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                  stepperTitle.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        setCompleted({
            ...completed,
            [activeStep]: true,
        });
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper nonLinear activeStep={activeStep}>
                {stepperTitle.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                {allStepsCompleted() ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                pt: 2,
                            }}
                        >
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                            {stepperContent[activeStep]}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                pt: 2,
                            }}
                        >
                            <button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className="mt-3 rounded-md bg-primary px-4 py-2 font-medium text-white"
                            >
                                Quay lại
                            </button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <button
                                onClick={handleNext}
                                className="mr-3 mt-3 rounded-md bg-primary px-4 py-2 font-medium text-white"
                            >
                                Tiếp theo
                            </button>
                            {activeStep !== stepperTitle.length &&
                                (completed[activeStep] ? (
                                    <Typography
                                        variant="caption"
                                        sx={{ display: 'inline-block' }}
                                    >
                                        Bước {activeStep + 1} đã hoàn thành
                                    </Typography>
                                ) : completedSteps() === totalSteps() - 1 ? (
                                    <button
                                        onClick={handleSubmit}
                                        className="mt-3 rounded-md bg-primary px-4 py-2 font-medium text-white"
                                    >
                                        {finishButton}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleComplete}
                                        className="mt-3 rounded-md bg-primary px-4 py-2 font-medium text-white"
                                    >
                                        Hoàn thành
                                    </button>
                                ))}
                        </Box>
                    </React.Fragment>
                )}
            </div>
        </Box>
    );
}
