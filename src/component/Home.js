import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import { Link } from "react-router-dom";


class Home extends Component {
  render() {
      return(
          <div>
              <img src="https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F1085761912%2F0x0.jpg%3Ffit%3Dscale" alt="bank" width="690" height="420"/>
              <h1>Bank of React</h1>
              <Link to="/UserProfile">User Profile</Link><br/>
              <Link to="/Debits">Debits</Link><br/>
              <Link to="/Credits">Credits</Link><br/>
              <AccountBalance accountBalance={this.props.accountBalance}/>
          </div>
      );
  }
}
export default Home;