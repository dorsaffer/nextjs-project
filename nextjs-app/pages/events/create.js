import React, { useState } from 'react';
import ProgramManagersForm from './programManager';
import ProgramInfoForm from './programInfoForm';
import PathStep from './PathStep';
import Confirmation from './confirmation';

export default function CreateForm() {
  const [step, setStep] = useState(1);
  const [program, setProgram] = useState({
    organization: '',
    programName: '',
    description: '',
    imageURL: '',
    status: '',
    path: [],
    programManagers: '',
  });

  // Proceed to next step of the form
  const handleNextStep = () => {
    setStep(step + 1);
    console.log('step', step);
  };

  // Get back to the last step of the form
  const handlePrevStep = () => {
    setStep(step - 1);
  };

  // Handle program state change
  const handleChange = (input, value) => {
    console.log('input', input, 'value', value);
    setProgram({ ...program, [input]: value });
    console.log(program);
  };
  console.log(program);
  const {
    organization,
    programName,
    description,
    imageURL,
    status,
    path,
    programManagers,
  } = program;
  const values = {
    organization,
    programName,
    description,
    imageURL,
    status,
    path,
    programManagers,
  };

  switch (step) {
    case 1:
      return (
        <ProgramInfoForm
          nextStep={handleNextStep}
          handleProgramChange={handleChange}
          programValues={values}
        />
      );
    case 2:
      return (
        <PathStep
          nextStep={handleNextStep}
          prevStep={handlePrevStep}
          handleProgramChange={handleChange}
          programValues={values}
        />
      );
    case 3:
      return (
        <ProgramManagersForm
          nextStep={handleNextStep}
          prevStep={handlePrevStep}
          handleProgramChange={handleChange}
          programValues={values}
        />
      );
    case 4:
      return (
        <Confirmation
          prevStep={handlePrevStep}
          handleChange={handleChange}
          values={values}
        />
      );
    default:
      console.log('loading');
  }
}
