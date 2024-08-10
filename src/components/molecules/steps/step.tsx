import React from "react";
import { StepStyles, StepText } from "./styles";

interface IStepProps {
  step: number;
  currentStep: number;
}

const Step = ({ step, currentStep }: IStepProps) => {
  return (
    <StepStyles isActive={step === currentStep}>
      <StepText isActive={step === currentStep}>{step}</StepText>
    </StepStyles>
  );
};

export default Step;
