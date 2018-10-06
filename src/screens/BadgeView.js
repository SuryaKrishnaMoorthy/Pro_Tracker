import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Header } from 'react-native-elements';
import { Icon, Badge, ListItem, Body, Left, Drawer, Right } from 'native-base';

import Sidebar from './Sidebar';
import { getBadges } from '../actions';

const lock = require('../assets/badges/green-lock.png');
const bronze = require('../assets/badges/bronze.png');
const diamond = require('../assets/badges/diamond.png');
const garnet = require('../assets/badges/garnet.png');
const gold = require('../assets/badges/gold.png');
const jadeite = require('../assets/badges/jadeite.png');
const opal = require('../assets/badges/opal.png');
const ruby = require('../assets/badges/ruby.png');
const silver = require('../assets/badges/silver.json');

const badgeImages = {
  bronze: { img: bronze, value: 100 },
  silver: { img: bronze, value: 1000 },
  gold: { img: bronze, value: 5000 },
  platinum: { img: bronze, value: 11500 },
  opal: { img: bronze, value: 16500 },
  diamond: { img: bronze, value: 21500 },
  painite: { img: bronze, value: 26500 },
  ruby: { img: bronze, value: 31500 },
  jadeite: { img: bronze, value: 40000 },
  garnet: { img: bronze, value: 50000 },
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
        <View>
          <ScrollView horizontal>
            {
              this.props.badges
              ?
                Object.keys(badgeNumber).map((badge, index) => {
                  if (badgeNumber[badge] > 0) {
                    return (<View style={styles.badgeView} key={index}>
                      <Image key={index} source={badgeImages[badge].img} />
                      <Badge style={styles.badgeIcon}>
                        <ListItem icon>
                           <Left>
                              <Icon active style={styles.iconStar} name="star" />
                           </Left>
                           <Body style={{ borderBottomColor: 'transparent' }}>
                              <Text>{badgeNumber[badge]}</Text>
                           </Body>
                        </ListItem>
                       </Badge>
                   </View>);
                 }
                 return (<View style={styles.badgeView} key={index}>
                   <Image blurRadius={2} key={index} source={badgeImages[badge].img} />
                   <Badge style={styles.badgeIcon}>
                     <ListItem>
                        <Left>
                           <Image
                             key={index}
                             style={styles.lockImage}
                             source={lock}
                           />
                        </Left>
                        <Body style={{ borderBottomColor: 'transparent' }}>
                           <Text
                             style={{ color: 'black', height: 50, fontSize: 10 }}
                           > Unlock with {badgeImages[badge].value} points</Text>
                           <Text
                             style={{ color: 'black', height: 50, fontSize: 10 }}
                           />
                        </Body>
                     </ListItem>
                    </Badge>
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
  badgeView: {
    marginRight: 15
  },
  title: {
    marginTop: '20%',
    marginBottom: '10%',
    alignSelf: 'center',
    color: '#191654',
    fontWeight: 'bold'
  },
  badgeIcon: {
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    width: '100%',
  },
  iconStar: {
    color: '#FFD700'
  },
  lockImage: {

  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BadgeView);
