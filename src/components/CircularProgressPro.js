import React, { Component } from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = ({ data }) => {
  return data;
};

class CircularProgressPro extends Component {

  progressMessage(fillValue) {
    if (fillValue <= 20) {
      return 'Hey there, you just started!\nKeep going!!';
    } else if (fillValue > 20 && fillValue <= 49) {
      return 'You are doing great!! Keep it up!!';
    } else if (fillValue > 49 && fillValue <= 51) {
      return 'Great Job! You are half way through!';
    } else if (fillValue > 51 && fillValue <= 95) {
      return 'Great Job! Keep going!';
    } else if (fillValue > 95 && fillValue <= 99) {
      return 'You are almost there!';
    } else if (fillValue === 100) {
      return 'Congratulations!! You finished your task!';
    }
  }

  render() {
    const { current_score, total_score } = this.props.task;

    const fillValue = (current_score / total_score) * 100;

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ width: '33.3%' }}>
          <Text>
            { this.progressMessage(fillValue) }
          </Text>
        </View>
        <View>
          <AnimatedCircularProgress
            size={120}
            width={14}
            fill={fillValue || 0}
            tintColor="#00e0ff"
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
        <View style={{ width: '33.3%' }} >
          <Text>
            Current Score: { current_score }
          </Text>
          <Text>
            Total Score: { total_score }
          </Text>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, null)(CircularProgressPro);
