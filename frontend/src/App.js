import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import NavBar from './Components/NavBar'
import About from './Components/About'
import Home from './Components/Home'
import Portfolio from './Components/Portfolio'
import Transactions from './Components/Transactions'

import PrivateRoute from './Components/PrivateRoute';
import AuthContainer from './Containers/AuthContainer';


class App extends React.Component {
  state = {
    user: null,
    isUserLoggedIn: false,
    loadingUser: true
  }

  componentDidMount() {
    this.checkUserLoggedIn();
  }

  setUser = (user) => {
    this.setState({
      user: user,
      isUserLoggedIn: true,
      loadingUser: false
    });
  }

  checkUserLoggedIn = async () => {
    try {
      const { data } = await axios.get("/api/auth/isUserLoggedIn"); 
      console.log(data)
      this.setUser(data.payload);
    } catch (err) {
      if (err.message.includes(401)) {
        this.setState({
          loadingUser: false
        })
      }
    }
    console.log('Checking if user logged in');
  }

  renderAuthContainer = () => {
    const { isUserLoggedIn } = this.state;
    return <AuthContainer isUserLoggedIn={isUserLoggedIn} setUser={this.setUser} />
  }


  logoutUser = async () => {
    console.log('logging out user');
    try {
      await axios.post('api/auth/logout');
      this.setState({
        user: null,
        isUserLoggedIn: false
      });
      this.props.history.push('/');
    } catch (err) {
      console.log('ERROR', err);
    }
  }

  renderPortfolio = (routeProps) => {
    return(
      <Portfolio
        user = {this.state.user}
      />
    )
  }

  renderTransaction = (routeProps) => {
    return (
      <Transactions 
        user = {this.state.user}
      />
    )
  }

  render() {
    return (
      <div className="App">
        <NavBar
          user={this.state.user}
          logoutUser={this.logoutUser}
          isUserLoggedIn={this.state.isUserLoggedIn}
        />
        {this.state.loadingUser ? <div>Loading User</div> : (
          <Switch>
            <Route path='/login' render={this.renderAuthContainer} />
            <Route path='/signup' render={this.renderAuthContainer} />
            <Route path='/about' user={this.state.user} component={About} />
            <PrivateRoute path='/portfolio' render={this.renderPortfolio} isUserLoggedIn={this.state.isUserLoggedIn} />
            <PrivateRoute path='/transactions' render={this.renderTransaction} isUserLoggedIn={this.state.isUserLoggedIn} />
            <Route path='/' component={Home} />
          </Switch>
        )}
      </div>
    );
  }
}

export default App;