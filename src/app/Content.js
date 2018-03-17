import React, { Component } from 'react';
// import Store from '../services/localStorage';
// import DB from '../services/db';
// // DB.AddDataBase();
// DB.openCursor().then(res => {
//   console.log(res);
// });
// DB.add({time:'2018/03/17'});
// promise 
// DB.indexFilter('time', { start: '2018/03/17', end: '2018/03/18' });
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pay: '',
      array: []
    };
  }
  render() {
    return (
      <div className=".my-Content">
        <input type="date" name="" id="" />
      </div>
    );
  }
}

export default Content;
