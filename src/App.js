import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './component/Home';
import UserProfile from './component/UserProfile';
import Login from './component/Login';
import Credits from './component/AddCredit';
import Debits from './component/AddDebit';
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 0,
      creditBalance: 0,
      debitBalance: 0,
      credits: [],
      debits: [],
      currentUser: {
        userName: 'istiaque_khan',
        memberSince: '11/11/11',
      },
    }
  }

 componentDidMount = () => {
    this.getCredits();
    this.getDebits();
  };

mockLogin = (loginInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = loginInfo.username
    this.setState({
      currentUser: newUser
    })
    this.calculateCredits();
    this.calculateDebits();
    this.calculateAccountBalance();
  };
calculateDebits = () => {
    let total =0
    for(let i of this.state.debits) {
      total += i.amount
    }
    this.setState({
      debitsTotal: total
    })
  };
calculateCredits = () => {
    let total =0
    for(let i of this.state.credits) {
      total += i.amount
    }
    this.setState({
      creditsTotal: total
    })
  };
calculateAccountBalance = () => {
    let debitsTotal = 0
    let creditsTotal = 0
    for(let i of this.state.debits) {
      debitsTotal += i.amount
    }
    for(let i of this.state.credits) {
      creditsTotal += i.amount
    }
    this.setState({
      accountBalance: creditsTotal - debitsTotal
    })
  };
handleAddCredit = (item, amount) => {
    let currBalance = this.state.accountBalance
    let newCredits = this.state.credits.concat([{
      description: item,
      amount: amount,
      date: new Date().toLocaleDateString()
    }]);
    let newTotal = this.state.creditsTotal + parseInt(amount)
    this.setState({
      credits: newCredits,
      creditsTotal: newTotal,
      accountBalance: currBalance + newTotal
    })
  };
handleAddDebit = (item, amount) => {
    let currBalance = this.state.accountBalance
    let newDebits = this.state.debits.concat([{
      description: item,
      amount: amount,
      date: new Date().toLocaleDateString()
    }]);
    let newTotal = this.state.debitsTotal + parseInt(amount)
    this.setState({
      debits: newDebits,
      debitsTotal: newTotal,
      accountBalance: currBalance - newTotal
    }) 
  };
async getCredits() {
    await axios.get("https://moj-api.herokuapp.com/credits")
    .then(response => {
      let res = response.data
      this.setState({
        credits: res
      })
    })
    .catch(err => console.log(err))
  };
async getDebits() {
    await axios.get("https://moj-api.herokuapp.com/debits")
    .then(response => {
      let res = response.data
      this.setState({
        debits: res
      })
    })
    .catch(err => console.log(err))
  };

render() {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}/>);
    const LoginComponent = () => (<Login user={this.state.currentUser} mockLogin={this.mockLogin} {...this.props}/>)
    const CreditsComponent = () => (<Credits accountBalance={this.state.accountBalance} credits={this.state.credits} creditsTotal={this.state.creditsTotal} handleAddCredit={this.handleAddCredit}/>)
    const DebitsComponent = () => (<Debits accountBalance={this.state.accountBalance} debits={this.state.debits} debitsTotal={this.state.debitsTotal} handleAddDebit={this.handleAddDebit}/>)
    return(
      <Router>
        <div>
          <Route exact path="/" render={LoginComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/home"  render={HomeComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;