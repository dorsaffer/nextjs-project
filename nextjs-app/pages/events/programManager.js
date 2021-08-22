import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Divider,
  Dropdown,
  Form,
  Header,
  Label,
  Segment,
} from 'semantic-ui-react';

const validationSchema = Yup.object().shape({
  programManagers: Yup.array().required('Please enter the program manager'),
});

export default function ProgramManagersForm({
  programValues,
  handleProgramChange,
  nextStep,
  prevStep,
  programManagersList,
}) {
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
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={() => {
          nextStep();
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
                options={programManagersList}
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
              <Button type='submit' floated='right' color='blue'>
                Next
              </Button>
              <Button type='submit' floated='left' color='blue' onClick={back}>
                Back
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
