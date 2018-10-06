import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBadges } from '../actions';
import {  Text, View, Image,
   TouchableWithoutFeedback, ScrollView } from 'react-native';

const badgeImage = require('../assets/badges/gem1.png');

class Badge extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.info}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.infoScrollView}
              >
                <Text style={styles.infoTitle}>Badges</Text>
                <Text style={styles.infoText}>Badges description </Text>
              </ScrollView>
            </View>
        }
        <View style={styles.feature}>
          <TouchableWithoutFeedback>
            <Image style={styles.image} source={badgeImage} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({getBadges}, dispatch)
const mapStateToProps = ({badges}) => ({badges})
export default connect(mapStateToProps, mapDispatchToProps)(Badge)
