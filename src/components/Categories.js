import React, { Component } from 'react';
import axios from 'axios';
const getCategories = async () => {
  return await axios.get('/data/categories.json');
};

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  componentDidMount() {
    let _this = this;
    getCategories().then(res => {
        debugger;
        _this.setState({
        list: res.data
      });
    });
  }
  render() {
    const a = this.state.list.map(item => {
      return (<div key={item.name}>
        <p>
          <i className="fonticon">{item.icon}</i>
        </p>
        <p>{item.name}</p>
      </div>);
    });
    return <div className="categories">{a}</div>;
  }
}

export default Categories;
