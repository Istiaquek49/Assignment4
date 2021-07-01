import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom'

class Credits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: "",
            amount: 0
        }
    };
handleItemChange = (event) => {
        this.setState({
            item: event.target.value
        })
    };
handleAmountChange = (event) => {
        this.setState({
            amount: event.target.value
        })
    };
handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleAddCredit(this.state.item, this.state.amount);
    };
render() {
    return (
        <div>
            <Link to="/home">Home</Link>
            <h1>Credits:</h1>
            <div>
                <h2>Account Balance: ${this.props.accountBalance}</h2>
                <h2>Total Credits: ${this.props.creditsTotal}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="Credit">Item: </label>
                        <input type="text" onChange={this.handleItemChange}/>
                    </div>
                    <div>
                        <label htmlFor="Amount">Amount: </label>
                        <input type="text" onChange={this.handleAmountChange}/>
                    </div>
                    <button>Add Credit</button>
                </form>
                <div>
                    {credits}
                </div>
            </div>
        </div>
    );
}
}

export default Credits;