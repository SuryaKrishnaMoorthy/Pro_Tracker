import React, { Component } from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = ({ data }) => {
  return data;
};

class CircularProgressPro extends Component {

  progressMessage(fillValue) {
    if (fillValue <= 20) {
      return 'Hey there, you just started!\nKeep going!!';
    } else if (fillValue > 20 && fillValue <= 49) {
      return 'You are doing great!! \nKeep it up!!';
    } else if (fillValue > 49 && fillValue <= 51) {
      return 'Great Job! \nYou are half way through!';
    } else if (fillValue > 51 && fillValue <= 95) {
      return 'Great Job! \nKeep going!';
    } else if (fillValue > 95 && fillValue <= 99) {
      return 'You are almost there!';
    } else if (fillValue === 100) {
      return 'Congratulations!! \nYou finished your task!';
    }
  }

  render() {
    const { current_score, total_score } = this.props.task;

    const fillValue = (current_score / total_score) * 100;

    return (
      <View>
        <View style={styles.progressTextAndCircle}>
          <View style={styles.progressTextView}>
            <Text style={styles.scoreText}>
              { this.progressMessage(fillValue) }
            </Text>
          </View>
          <View style={styles.animatedCircle}>
            <AnimatedCircularProgress
              size={120}
              width={14}
              fill={fillValue || 0}
              tintColor="#43C6AC"
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#3d5875"
              duration={1000}
              rotation={0}
              lineCap="round"
            >
              {
                (fill) => (
                  <Text>
                     { parseFloat(fill).toFixed(2) % 1 === 0 ?
                        parseFloat(fill).toFixed(0) :
                        parseFloat(fill).toFixed(2)
                      }%
                  </Text>
                )
              }
            </AnimatedCircularProgress>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }} >
          <Text style={styles.scoreText}>
            Current Score: { current_score }
          </Text>
          <Text style={styles.scoreText}>
            Total Score: { total_score }
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  progressTextAndCircle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  scoreText: {
    color: '#191654',
    fontWeight: 'bold',
    marginLeft: '5%'
  },
  progressTextView: {
    marginTop: '20%',
    marginLeft: '3%',
  },
  animatedCircle: {
    marginTop: '8%',
    marginRight: '30%',
  }
});

export default connect(mapStateToProps, null)(CircularProgressPro);
