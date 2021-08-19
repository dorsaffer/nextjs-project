import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Divider,
  Dropdown,
  Form,
  Header,
  Label,
  Segment,
  TextArea,
} from 'semantic-ui-react';

const ValidationSchema = Yup.object().shape({
  programManagers: Yup.array().required('Please enter the program manager'),
});

const organizations = [
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

export default function ProgramManagersForm({
  programValues,
  handleProgramChange,
  nextStep,
  prevStep,
}) {
  const next = (e) => {
    e.preventDefault();
    nextStep();
  };
  const back = (e) => {
    e.preventDefault();
    prevStep();
  };
  return (
    <Segment padded='very' className='container'>
      <Header as='h2' color='blue'>
        Program managers
      </Header>
      <Header as='h3' color='grey'>
        The program manager, is the one in charge to run the program during a
        specific period of time.
      </Header>
      <Divider />
      <Formik
        initialValues={{ programManagers: programValues.programManagers || '' }}
        validationSchema={ValidationSchema}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({
          errors,
          touched,
          handleSubmit,
          handleBlur,
          isSubmitting,
          values,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label htmlFor='programManagers'>Program managers</label>
              <Dropdown
                onChange={(_, { value }) => {
                  handleProgramChange('programManagers', value);
                }}
                onBlur={handleBlur}
                name='programManagers'
                options={organizations}
                selection
                multiple
                defaultValue={values.programManagers}
              />
              {errors.programManagers && touched.programManagers ? (
                <Label basic color='red' pointing>
                  {errors.programManagers}
                </Label>
              ) : null}
            </Form.Field>
            <div>
              <Button
                type='submit'
                floated='right'
                color='blue'
                disabled={isSubmitting}
                onClick={next}
              >
                Next
              </Button>
              <Button type='submit' floated='left' color='blue' onClick={back}>
                Back
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <style jsx>{`
                      .button {
                        width: 720px;
                        display: "flex",
                        justifyContent: "center",
                      }
                    `}</style>
    </Segment>
  );
}
