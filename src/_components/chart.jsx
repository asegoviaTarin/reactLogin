import React, { Component } from 'react'

const Highcharts = require('highcharts');
const ReactHighcharts = require('react-highcharts');

class MyChart extends React.Component {
  constructor(props){
    super(props);
    this.data = [];
    this.config = {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: 'Browser market shares in January, 2018'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: false
              },
              showInLegend: true
          }
      },
      series: [{
          name: 'Brands',
          colorByPoint: true,
          data: this.props.data,
      }]
  }
  }
  // componentDidMount() {
  //   let chart = this.refs.chart.getChart();
  //   chart.series[0].addPoint({x: 10, y: 12});
  // }

  render() {
    return <ReactHighcharts config={this.config} ref="pie"></ReactHighcharts>;
  }
}
export default MyChart;