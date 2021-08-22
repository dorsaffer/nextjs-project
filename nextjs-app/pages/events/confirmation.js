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

export default function Confirmation({ prevStep, programValues }) {
  console.log(programValues);
  const back = (e) => {
    e.preventDefault();
    prevStep();
  };
  return (
    <Segment padded='very' className='container'>
      <Header as='h2' color='blue'>
        Validation
      </Header>
      <Header as='h3' color='grey'>
        The program manager, is the one in charge to run the program during a
        specific period of time.
      </Header>
      <Divider />
      <Grid>
        <Grid.Column width={2}>
          <Image src={programValues.imageURL} size='small'></Image>
        </Grid.Column>
        <Grid.Column width={14}>
          <Header as='h1'>{programValues.programName}</Header>
          <div>{programValues.description}</div>
        </Grid.Column>
      </Grid>
      {programValues.path.length > 0 ? (
        <Step.Group widths={programValues.path.length}>
          {programValues.path.map((e, index) => (
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
        {programValues.programManagers.map((e, index) => (
          <List.Item key={index}>
            <Image
              avatar
              src='https://cdn1.vectorstock.com/i/1000x1000/23/70/man-avatar-icon-flat-vector-19152370.jpg'
            />
            <List.Content>
              <List.Header as='a'>{e}</List.Header>
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
      <Button type='submit' floated='left' color='blue' onClick={back}>
        Back
      </Button>
      <Button type='submit' floated='right' color='blue'>
        Finish
      </Button>
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
