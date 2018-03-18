import React, { Component } from 'react';
// import Store from '../services/localStorage';
import echarts from 'echarts';
import DB from '../services/db';
import moment from 'moment';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format('YYYY-MM'),
      income: '',
      detail: [],
      pay: ''
    };
  }
  handleChange = e => {
    // this.setState({
    //   time: e.target.value
    // });
    this.initStaticChart(e.target.value);
  };
  initStaticChart = async time => {
    let income = 0;
    let pay = 0;
    let detail = {};
    let range = {
      start: moment(time || moment().format('YYYY-MM'))
        .startOf('month')
        .format('YYYY-MM-DD'),
      end: moment(time || moment().format('YYYY-MM'))
        .endOf('month')
        .format('YYYY-MM-DD')
    };
    let data = await DB.indexFilter('time', range);
    let array = [
      'Eat',
      'Drink',
      'Trafic',
      'Consume',
      'Entertainment',
      'Home',
      '3C',
      'Medicine',
      'Other',
      'Income'
    ];
    data.forEach(item => {
      item = item.value;
      if (detail[array[item.categoryId - 1]] === undefined) {
        detail[array[item.categoryId - 1]] = 0;
      }
      detail[array[item.categoryId - 1]] += Number.parseFloat(item.price);
      if (item.categoryId !== 10) {
        pay += Number.parseFloat(item.price);
      } else {
        income += Number.parseFloat(item.price);
      }
    });
    let dataForShow = [];
    let dataForShow2 = [];
    for (let item in detail) {
      if (item !== 'Income') {
        dataForShow.push({
          name: item,
          value: detail[item]
        });
      }
      dataForShow2.push({
        name: item,
        value: detail[item]
      });
    }
    var myCharts = echarts.init(document.getElementById('myCharts'));
    myCharts.setOption({
      backgroundColor: '#f8f9fa',
      title: {
        text: '支出',
        subtext: '￥' + pay.toFixed(2),
        left: 'center',
        top: '43%'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      // legend: {
      //     type: 'scroll',
      //     orient: 'vertical',
      //     right: 10,
      //     top: 20,
      //     bottom: 20,
      //     data: array,
      //     selected: detail
      // },
      series: [
        {
          name: '类别',
          type: 'pie',
          radius: ['30%', '45%'],
          center: ['50%', '50%'],
          data: dataForShow,
          label: {
            show: true,
            // 标签的文字。
            formatter: '{b}:{d}%'
          },

          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });
    this.setState({
      income,
      pay,
      detail: dataForShow2,
      time: time || moment().format('YYYY-MM')
    });
  };
  changeTime = months => {
    this.handleChange({
      target: {
        value: moment(this.state.time)
          .add(months, 'month')
          .format('YYYY-MM')
      }
    });
  };
  componentDidMount() {
    this.initStaticChart();
  }
  render() {
    return (
      <div className="chart flex-column">
        <div className="time-bar">
          <a>
            <i
              className="iconfont icon-arrow-left"
              onClick={this.changeTime.bind(this, -1)}
            />
          </a>
          <input
            type="month"
            value={this.state.time}
            onChange={this.handleChange}
          />
          <a>
            <i
              className="iconfont icon-arrow-right"
              onClick={this.changeTime.bind(this, 1)}
            />
          </a>
        </div>
        <div id="myCharts" />
        <div className="data-ctn">
          <div className="top-ctn">
            <span className="data-title">损益统计</span>
            <span
              className={
                this.state.income - this.state.pay >= 0
                  ? 'data-price'
                  : 'data-price red'
              }
            >
              ￥{(this.state.income - this.state.pay).toFixed(2)}
            </span>
          </div>
          <div className="detail-ctn">
            <ul>
              {this.state.detail.map((item, index) => {
                return (
                  <li key={index}>
                    <span className="bold">{item.name}</span>
                    <span className="float-r">￥{item.value.toFixed(2)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Chart;
