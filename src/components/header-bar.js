import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';

import './header-bar.css';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  renderAuth = () => {
    return (
      <React.Fragment>
        <li>
          <Link to="/dashboard">Tables</Link>
        </li>
        |
        <li>
          <Link to="/checks">Checks</Link>
        </li>
        |
        <li>
          <button onClick={() => this.logOut()}>Sign Out</button>
        </li>
      </React.Fragment>
    );
  }

  renderNoAuth = () => {
    return (
      <React.Fragment>
        <li>
          <Link to="/register">Sign Up</Link>
        </li>
        |
        <li>
        <Link to="/login">Sign In</Link>
        </li>
      </React.Fragment>
    );
  }

  render() {
    return (
      <header>
        <nav className="flexContainer" role="navigation">
          <ul className="nav flexItem flexStart">
            <li>
              <Link to="/" className="logo">Moody POS</Link>
            </li>
          </ul>
          <ul className="nav flexContainer flexEnd">
            {this.props.loggedIn ? this.renderAuth() : this.renderNoAuth()}
          </ul>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
