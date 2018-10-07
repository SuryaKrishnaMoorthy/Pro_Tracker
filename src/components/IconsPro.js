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

        {
          Object.keys(icons).map((name, index) =>
          <IconPro
            key={index}
            iconName={icons[name].name}
            iconColor={icons[name].color}
          />)
        }

        
        <View style={styles.icons}>
          <Icon
            name='home'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('home')}
          />
          <Icon
            name='graduation-cap'
            type='font-awesome'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('graduation-cap', 'font-awesome')}
          />
          <Icon
            name='gift'
            type='font-awesome'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('gift', 'font-awesome')}
          />
          <Icon
            name='fire'
            type='font-awesome'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('fire', 'font-awesome')}
          />
          <Icon
            name='flask'
            type='font-awesome'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('flask', 'font-awesome')}
          />
        </View>
        <View style={styles.icons}>
          <Icon
            name='build'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('build')}
          />
          <Icon
            name='favorite'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('favorite')}
          />
          <Icon
            name='flight'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('flight')}
          />
          <Icon
            name='cake'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('cake')}
          />
          <Icon
            name='mail'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('mail')}
          />
        </View>
        <View style={styles.icons}>
          <Icon
            name='home'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('home')}
          />
          <Icon
            name='graduation-cap'
            type='font-awesome'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('graduation-cap', 'font-awesome')}
          />
          <Icon
            name='gift'
            type='font-awesome'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('gift', 'font-awesome')}
          />
          <Icon
            name='fire'
            type='font-awesome'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('fire', 'font-awesome')}
          />
          <Icon
            name='flask'
            type='font-awesome'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('flask', 'font-awesome')}
          />
        </View>
        <View style={styles.icons}>
          <Icon
            name='build'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('build')}
          />
          <Icon
            name='favorite'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('favorite')}
          />
          <Icon
            name='flight'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('flight')}
          />
          <Icon
            name='cake'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('cake')}
          />
          <Icon
            name='pool'
            color={this.state.icon_color}
            onPress={() => this.selectIcon('pool')}
          />
        </View>
      </View>
    );
  }
}

export default connect(null, null)(IconsPro);
