import React, { Component } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllTasks } from '../actions';

const mapStateToProps = ({ tasks }) => {
  return tasks;
};

const mapDispatchToProps = dispatch => bindActionCreators({ getAllTasks }, dispatch);

const extractKey = ({ id }) => id.toString();

class ListItem extends Component {

  componentDidMount() {
    this.props.getAllTasks();
  }

  renderItem = ({ item }) => {
    return (
      <Text
        key={item.id}
        style={styles.row}
        onPress={() => this.props.navigation('TaskView')}
      >
        {item.task_name}
      </Text>
    );
  };

  render() {
    return (
      <FlatList
      style={styles.container}
      data={this.props.tasks}
      renderItem={this.renderItem}
      keyExtractor={extractKey}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'red',
    // width: '100%',
    // height: '100%'
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
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
