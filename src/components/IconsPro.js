import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { iconsList, iconColorsList } from '../helpers';

class IconsPro extends Component {
  render() {
    return (
      <View>
        <View style={styles.icons}>
        {
          iconColorsList.map((color, index) =>
            <TouchableOpacity key={index} onPress={() => this.props.selectColor(color)}>
              <View
                style={[styles.circle, { backgroundColor: `${color}` }]}
              />
            </TouchableOpacity>
          )
        }
        </View>
        {
          Object.keys(iconsList).map((iconKey, index) =>
            <View key={index} style={styles.icons}>
            {
              iconsList[iconKey].map((icon, iconIndex) =>
                <Icon
                  key={iconIndex}
                  name={icon.name}
                  color={this.props.icon_color ? this.props.icon_color : icon.color}
                  type={icon.type}
                  onPress={() => this.props.selectIcon(icon.name, icon.type)}
                />
              )
            }
            </View>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 12
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderColor: '#000000',
    borderWidth: 1
  }
});

export { IconsPro };
