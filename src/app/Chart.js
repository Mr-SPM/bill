import React, { Component } from 'react';
import Store from '../services/localStorage';
import echarts from 'echarts';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleString(),
            income: '',
            detail: [],
            pay: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            time: e.target.value
        })
    }
    componentDidMount() {
        let income = 0;
        let pay = 0;
        let detail = {};
        let data = Store.fetch();
        let array = ['Eat', 'Drink', 'Trafic', 'Consume', 'Entertainment', 'Home', '3C', 'Medicine', 'Other', 'Income']
        data.forEach((item) => {
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
        let dataForShow = []
        for (let item in detail) {
            dataForShow.push({
                name: item,
                value: detail[item]
            })
        };
        var myCharts = echarts.init(document.getElementById('myCharts'));
        myCharts.setOption({
            backgroundColor: '#2c343c',
            title: {
                text: '支出',
                subtext: '￥' + pay.toFixed(2),
                left: 'center',
                top: '43%',
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
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
                    radius: ["35%", "60%"],
                    center: ['50%', '50%'],
                    data: dataForShow,
                    label: {
                        show: true,
                        // 标签的文字。
                        formatter: "{b}:{d}%"
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
            income, pay, detail: dataForShow
        });

    }
    render() {
        return (
            <div className="chart row flex-column">
                <div className="time-bar">
                    <input type="datetime" value={this.state.time} onChange={this.handleChange} />
                </div>
                <div id="myCharts"></div>
                <div className="data-ctn">
                    <div className="top-ctn">
                        <span className="data-title">损益统计</span>
                        <span className={this.state.income - this.state.pay >= 0 ? 'data-price' : 'data-price red'}>￥{this.state.income - this.state.pay}</span>
                    </div>
                    <div className="detail-ctn">
                        <ul>
                            {this.state.detail.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <span>{item.name}</span>
                                        <span className='float-r'>
                                            ￥{item.value}</span></li>
                                )
                            })}
                        </ul></div>
                </div>
            </div>
        );
    }
}

export default Chart;