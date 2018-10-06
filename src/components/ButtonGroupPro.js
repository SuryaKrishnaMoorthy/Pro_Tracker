import React, { Component } from 'react';
import { ButtonGroup } from 'react-native-elements';
import { StyleSheet } from 'react-native';

class ButtonGroupPro extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
    this.props.onButtonValueChange(this.props.buttonValues[selectedIndex]);
  }

  render() {
    const { selectedIndex } = this.state;

    return (
      <ButtonGroup
        selectedButtonStyle={styles.selectedButtonStyle}
        textStyle={styles.textStyle}
        selectedTextStyle={styles.textStyle}
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={this.props.buttonValues}
      />
    );
  }
}

const styles = StyleSheet.create({
  selectedButtonStyle: {
    backgroundColor: '#43C6AC',
  },
  textStyle: {
    color: '#191654',
  }
});

export { ButtonGroupPro };
