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
      list: [],
      useList: [],
      use: ''
    };
  }
  handleChoose = (id) => {

    this.setState({
      id: id,
      useList: this.state.list[id - 1].children,
      use: this.state.list[id - 1].children[0]
    });
    this.props.clickFunc(id, this.state.list[id - 1].children[0]);
  }
  handleInp = (e) => {
    this.setState({
      use: e.target.value
    });
    this.props.clickFunc(this.state.id, e.target.value);
  }
  useChoose = e => {
    this.setState({
      use: e.target.innerHTML
    });
    this.props.clickFunc(this.state.id, e.target.innerHTML);
  }
  componentDidMount() {
    let _this = this;
    getCategories().then(res => {
      _this.setState({
        list: res.data,
        useList: res.data[0].children,
        use: res.data[0].children[0]
      });
    });
  }
  render() {
    const _this = this;
    const categoryList = this.state.list.map((item, index) => {
      return (<div className={_this.state.id === index + 1 ? 'category-item actived' : 'category-item'} key={item.name} onClick={_this.handleChoose.bind(_this, index + 1)}>
        <p>
          <i className={'iconfont icon-c' + (index + 1)}></i>
        </p>
        <p>{item.name}</p>
      </div>);
    });
    const useList = this.state.useList.map((item, index) => {
      return (
        <span key={index} className="use-item" onClick={this.useChoose}>{item}</span>
      );
    });
    return <div className="categories container-fluid">
      <div className="row">{categoryList}</div>
      <div className="use-ctn">
        <input type="text" className="text-use" placeholder="用途：点击以编辑" value={this.state.use} onChange={this.handleInp.bind(this)} />
        <div className="use-list">
          {useList}
        </div>
      </div>

    </div>;
  }
}

export default Categories;
