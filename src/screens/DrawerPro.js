import React, { Component } from 'react';
import { Drawer } from 'native-base';
import Sidebar from '../screens/Sidebar';
import Home from './Home';

class DrawerPro extends Component {
  closeDrawer = () => {
    if (this.drawer) this.drawer._root.close();
  };

  openDrawer = () => {
    if (this.drawer) this.drawer._root.open();
  };

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<Sidebar
          openDrawer={this.openDrawer}
          closeDrawer={this.closeDrawer}
          navigator={this.props.navigation}
        />}
        onClose={() => this.closeDrawer()}
      >
      <Home
        openDrawer={this.openDrawer}
        navigation={this.props.navigation}
        dayIndex={this.props.dayIndex}
      />
      </Drawer>
    );
  }
}

export default DrawerPro;
