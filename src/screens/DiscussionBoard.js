import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getUser } from '../actions';
import Fire from '../Fire';

// type Props = {
//   name?: string,
// };

const mapStateToProps = ({ auth }) => {
  const { first_name, last_name } = auth;
  return { first_name, last_name };
};

const mapDispatchToProps = dispatch => bindActionCreators({ getUser }, dispatch);

class DiscussionBoard extends Component {

  static navigationOptions = () => ({
    title: 'DiscussionBoard!',
  });

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }

  //When the component leaves the screen unsubscribe from the database.
  componentWillUnmount() {
    Fire.shared.off();
  }

  get user() {
    return {
      name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
    };
  }

  render() {
    const user = `${this.props.first_name} ${this.props.last_name}`;
    console.log(user);
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={{ user }}
      />
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionBoard);
