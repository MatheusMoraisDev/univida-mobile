import React from "react";
import { StepsContainer } from "./styles";
import Step from "./step";
import { StepLine } from "./styles"; // Importar a linha

interface IStepsProps {
  currentStep: number;
  totalSteps: number;
}

const Steps = ({ currentStep, totalSteps }: IStepsProps) => {
  return (
    <StepsContainer>
      {Array.from({ length: totalSteps }, (_, index) => (
        <React.Fragment key={index}>
          <Step step={index + 1} currentStep={currentStep} />
          {index < totalSteps - 1 && <StepLine />}
        </React.Fragment>
      ))}
    </StepsContainer>
  );
}

export default Steps;
