import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Divider,
  Checkbox,
  Form,
  Header,
  Label,
  Segment,
  Input,
  Dropdown,
  TextArea,
} from 'semantic-ui-react';

const validationSchema = Yup.object().shape({
  programName: Yup.string().required('The program name is required.'),
  organization: Yup.string().required('Select the organization first.'),
  description: Yup.string()
    .min(8, 'The program description is to short.')
    .required('The program description is required.'),
  imageURL: Yup.string()
    .required("Please enter the program's image link")
    .url('The image link format is invalid'),
});
const organizations = [
  { key: 'm', text: 'React', value: 'React' },
  { key: 'f', text: 'angular', value: 'angular' },
  { key: 'o', text: 'nextjs', value: 'nextjs' },
];

export default function ProgramInfoForm({
  nextStep,
  programValues,
  handleProgramChange,
}) {
  const [program, setProgram] = useState({
    organization: '',
    programName: '',
    description: '',
    imageURL: '',
    status: '',
  });
  const next = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <Segment style={{ width: 720, margin: '0 auto' }}>
      <Header as='h2'>Create Program</Header>
      <Header as='h3' size='small' color='grey' style={{ marginTop: 0 }}>
        A program is a set of courses, ordered in a learning path, to teach
        specific skills.
      </Header>
      <Divider />
      <Formik
        initialValues={{
          organization: programValues.organization || '',
          programName: programValues.programName || '',
          description: programValues.description || '',
          imageURL: programValues.imageURL || '',
          status: programValues.status || '',
        }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          console.log(programValues);
          nextStep();
          setSubmitting(true);
        }}
      >
        {({ errors, touched, values, handleSubmit, handleBlur, isValid }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label htmlFor='organization'>Organization</label>
              <Dropdown
                placeholder='Select the organization'
                fluid
                selection
                onChange={(_, { value }) => {
                  setProgram({ ...program, organization: value });
                  handleProgramChange('organization', value);
                }}
                onBlur={handleBlur}
                name='organization'
                defaultValue={values.organization}
                options={organizations}
              />
              {errors.organization && touched.organization ? (
                <Label basic color='red' pointing>
                  {errors.organization}
                </Label>
              ) : null}
            </Form.Field>
            <Form.Field>
              <label htmlFor='programName'>Name</label>
              <Input
                placeholder='Program name'
                name='programName'
                value={values.programName}
                onChange={(_, { value }) => {
                  handleProgramChange('programName', value);
                }}
                onBlur={handleBlur}
              />
              {errors.programName && touched.programName ? (
                <Label basic color='red' pointing>
                  {errors.programName}
                </Label>
              ) : null}
            </Form.Field>
            <Form.Field>
              <label htmlFor='description'>Description</label>
              <TextArea
                placeholder='Tell us more about the program'
                name='description'
                value={values.description}
                onChange={(_, { value }) => {
                  handleProgramChange('description', value);
                }}
                onBlur={handleBlur}
              />
              {errors.description && touched.description ? (
                <Label basic color='red' pointing>
                  {errors.description}
                </Label>
              ) : null}
            </Form.Field>
            <Form.Field>
              <label htmlFor='imageURL'>Image URL</label>
              <Input
                placeholder='Image URL'
                name='imageURL'
                value={values.imageURL}
                onChange={(_, { value }) => {
                  handleProgramChange('imageURL', value);
                }}
                onBlur={handleBlur}
              />
              {errors.imageURL && touched.imageURL ? (
                <Label basic color='red' pointing>
                  {errors.imageURL}
                </Label>
              ) : null}
            </Form.Field>
            <Form.Field inline>
              <label htmlFor='status'>Status</label>
              <Checkbox
                label='published'
                name='status'
                onChange={(_, { value }) => {
                  handleProgramChange('status', value);
                }}
                onBlur={handleBlur}
                value='published'
              />
            </Form.Field>

            <Button
              type='submit'
              className='button'
              floated='right'
              color='blue'
            >
              Next
            </Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
