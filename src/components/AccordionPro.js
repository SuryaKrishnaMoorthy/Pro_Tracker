import React, { Component } from 'react';
import { Container, Content, Accordion } from 'native-base';
import CircularProgressPro from './CircularProgressPro';
//import BarChartPro from './BarChartPro';

const dataArray = [
  { title: 'Progress', content: <CircularProgressPro style={{ width: '100%' }} /> }
  //, { title: 'Bar Chart', content: <BarChartPro /> },
];
class AccordionPro extends Component {
  render() {
    return (
      <Container>
        <Content padder >
          <Accordion
            dataArray={dataArray}
            expanded={0}
          />
        </Content>
      </Container>
    );
  }
}

export { AccordionPro };
