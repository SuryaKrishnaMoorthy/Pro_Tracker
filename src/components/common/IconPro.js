import React, { Component } from 'react';
import { Icon } from 'react-native-elements';

class IconPro extends Component {
   render() {
     return (
       <Icon
         type='font-awesome'
         name={`${this.props.iconName}`}
         borderRadius={2}
         size={30}
         color={`${this.props.iconColor}`}
       />
     );
   }
}

export { IconPro };
