import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

class CheckBoxPro extends Component {
  constructor(props) {
    super(props);
    const checkedDays = this.props.selectedDays ? this.props.selectedDays.split(',') : [];

    this.state = {
      checkboxes: {
        ALL: {
          title: 'All days',
          checked: checkedDays.length === 7
        },
        SU: {
          title: 'Sun',
          checked: checkedDays.includes('SU')
        },
        MO: {
          title: 'Mon',
          checked: checkedDays.includes('MO')
        },
        TU: {
          title: 'Tue',
          checked: checkedDays.includes('TU')
        },
        WE: {
          title: 'Wed',
          checked: checkedDays.includes('WE')
        },
        TH: {
          title: 'Thu',
          checked: checkedDays.includes('TH')
        },
        FR: {
          title: 'Fri',
          checked: checkedDays.includes('FR')
        },
        SA: {
          title: 'Sat',
          checked: checkedDays.includes('SA')
        }
      },
      byDay: this.props.selectedDays || ''
    };
  }

  setAllDay(checkedState) {
    const checkboxes = this.state.checkboxes;
    Object.keys(checkboxes).forEach((id) => {
      checkboxes[id].checked = checkedState;
    });
    const byDay = checkedState ? 'SU,MO,TU,WE,TH,FR,SA' : '';
    this.setState({ checkboxes, byDay });
    return byDay;
  }

  toggleCheckbox(id) {
    const changedCheckbox = this.state.checkboxes[id];
    changedCheckbox.checked = !changedCheckbox.checked;
    const checkboxes = { ...this.state.checkboxes, [id]: changedCheckbox };
    let byDay = '';
    Object.keys(checkboxes).forEach((checkboxId) => {
      if (checkboxes[checkboxId].checked) {
        byDay = `${byDay},${checkboxId}`;
      }
    });
    byDay = byDay.substring(1);
    this.setState({ checkboxes, byDay });
    return byDay;
  }

  render() {
    return (
      Object.keys(this.state.checkboxes).map((id) =>
        <View key={id.toString()} style={styles.container}>
          <CheckBox
            key={id.toString()}
            title={this.state.checkboxes[id].title}
            checked={this.state.checkboxes[id].checked}
            onPress={() => {
              let byDay = this.state.byDay;
              if (id === 'ALL') {
                byDay = this.setAllDay(!this.state.checkboxes[id].checked);
              } else {
                byDay = this.toggleCheckbox(id);
              }
              this.props.updateByDay(byDay);
             }}
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
