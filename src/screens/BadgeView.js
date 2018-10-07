import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Header } from 'react-native-elements';
import { Icon, Badge, ListItem, Body, Left, Drawer, Center, Right } from 'native-base';

import Sidebar from './Sidebar';
import { getBadges } from '../actions';

const lock = require('../assets/badges/locksilver.png');
const bronze = require('../assets/badges/bronze.png');
const diamond = require('../assets/badges/diamond1.png');
const platinum = require('../assets/badges/platinum.png');
const garnet = require('../assets/badges/garnet.png');
const gold = require('../assets/badges/gold.png');
const jadeite = require('../assets/badges/jadeite.png');
const opal = require('../assets/badges/opal.png');
const ruby = require('../assets/badges/rubys.png');
const painite = require('../assets/badges/painite.png');
const silver = require('../assets/badges/silver.png');

const badgeImages = {
  bronze: { img: bronze, value: 100 },
  silver: { img: silver, value: 1000 },
  gold: { img: gold, value: 5000 },
  platinum: { img: platinum, value: 11500 },
  opal: { img: opal, value: 16500 },
  diamond: { img: diamond, value: 21500 },
  painite: { img: painite, value: 26500 },
  ruby: { img: ruby, value: 31500 },
  jadeite: { img: jadeite, value: 40000 },
  garnet: { img: garnet, value: 50000 },
};

const mapDispatchToProps = dispatch => bindActionCreators({ getBadges }, dispatch);
const mapStateToProps = ({ badges }) => badges;

class BadgeView extends Component {
  closeDrawer = () => {
    if (this.drawer) this.drawer._root.close();
  };

  openDrawer = () => {
    if (this.drawer) this.drawer._root.open();
  };

  render() {
    const { id, user_id, created_at, updated_at, score, ...badgeNumber } = this.props.badges;
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
      <ScrollView>
        <Header
          backgroundColor='#43C6AC'
          leftComponent={{
            icon: 'menu',
            color: '#191654',
            onPress: () => this.openDrawer()
          }}
          centerComponent={{ text: 'My Badges', style: { color: '#191654' } }}
          rightComponent={{
            icon: 'home',
            color: '#191654',
            onPress: () => this.props.navigation.navigate('HomeNavigator')
           }}
        />
        <View>
          <Text style={styles.title}>Badges Earned</Text>
        </View>
        <View style={{ backgroundColor: '#191654', height: '100%' }}>
          <ScrollView
            horizontal
            contentContainerStyle={styles.contentContainer}
          >
            {
              this.props.badges
              ?
                Object.keys(badgeNumber).map((badge, index) => {
                  if (badgeNumber[badge] > 0) {
                    return (
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'center',
                          marginTop: 10,
                          marginLeft: 40,
                          marginRight: 20
                        }}
                        key={index}
                      >
                        <View>
                          <Image
                            key={index}
                            source={badgeImages[badge].img}
                          />
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                          <View>
                            <Text
                              style={styles.badgeNumber}
                            >{badgeNumber[badge]}</Text>
                          </View>
                          <View>
                            <Icon active style={styles.iconStar} name="star" />
                          </View>
                        </View>
                      </View>);
                }
                return (
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginTop: 10,
                      marginLeft: 20,
                      marginRight: 40
                    }}
                    key={index}
                  >
                    <View>
                      <Image key={index} source={badgeImages[badge].img} />
                    </View>
                    <View>
                      <Image
                       key={index}
                       source={lock}
                      />
                    </View>
                    <View style={{ width: 100, alignItems: 'center' }}>
                      <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                        Unlock with {badgeImages[badge].value} points</Text>
                    </View>
                   </View>);
               })
              : ''
            }
          </ScrollView>
        </View>
      </ScrollView>
    </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#191654',
    height: '100%'
  },
  title: {
    marginTop: '90%',
    marginBottom: '10%',
    alignSelf: 'center',
    color: '#191654',
    fontWeight: 'bold'
  },
  iconStar: {
    color: '#FFD700'
  },
  badgeNumber: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 3
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BadgeView);
