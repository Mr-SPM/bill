import React, { Component } from 'react';
import Categories from '../components/Categories';
// import store from '../services/localStorage';
import DB from '../services/db';

const dateFormat = date => {
  let list = date.split('/');
  if (list[1].length === 1) {
    list[1] = '0' + list[1];
  }
  if (list[2].length === 1) {
    list[2] = '0' + list[2];
  }
  return list.join('-');
};
class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      time: dateFormat(new Date().toLocaleDateString()),
      price: '0',
      categoryId: 1,
      use: '',
      primaryKey: ''
    };
    this.req = {
      categoryId: 1,
      use:''
    };
  }
  handleChange = (type, e) => {
    this.setState({
      [type]: e.target.value
    });
  };
  categoryIdChange = (id, use) => {
    // this.setState({
    //   categoryId: id,
    //   use: use
    // });
    this.req.categoryId = id;
    this.req.use = use;                         
  };
  numberClick = e => {
    let temp = this.state.input;
    let tempPrice = this.state.price;
    if (e.target.innerHTML === '←') {
      temp = temp.substring(0, temp.length - 1);
      if (temp !== '') {
        if (
          temp.charAt(temp.length - 1) !== '+' &&
          temp.charAt(temp.length - 1) !== '-'
        ) {
          tempPrice = eval(temp).toFixed(2);
        } else {
          tempPrice = eval(temp.substring(0, temp.length - 1)).toFixed(2);
        }
      } else {
        tempPrice = 0;
      }
    } else if (
      e.target.innerHTML === '+' ||
      e.target.innerHTML === '-' ||
      e.target.innerHTML === '.'
    ) {
      if (
        temp.charAt(temp.length - 1) === '+' ||
        temp.charAt(temp.length - 1) === '-' ||
        temp.charAt(temp.length - 1) === '.' ||
        temp === ''
      ) {
        return;
      } else {
        temp += e.target.innerHTML;
      }
    } else {
      temp += e.target.innerHTML;
      tempPrice = eval(temp).toFixed(2);
    }
    this.setState({
      price: tempPrice,
      input: temp
    });
  };
  resetPrice = () => {
    this.setState({
      input: '',
      price: '0'
    });
  };
  AddClick = () => {
    let req = {
      time: this.state.time || new Date().toLocaleDateString(),
      price: this.state.price,
      categoryId: this.req.categoryId,
      use: this.req.use
    };
    if (this.state.primaryKey !== '') {
      console.log(this.state.primaryKey);
      DB.put(req, this.state.primaryKey);
    } else {
      DB.add(req);
    }

    this.props.history.push('/');
  };
  componentDidMount() {
    if (this.props.location.state && this.props.location.state.primaryKey) {
      DB.get(this.props.location.state.primaryKey).then((res) => {
        this.setState({
          categoryId: res.categoryId,
          price: res.price,
          time: res.time,
          use: res.use,
          primaryKey: this.props.location.state.primaryKey
        })
        this.req.categoryId = res.categoryId;
        this.req.use = res.use;
      })
    }
  }
  render() {
    return (
      <div className="flex-column inherit-all">
        <div className="flex-content">
          <div className="add-title">
            <i className="iconfont">&#xe626;</i>
            <div className="form-inline form-control-sm">
              <input
                className="form-control"
                type="date"
                name="time"
                id="my-time"
                placeholder="今日"
                value={this.state.time}
                onChange={this.handleChange.bind(this, 'time')}
              />
            </div>
          </div>
          {/* <div className="price">
            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="iconfont">&#xe600;</i>
                </span>
              </div>
              <input
                className="form-control"
                type="number"
                value={this.state.price}
                onChange={this.handleChange.bind(this, 'price')}
              />
            </div>
          </div> */}
          <Categories
            defaultId={this.state.categoryId} defaultUse={this.state.use}
            clickFunc={this.categoryIdChange.bind(this)}
          />
        </div>
        <div className="calculator">
          <div className="price-ctn">
            <div className="processing">{this.state.input}</div>
            <div className="result">￥{this.state.price}</div>
          </div>
          <button className="facker-btn" onClick={this.numberClick}>
            7
          </button>
          <button className="facker-btn" onClick={this.numberClick}>
            8
          </button>
          <button className="facker-btn" onClick={this.numberClick}>
            9
          </button>
          <button className="facker-btn" onClick={this.numberClick}>
            ←
          </button>
          <button className="facker-btn" onClick={this.numberClick}>
            4
          </button>
          <button className="facker-btn" onClick={this.numberClick}>
            5
          </button>
          <button className="facker-btn" onClick={this.numberClick}>
            6
          </button>
          <button className="facker-btn" onClick={this.numberClick}>
            +
          </button>
          <button className="facker-btn" onClick={this.numberClick}>
            1
          </button>
          <button className="facker-btn" onClick={this.numberClick}>
            2
          </button>
          <button className="facker-btn" onClick={this.numberClick}>
            3
          </button>
          <button className="facker-btn" onClick={this.numberClick}>
            -
          </button>
          <button className="facker-btn" onClick={this.resetPrice}>
            Reset
          </button>
          <button className="facker-btn" onClick={this.numberClick}>
            0
          </button>
          <button className="facker-btn" onClick={this.numberClick}>
            .
          </button>
          <button className="facker-btn" onClick={this.AddClick}>
            √
          </button>
        </div>
      </div>
    );
  }
}
export default Add;
