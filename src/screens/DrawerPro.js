import React, { Component } from 'react';
import { Drawer } from 'native-base';
import SideBar from '../screens/SideBar';
import Home from './Home';

class DrawerPro extends Component {

  closeDrawer = () => {
    this._drawer._root.close()
  };

  openDrawer = () => {
    this._drawer._root.open()
  };

  render() {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<SideBar navigator={this._navigator} />}
        onClose={() => this.closeDrawer()}
      >
      <Home
        openDrawer={this.openDrawer}
        navigation={this.props.navigation}
      />
      </Drawer>
    );
  }
}

export default DrawerPro;
