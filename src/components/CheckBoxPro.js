import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

class CheckBoxPro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxes: [{
        id: 1,
        title: 'Sun',
        checked: false
      },
      {
        id: 2,
        title: 'Mon',
        checked: false
      },
      {
        id: 3,
        title: 'Tue',
        checked: false
      },
      {
        id: 4,
        title: 'Wed',
        checked: false
      },
      {
        id: 5,
        title: 'Thu',
        checked: false
      },
      {
        id: 6,
        title: 'Fri',
        checked: false
      },
      {
        id: 7,
        title: 'Sat',
        checked: false
      }
    ]
    };
  }

  toggleCheckbox(id) {
    const changedCheckbox = this.state.checkboxes.find((cb) => cb.id === id);
    changedCheckbox.checked = !changedCheckbox.checkbox;
    const checkboxes = Object.assign({}, this.state.checkboxes, changedCheckbox);
    this.setState({ checkboxes });
  }

  render() {
    return (
      this.state.checkboxes.map((cb) =>
        <View key={cb.id.toString()} style={styles.container}>
          <CheckBox
            key={cb.id.toString()}
            title={cb.title}
            checked={cb.checked}
            onPress={() => this.toggleCheckbox(cb.id)}
            size={15}
            textStyle={{ fontSize: 10 }}
          />
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
  }
});

export { CheckBoxPro };
