import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { IconPro } from './common';

class IconsPro extends Component {
  render() {
    const icons = {
      home: { name: 'home', color: '#191654' },
      graduationcap: { name: 'graduation-cap', color: '#191654' },
      gift: { name: 'gift', color: '#191654' },
      fire: { name: 'fire', color: '#191654' },
      flask: { name: 'flask', color: '#191654' },
      eyedropper: { name: 'eyedropper', color: '#191654' },
      eye: { name: 'eye', color: '#191654' },
      rocket: { name: 'rocket', color: '#191654' },
    };
    return (
      <View>
        <ScrollView horizontal>
          {
            Object.keys(icons).map((name, index) =>
            <IconPro
              key={index}
              iconName={icons[name].name}
              iconColor={icons[name].color}
            />)
          }
        </ScrollView>
      </View>
    );
  }
}

export default connect(null, null)(IconsPro);
