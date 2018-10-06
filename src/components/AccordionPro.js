import React, { Component } from 'react';
import { Container, Content, Accordion } from 'native-base';
import { StyleSheet } from 'react-native';

class AccordionPro extends Component {
  render() {
    return (
      <Container>
        <Content padder >
          <Accordion
            headerStyle={styles.headerStyle}
            contentStyle={styles.contentStyle}
            dataArray={this.props.dataArray}
            expanded={this.props.index}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#43C6AC',
  },
  contentStyle: {
    color: '#191654',
  }
});

export { AccordionPro };
