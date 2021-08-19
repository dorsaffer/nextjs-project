import React, { useState, useEffect } from 'react';
import {
  Header,
  Grid,
  Label,
  Button,
  Form,
  Segment,
  Dropdown,
} from 'semantic-ui-react';
import * as uuid from 'uuid';
const initialCourses = [
  { key: 'm', text: 'React', value: 'React' },
  { key: 'f', text: 'angular', value: 'angular' },
  { key: 'o', text: 'nextjs', value: 'nextjs' },
];
export default function Step() {
  const [path, setPath] = useState([{ id: '', courses: [''] }]);

  const [coursesList, setCoursesList] = useState(initialCourses);

  const handleChange = (e, index, value) => {
    const list = [...path];
    list[index].courses = value;
    setPath(list);
  };

  const handelAddStep = () => {
    const id = uuid.v1();
    const lastStep = path[path.length - 1].courses;
    const currentCourseList = [...coursesList];

    let filtered = currentCourseList.filter(function (e) {
      return this.indexOf(e.value) < 0;
    }, lastStep);
    console.log('new filtered list', filtered);
    setCoursesList(filtered);
    console.log('new courses list', coursesList);

    setPath([...path, { id, courses: [''] }]);
  };

  const handelRemoveStep = (index) => {
    const list = [...path];
    list.splice(index, 1);
    setPath(list);
  };

  return (
    <Segment>
      <Grid divided='vertically'>
        <Grid.Row>
          <Grid.Column verticalAlign='middle' textAlign='center'>
            <Segment>
              <Header as='h2' textAlign='center'>
                Program Path
              </Header>
              <Header as='h6' color='grey' size='small' textAlign='center'>
                The program path composed from the diff steps
              </Header>
            </Segment>
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
                <Form>
                  <Dropdown
                    key={item.id}
                    fluid
                    multiple
                    onChange={(e, value) => handleChange(e, index, { value })}
                    options={coursesList}
                    placeholder='Choose a course'
                    selection
                  />
                  <div className='button'>
                    <Button.Group floated='right'>
                      {path.length - 1 === index && (
                        <Button
                          icon='add'
                          basic
                          color='grey'
                          onClick={() => handelAddStep(index)}
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
                        <Button color='blue' basic icon='arrow right' />
                      )}
                    </Button.Group>
                    <style jsx>{`
                      .button {
                        padding: 10px;
                      }
                    `}</style>
                  </div>
                </Form>
              </Grid.Column>
            </Grid.Row>
          );
        })}
      </Grid>
    </Segment>
  );
}
