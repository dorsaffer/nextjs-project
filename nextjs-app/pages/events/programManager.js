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

export default function ProgramForm() {
  const [program, setProgram] = useState({
    programManagers: '',
  });
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
  return (
    <Segment padded='very'>
      <Header as='h2' textAlign='center'>
        Program managers
      </Header>
      <Header as='h5' color='grey' textAlign='center'>
        The program manager, is the one in charge to run the program during a
        specific period of time.
      </Header>
      <Divider />
      <Formik
        initialValues={program}
        validationSchema={ValidationSchema}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          setProgram({
            organization: values.organization,
            programName: values.programName,
            description: values.description,
            imageURL: values.imageURL,
            status: values.status,
            programManagers: values.programManagers,
          });
          setSubmitting(false);
        }}
      >
        {({ errors, touched, handleSubmit, handleBlur, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label htmlFor='programManagers'>Program managers</label>
              <Dropdown
                onChange={(_, { value }) => {
                  console.log(value);
                  setProgram({ ...program, programManagers: value });
                }}
                onBlur={handleBlur}
                name='programManagers'
                options={organizations}
                selection
                multiple
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
              >
                Next
              </Button>
            </div>
            <pre>{JSON.stringify(program)}</pre>
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
