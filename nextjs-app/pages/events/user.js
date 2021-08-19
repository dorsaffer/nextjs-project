import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Divider,
  Grid,
  Header,
  Step,
  Segment,
  Image,
  List,
} from 'semantic-ui-react';

export default function ProgramForm() {
  const [program, setProgram] = useState({
    organization: { slug: 'think-it' },
    programName: 'IOT',
    description: 'Internet of thing',
    imageURL:
      'https://itsocial.fr/wp-content/uploads/2019/07/iStock-946094534.jpg',
    status: '',
    path: [{ courses: [''] }, { courses: [''] }, { courses: [''] }],
    programManagers: ['p1', 'p2'],
  });

  return (
    <Segment padded='very'>
      <Header as='h2' textAlign='center'>
        Validation
      </Header>
      <Header as='h5' color='grey' textAlign='center'>
        The program manager, is the one in charge to run the program during a
        specific period of time.
      </Header>
      <Divider />
      <Grid>
        <Grid.Column width={2}>
          <Image src={program.imageURL} size='small'></Image>
        </Grid.Column>
        <Grid.Column width={14}>
          <Header as='h1'>{program.programName}</Header>
          <div>{program.description}</div>
        </Grid.Column>
      </Grid>
      {program.path.length > 0 ? (
        <Step.Group widths={program.path.length}>
          {program.path.map((e, index) => (
            <Step key={index}>
              <Step.Content>
                <Step.Title>Step {index + 1} </Step.Title>
              </Step.Content>
            </Step>
          ))}
        </Step.Group>
      ) : null}
      <Header as='h5' color='grey'>
        Program managers
      </Header>
      <List divided relaxed>
        {program.programManagers.map((e, index) => (
          <List.Item key={index}>
            <Image
              avatar
              src='https://cdn1.vectorstock.com/i/1000x1000/23/70/man-avatar-icon-flat-vector-19152370.jpg'
            />
            <List.Content>
              <List.Header as='a'>Rachel</List.Header>
              <List.Description>
                Last seen watching{' '}
                <a>
                  <b>Arrested Development</b>
                </a>{' '}
                just now.
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
      <Button type='submit' floated='right' color='blue'>
        Next
      </Button>
    </Segment>
  );
}
