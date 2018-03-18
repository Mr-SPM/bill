import React, { Component } from 'react';
import DB from '../services/db';
import moment from 'moment';
import categoryMap from '../services/categoriesmap';
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: 0,
      array: [],
      time: moment().format('YYYY-MM-DD')
    };
  }
  handleChange = e => {
    this.initData(e.target.value);
  };
  initData = async time => {
    const target = time || moment().format('YYYY-MM-DD');
    const list = await DB.indexFilter('time', {
      start: target,
      end: target
    });
    let sum = 0;
    list.forEach(item => {
      if (item.value.categoryId !== 10) {
        sum += Number.parseFloat(item.value.price);
      } else {
        sum -= Number.parseFloat(item.value.price);
      }
    });
    if (list.length > 0) {
      this.setState({
        array: list,
        sum: sum.toFixed(2),
        time: target
      });
    }else {
      this.setState({
        array: [],
        sum: 0,
        time: target
      });
    }
  };
  componentDidMount() {
    this.initData();
  }
  render() {
    let content = null;
    if(this.state.array.length > 0 ) {
      content = this.state.array.map(item => {
        return (
          <div className="list-item" key={item.primaryKey}>
            <span className="title">
              <i className={"iconfont icon-c"+ item.value.categoryId}></i>
              {categoryMap[item.value.categoryId-1]}
            </span>
            <span>{item.value.use}</span>
            <span>￥{item.value.price}</span>
          </div>
        );
      })
    }else {
      content = <div>这一天你没有记录任何开支哦！</div>
    }
    return (
      <div className="flex-column inherit-all">
        <div className="top-ctn lg-top">
          <input
            type="date" className="time-inp"
            value={this.state.time}
            onChange={this.handleChange}
          />
          <span className="data-price">￥{this.state.sum}</span>
        </div>
        <div className="list-group flex-content">
        {content}
        </div>
      </div>
    );
  }
}

export default Content;
