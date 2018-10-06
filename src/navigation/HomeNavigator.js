import React from 'react';
import { Image } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'native-base';
import DrawerPro from '../screens/DrawerPro';

const sunday = require('../assets/s.png');
const monday = require('../assets/m.png');
const tuesday = require('../assets/t.png');
const wednesday = require('../assets/w.png');
const thursday = require('../assets/t.png');
const friday = require('../assets/f.png');
const saturday = require('../assets/s.png');

const days = ['  Sun', '  Mon', '  Tue', '  Wed', '  Thu', '  Fri', '  Sat'];

const presentDayIndex = new Date().getDay();
days[presentDayIndex] = 'Today';
let initialTab = 'Today';

if (days[0] === 'Today') {
  initialTab = 'Sun';
} else if (days[1] === 'Today') {
  initialTab = 'Mon';
} else if (days[2] === 'Today') {
  initialTab = 'Tue';
} else if (days[3] === 'Today') {
  initialTab = 'Wed';
} else if (days[4] === 'Today') {
  initialTab = 'Thu';
} else if (days[5] === 'Today') {
  initialTab = 'Fri';
} else {
  initialTab = 'Sat';
}

export default createMaterialBottomTabNavigator({
  Sun: {
    screen: (props) =>
    <DrawerPro
      navigation={props.navigation}
      dayIndex={(0 - presentDayIndex)}
    />,
    navigationOptions: {
      tabBarLabel: days[0],
      tabBarIcon: <Icon><Image source={sunday} /></Icon>,
      tabBarColor: '#17BCAE'
    }
  },
  Mon: {
    screen: (props) =>
    <DrawerPro
      navigation={props.navigation}
      dayIndex={(1 - presentDayIndex)}
    />,
    navigationOptions: {
      tabBarLabel: days[1],
      tabBarIcon: <Icon><Image source={monday} /></Icon>,
      tabBarColor: '#17BCAE'
    }
  },
  Tue: {
    screen: (props) =>
    <DrawerPro
      navigation={props.navigation}
      dayIndex={(2 - presentDayIndex)}
    />,
    navigationOptions: {
      tabBarLabel: days[2],
      tabBarIcon: <Icon><Image source={tuesday} /></Icon>,
      tabBarColor: '#17BCAE'
    }
  },
  Wed: {
    screen: (props) =>
    <DrawerPro
      navigation={props.navigation}
      dayIndex={(3 - presentDayIndex)}
    />,
    navigationOptions: {
      tabBarLabel: days[3],
      tabBarIcon: <Icon><Image source={wednesday} /></Icon>,
      tabBarColor: '#17BCAE'
    }
  },
  Thu: {
    screen: (props) =>
    <DrawerPro
      navigation={props.navigation}
      dayIndex={(4 - presentDayIndex)}
    />,
    navigationOptions: {
      tabBarLabel: days[4],
      tabBarIcon: <Icon><Image source={thursday} /></Icon>,
      tabBarColor: '#17BCAE'
    }
  },
  Fri: {
    screen: (props) =>
    <DrawerPro
      navigation={props.navigation}
      dayIndex={(5 - presentDayIndex)}
    />,
    navigationOptions: {
      tabBarLabel: days[5],
      tabBarIcon: <Icon><Image source={friday} /></Icon>,
      tabBarColor: '#17BCAE'
    }
  },
  Sat: {
    screen: (props) =>
    <DrawerPro
      navigation={props.navigation}
      dayIndex={(6 - presentDayIndex)}
    />,
    navigationOptions: {
      tabBarLabel: days[6],
      tabBarIcon: <Icon><Image source={saturday} /></Icon>,
      tabBarColor: '#17BCAE'
    }
  }
}, {
  initialRouteName: initialTab,
  activeColor: '#80ff00',
  inactiveColor: '#ffffff',
  barStyle: {
    backgroundColor: '#17BCAE'
  }
});
