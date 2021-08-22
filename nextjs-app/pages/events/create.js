import React, { useState } from 'react';
import ProgramManagersForm from './programManager';
import ProgramInfoForm from './programInfoForm';
import PathStep from './PathStep';
import Confirmation from './confirmation';

const programManagersList = [
  {
    key: 'af',
    value: 'af',
    text: 'Afghanistan',
    image: {
      avatar: true,
      src: 'https://cdn1.vectorstock.com/i/1000x1000/23/70/man-avatar-icon-flat-vector-19152370.jpg',
    },
  },
  {
    key: 'dz',
    value: 'dz',
    text: 'Algeria',
    image: {
      avatar: true,
      src: 'https://cdn1.vectorstock.com/i/1000x1000/23/70/man-avatar-icon-flat-vector-19152370.jpg',
    },
  },
  {
    key: 'as',
    value: 'as',
    text: 'American Samoa',
    image: {
      avatar: true,
      src: 'https://cdn1.vectorstock.com/i/1000x1000/23/70/man-avatar-icon-flat-vector-19152370.jpg',
    },
  },
  {
    key: 'ad',
    value: 'ad',
    text: 'Andorra',
    image: {
      avatar: true,
      src: 'https://cdn1.vectorstock.com/i/1000x1000/23/70/man-avatar-icon-flat-vector-19152370.jpg',
    },
  },
  {
    key: 'ao',
    value: 'ao',
    text: 'Angola',
    image: {
      avatar: true,
      src: 'https://cdn1.vectorstock.com/i/1000x1000/23/70/man-avatar-icon-flat-vector-19152370.jpg',
    },
  },
  {
    key: 'bd',
    value: 'bd',
    text: 'Bangladesh',
    image: {
      avatar: true,
      src: 'https://cdn1.vectorstock.com/i/1000x1000/23/70/man-avatar-icon-flat-vector-19152370.jpg',
    },
  },
];
const coursesList = [
  { key: 'm', text: 'React', value: 'React' },
  { key: 'f', text: 'angular', value: 'angular' },
  { key: 'o', text: 'nextjs', value: 'nextjs' },
];

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
  };

  // Get back to the last step of the form
  const handlePrevStep = () => {
    setStep(step - 1);
  };

  // Handle program state change
  const handleChange = (input, value) => {
    setProgram({ ...program, [input]: value });
  };

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
          initialCoursesList={coursesList}
        />
      );
    case 3:
      return (
        <ProgramManagersForm
          nextStep={handleNextStep}
          prevStep={handlePrevStep}
          handleProgramChange={handleChange}
          programValues={values}
          programManagersList={programManagersList}
        />
      );
    case 4:
      return (
        <Confirmation
          prevStep={handlePrevStep}
          handleChange={handleChange}
          programValues={values}
        />
      );
    default:
      console.log('loading');
  }
}
