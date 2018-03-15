import React, { Component } from 'react';
import axios from 'axios';
const getCategories = async () => {
  return await axios.get('/data/categories.json');
};

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.defaultId,
      list: []
    };
  }
  handleChoose = (id) => {
    this.setState({
      id
    })
    this.props.clickFunc(id);
  }
  componentDidMount() {
    let _this = this;
    getCategories().then(res => {
      _this.setState({
        list: res.data
      });
    });
  }
  render() {
    const _this = this;
    const a = this.state.list.map((item, index) => {
      return (<div className={_this.state.id === index + 1 ? 'category-item actived' : 'category-item'} key={item.name} onClick={_this.handleChoose.bind(_this, index + 1)}>
        <p>
          <i className={'iconfont icon-c' + (index + 1)}></i>
        </p>
        <p>{item.name}</p>
      </div>);
    });
    return <div className="categories container">
      <div className="row">{a}</div>
    </div>;
  }
}

export default Categories;
