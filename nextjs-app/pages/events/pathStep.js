import React, { useState, useEffect, useMemo } from 'react';
import {
  Header,
  Grid,
  Label,
  Button,
  Form,
  Segment,
  Dropdown,
} from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as uuid from 'uuid';

const validationSchema = Yup.object().shape({
  step: Yup.array().required('Please choose the courses'),
});
export default function PathStep({
  nextStep,
  prevStep,
  programValues,
  handleProgramChange,
  initialCoursesList,
}) {
  const [path, setPath] = useState([{ id: '', courses: '' }]);
  //const [coursesList, setCoursesList] = useState(initialCoursesList);

  const next = (e) => {
    e.preventDefault();
    nextStep();
  };
  const back = (e) => {
    e.preventDefault();
    prevStep();
  };

  const handleChange = (e, index, value) => {
    const list = [...path];
    list[index].courses = value;
    setPath(list);
  };

  const handelAddStep = () => {
    const id = uuid.v1();
    setPath([...path, { id, courses: '' }]);
  };

  const handelRemoveStep = (index) => {
    const list = [...path];
    list.splice(index, 1);
    setPath(list);
  };
  return (
    <Segment className='container'>
      <Grid divided='vertically'>
        <Grid.Row>
          <Grid.Column verticalAlign='middle'>
            <Header as='h2' color='blue'>
              Program Path
            </Header>
            <Header as='h3' color='grey' size='small'>
              The program path composed from steps, each step have a set of
              courses
            </Header>
          </Grid.Column>
        </Grid.Row>

        {path.map((item, index) => {
          return (
            <Grid.Row columns={2} relaxed='very' divided key={item.id}>
              <Grid.Column verticalAlign='middle' textAlign='center' width={8}>
                <div>
                  <Header as='h4'>Step</Header>
                  <Label circular color='blue' size='massive'>
                    {index + 1}
                  </Label>
                </div>
              </Grid.Column>
              <Grid.Column verticalAlign='middle' textAlign='center'>
                <Formik
                  initialValues={{ step: path[index].courses || '' }}
                  validationSchema={validationSchema}
                  enableReinitialize
                  onSubmit={() => {
                    handelAddStep();
                  }}
                >
                  {({ errors, touched, values, handleBlur, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                      <Form.Field>
                        <Dropdown
                          key={item.id}
                          fluid
                          multiple
                          onBlur={handleBlur}
                          onChange={(e, value) =>
                            handleChange(e, index, { value })
                          }
                          options={initialCoursesList}
                          placeholder='Choose a course'
                          name='step'
                          selection
                          defaultValue={values.step}
                        />
                        <h1>
                          aaaaa ||
                          {console.log('currentStep', path[index].courses)}
                        </h1>
                        {errors.step && touched.step ? (
                          <Label basic color='red' pointing>
                            {errors.step}
                          </Label>
                        ) : null}
                      </Form.Field>
                      <div className='button'>
                        <Button.Group floated='right'>
                          {path.length - 1 === index && (
                            <Button
                              color='blue'
                              basic
                              icon='arrow left'
                              onClick={back}
                            />
                          )}
                          {path.length - 1 === index && (
                            <Button
                              icon='add'
                              basic
                              color='grey'
                              type='submit'
                            />
                          )}
                          {path.length - 1 !== index && (
                            <Button
                              color='red'
                              basic
                              icon='trash'
                              onClick={() => handelRemoveStep(index)}
                            />
                          )}
                          {path.length - 1 === index && (
                            <div>
                              <Button
                                color='blue'
                                basic
                                icon='arrow right'
                                onClick={next}
                              />
                            </div>
                          )}
                        </Button.Group>
                        <style jsx>{`
                          .button {
                            padding: 10px;
                          }
                        `}</style>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Grid.Column>
            </Grid.Row>
          );
        })}
      </Grid>
    </Segment>
  );
}
