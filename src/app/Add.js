import React, { Component } from 'react';
import Categories from '../components/Categories';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      time: new Date().toLocaleDateString(),
      price: '0',
      categoryId: 1,
      use: ''
    };
  }
  handleChange = (type, e) => {
    this.setState({
      [type]: e.target.value
    });
  };
  categoryIdChange = (id,
    use) => {
    this.setState({
      categoryId: id,
      use: use
    })
  }
  numberClick = (e) => {
    let temp = this.state.input;
    let tempPrice = this.state.price;
    if (e.target.innerHTML === '←') {

      if ((temp.charAt(temp.length - 1) !== '+' || temp.charAt(temp.length - 1) !== '-')) {
        temp = temp.substring(0, temp.length - 1);
      } else {
        temp = temp.substring(0, temp.length - 1);
        tempPrice = eval(temp).toFixed(2);
      }
    } else if (e.target.innerHTML === '+' || e.target.innerHTML === '-' || e.target.innerHTML === '.') {
      if ((temp.charAt(temp.length - 1) === '+' || temp.charAt(temp.length - 1) === '-' || temp.charAt(temp.length - 1) === '.')) {
        return
      } else {
        temp += e.target.innerHTML;
      }
    }
    else {
      temp += e.target.innerHTML;
      tempPrice = eval(temp).toFixed(2);;
    }
    this.setState({
      price: tempPrice,
      input: temp
    });
  };
  render() {
    return (
      <div className="height100">
        <div className="top-ctn">
          <div className="add-title">
            <i className="iconfont">&#xe626;</i>
            <div className="form-inline form-control-sm">
              <input
                className="form-control"
                type="datetime"
                name="time"
                id="time1"
                value={this.state.time}
                onChange={this.handleChange.bind(this, 'time')}
              />
            </div>
          </div>
          <div className="price">
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
          </div>
          <Categories defaultId={this.state.categoryId} clickFunc={this.categoryIdChange.bind(this)} />
        </div>
        <div className="calculator">
          <div className="price-ctn">
            <div className="processing">{this.state.input}</div>
            <div className="result">￥{this.state.price}</div>
          </div>
          <button className="facker-btn" onClick={this.numberClick}>7</button>
          <button className="facker-btn" onClick={this.numberClick}>8</button>
          <button className="facker-btn" onClick={this.numberClick}>9</button>
          <button className="facker-btn" onClick={this.numberClick}>←</button>
          <button className="facker-btn" onClick={this.numberClick}>4</button>
          <button className="facker-btn" onClick={this.numberClick}>5</button>
          <button className="facker-btn" onClick={this.numberClick}>6</button>
          <button className="facker-btn" onClick={this.numberClick}>+</button>
          <button className="facker-btn" onClick={this.numberClick}>1</button>
          <button className="facker-btn" onClick={this.numberClick}>2</button>
          <button className="facker-btn" onClick={this.numberClick}>3</button>
          <button className="facker-btn" onClick={this.numberClick}>-</button>
          <button className="facker-btn" onClick={this.numberClick}>Reset</button>
          <button className="facker-btn" onClick={this.numberClick}>0</button>
          <button className="facker-btn" onClick={this.numberClick}>.</button>
          <button className="facker-btn" onClick={this.numberClick}>√</button>
        </div>
      </div>
    );
  }
}
export default Add;
