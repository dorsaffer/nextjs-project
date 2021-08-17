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
    organization: '',
    programName: '',
    description: '',
    imageURL: '',
    status: '',
    pg: '',
  });
  const ValidationSchema = Yup.object().shape({
    programName: Yup.string().required('The program name is required.'),
    organization: Yup.string()
      .ensure()
      .required('Select the organization first.'),
    description: Yup.string()
      .min(8, 'The program description is to short.')
      .required('The program description is required.'),
    imageURL: Yup.string()
      .required("Please enter the program's image link")
      .url('The image link format is invalid'),
    pg: Yup.array().required('Please enter the program manager'),
  });

  const organizations = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'dz', value: 'dz', text: 'Algeria' },
    { key: 'as', value: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'ao', text: 'Angola' },
    { key: 'bd', value: 'bd', text: 'Bangladesh' },
    { key: 'bb', value: 'bb', text: 'Barbados' },
    { key: 'by', value: 'by', text: 'Belarus' },
    { key: 'be', value: 'be', text: 'Belgium' },
  ];
  return (
    <Segment padded='very'>
      <Header as='h2' textAlign='center'>
        Create Program
      </Header>
      <Header as='h5' color='grey' textAlign='center'>
        A program is a set of courses, ordered in a learning path, to teach
        specific skills.
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
            pd: values.pg,
          });
          setSubmitting(false);
        }}
      >
        {({
          errors,
          touched,
          values,
          handleSubmit,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label htmlFor='organization'>Organization</label>
              <select
                onChange={handleChange}
                onBlur={handleBlur}
                name='organization'
              >
                <option disabled selected value='Choose the organization'>
                  Choose the organization
                </option>
                {organizations.map((organization) => (
                  <option key={organization.key} value={organization.value}>
                    {organization.text}
                  </option>
                ))}
              </select>
              {errors.organization && touched.organization ? (
                <Label basic color='red' pointing>
                  {errors.organization}
                </Label>
              ) : null}
            </Form.Field>
            <Form.Field>
              <label htmlFor='programName'>Name</label>
              <input
                placeholder='Program name'
                name='programName'
                value={values.programName}
                onChange={handleChange}
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
                placeholder='Tell us more'
                name='description'
                value={values.description}
                onChange={handleChange}
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
              <input
                placeholder='Image URL'
                name='imageURL'
                value={values.imageURL}
                onChange={handleChange}
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
              <input
                type='Checkbox'
                name='status'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.status}
              />
              <label htmlFor='published'>Published</label>
            </Form.Field>
            <Form.Field>
              <label htmlFor='status'>pg</label>
              <Dropdown
                onChange={(e, { value }) => {
                  console.log(value);
                  setProgram({ ...program, pg: value });
                }}
                onBlur={handleBlur}
                name='pg'
                options={organizations}
                selection
                multiple
              />
              {errors.pg && touched.pg ? (
                <Label basic color='red' pointing>
                  {errors.pg}
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
