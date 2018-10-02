import React, { PureComponent } from 'react';
// import { BarChart, Grid, XAxis } from 'react-native-svg-charts';
import { connect } from 'react-redux';
import * as scale from 'd3-scale';
import { View } from 'react-native';
import { BarChart, XAxis, Grid } from 'react-native-svg-charts'

const { RRule } = require('rrule');

const mapStateToProps = ({ data }) => {
  return data;
};

class BarChartPro extends PureComponent {

    render() {
      // const rRulDates = this.props.task.r_rule ?
      // RRule.fromString(this.props.task.r_rule).all()
      // : [];
      //
      // const fill = 'rgb(134, 65, 244)';
      // const data = [
      //   { value: 30, label: '2018-10-01' },
      //   { value: 10, label: '2018-10-11' },
      //   { value: 20, label: '2018-10-21' },
      //   { value: 40, label: '2018-10-31' },
      //   { value: 100, label: '2018-10-22' }
      // ];
      const data = [50, 10, 40, 95]

      // const data = [30, 10, 20, 40, 100];
      return (
        <View style={{ height: 200, padding: 20 }}>
               <BarChart
                   style={{ flex: 1 }}
                   data={ data }
                   gridMin={ 0 }
                   contentInset={{ top: 10, bottom: 10 }}
                   svg={{ stroke: 'rgb(134, 65, 244)' }}
               >
                  <Grid/>
               </BarChart>
               <XAxis
                   style={{ marginHorizontal: -10 }}
                   data={ data }
                   formatLabel={ (data) => data }
                   contentInset={{ left: 10, right: 10 }}
                   svg={{ fontSize: 10, fill: 'black' }}
               />
           </View>
      );
    }
}

export default connect(mapStateToProps, null)(BarChartPro);
