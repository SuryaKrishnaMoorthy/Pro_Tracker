import React, { Component } from 'react';
import { FlatList, Text, StyleSheet, TouchableHighlight, Alert, View } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';

import { Separator } from './common';
import { getCurrentDayTasks, deleteOneTask, createOneStatus } from '../actions';


const mapStateToProps = ({ data }) => {
  return data;
};

const mapDispatchToProps = dispatch => bindActionCreators({
   getCurrentDayTasks,
   deleteOneTask,
   createOneStatus
 }, dispatch);

const extractKey = ({ id }) => id.toString();

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRow: null
    };
  }

  onSwipeOpen(rowId, direction) {
    if (typeof direction !== 'undefined') {
      this.setState({ activeRow: rowId });
    }
  }

  onSwipeClose(rowId, direction) {
    if (rowId === this.state.activeRow && typeof direction !== 'undefined') {
      this.setState({ activeRow: null });
    }
  }

  handleDelete(item) {
    Alert.alert(
      'Are you sure to delete?',
      `${item.task_name} will be deleted permanently`,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Delete', onPress: () => this.props.deleteOneTask(item.id), style: 'destructive' },
      ],
      { cancelable: false }
    );
  }

  handleComplete(item) {
    const { id } = item;
    const taskDate = moment(new Date()).format('YYYY-MM-DD');
    const status = 'complete';
    this.props.createOneStatus({ task_id: id, task_date: taskDate, status });
  }

  handleEdit(item) {
    return this.props.navigation('EditTaskForm', { task: item });
  }

  renderItem = ({ item, index }) => {
    const swipeBtns = [
      {
        text: 'Edit',
        backgroundColor: 'rgb(91, 173, 223)',
        onPress: () => this.handleEdit(item)
      },
      {
        text: 'Delete',
        backgroundColor: 'rgb(233, 77, 61)',
        onPress: () => this.handleDelete(item)
      }
    ];
    const swipeBtnLeft = [
      {
        text: 'Complete',
        backgroundColor: 'rgb(138, 197, 147)',
        onPress: () => this.handleComplete(item)
      }
    ];

    return (
      <Swipeout
        left={swipeBtnLeft}
        right={swipeBtns}
        rowID={index}
        autoClose
        sectionId={1}
        backgroundColor='transparent'
        sensitivity={10}
        onOpen={(secId, rowId, direction) => this.onSwipeOpen(rowId, direction)}
        onClose={(secId, rowId, direction) => this.onSwipeClose(rowId, direction)}
      >
      <TouchableHighlight
        onPress={() => this.props.navigation('TaskView', { id: item.id })}
      >
        <View style={styles.container}>
          {
            item.icon_name
            ?
            <Icon
              containerStyle={styles.iconContainerStyle}
              name={item.icon_name}
              type={item.icon_type ? item.icon_type : ''}
              color={item.icon_color ? item.icon_color : '#000000'}
              onPress={() => this.props.navigation('TaskView', {
                id: item.id
              })}
            />
            : ''
          }
          <Text
            key={item.id}
            style={styles.row}
          >
            {item.task_name}
          </Text>
          {
            item.taskStatus && item.taskStatus.findIndex(status =>
              status.task_date.includes(moment()
              .add(this.props.dayIndex, 'day').format('YYYY-MM-DD'))) > -1
            ?
              <View style={{ marginLeft: 'auto' }}>
                <Icon
                  containerStyle={styles.iconContainerStyle}
                  name={'done'}
                  type={'material-icons'}
                  color={'#006400'}
                  size={35}
                  onPress={() => this.props.navigation('TaskView', {
                    id: item.id
                  })}
                />
              </View>
            : ''
          }
        </View>
      </TouchableHighlight>
      <Separator />
    </Swipeout>
    );
  };

  render() {
    return (
      <View>
        <NavigationEvents
          onWillFocus={() => {
            this.props.getCurrentDayTasks(moment().add(this.props.dayIndex, 'day'));
          }}
        />
        <FlatList
        data={this.props.tasks}
        renderItem={this.renderItem}
        keyExtractor={extractKey}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#93CEC8',
    width: '100%'
  },
  iconContainerStyle: {
    marginLeft: '3%'
  },
  row: {
    padding: 15,
    backgroundColor: '#93CEC8',
    color: '#191654',
    fontSize: 15,
    fontWeight: '500'
  },
  header: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'steelblue',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
