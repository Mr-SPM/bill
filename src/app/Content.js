import React, { Component } from 'react';
import DB from '../services/db';
import moment from 'moment';
import categoryMap from '../services/categoriesmap';
let originPageX = 0;
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: 0,
      array: [],
      time: moment().format('YYYY-MM-DD'),
      choose: null
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
    } else {
      this.setState({
        array: [],
        sum: 0,
        time: target
      });
    }
  };
  handleMoveStart = (e) => {
    originPageX = e.targetTouches[0].pageX;
  }
  handleMove = (id, e) => {
    if (e.targetTouches[0].pageX - originPageX > 20) {
      document.getElementById(`list-item${id}`).style.display = "inline-block";
      document.getElementById(`list-item${id}`).style.width = '40px';
    } else {
      document.getElementById(`list-item${id}`).style.display = 'none';
      document.getElementById(`list-item${id}`).style.width = '0px';
    }
  }
  handleChoose = (index, e) => {
    this.setState({
      choose: this.state.array[index]
    });
  }
  deleteItem = async (primaryKey) => {
    const rs =DB.delete(primaryKey);
    console.log(rs);
    this.initData();
  }
  componentDidMount() {
    this.initData();
  }
  render() {
    let content = null;

    if (this.state.array.length > 0) {
      const _this = this;
      content = this.state.array.map((item, index) => {
        let button = null;
        if (_this.state.choose && _this.state.choose.primaryKey === item.primaryKey) {
          button =
            <div>
              <i className="iconfont icon-edit"></i>
            <i className="iconfont icon-delete" onClick={this.deleteItem.bind(this,item.primaryKey)}></i>
            </div>
        } else {
          button = <i className="iconfont icon-more"></i>
        }
        return (
          <div className="list-item" key={item.primaryKey} onTouchStart={this.handleMoveStart} onTouchMove={this.handleMove.bind(this, index)} onClick={this.handleChoose.bind(this, index)}>
            <div className={_this.state.choose && item.primaryKey === _this.state.choose.primaryKey ? 'actived clearfix':'normal clearfix'} id={'list-item' + item.primaryKey} >
              {button}
            </div>
            <span className="title">
              <i className={"iconfont icon-c" + item.value.categoryId}></i>
              {categoryMap[item.value.categoryId - 1]}
            </span>
            <span>{item.value.use}</span>
            <span>￥{item.value.price}</span>
          </div>
        );
      })
    } else {
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
