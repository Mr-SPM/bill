import React, { Component } from 'react';
import Categories from '../components/Categories';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleDateString(),
      price: '',
      categoryId: 1,
      use: ''
    };
  }
  handleChange = (type, e) => {
    this.setState({
      [type]: e.target.value
    });
  };
  categoryIdChange = (id) => {
    this.setState({
      categoryId: id
    })
  }
  render() {
    return (
      <div>
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
    );
  }
}
export default Add;
