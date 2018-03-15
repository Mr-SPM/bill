import React, { Component } from 'react';

class Caculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }
    numberClick = (e) => {
        this.setState({
            value: this.state.value + e.target.innerHTML
        });
    }
    render() {
        return (
            <div className="calculator">
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
        )
    }
}