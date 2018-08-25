import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import { fetchProtectedData } from '../actions/protected-data';

import './order-page.css';

export class OrderPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  render() {
    return (
      <div className="order">
        <h1>Order</h1>
        <p>Check status.</p>
        <hr />
        <div className="c-flex-container order-container">
            <div className="check-container">
                <h3>Check</h3>
            </div>
            <div className="menu-container">
                <h3>Menu</h3>
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstname} ${currentUser.lastname}`,
    protectedData: state.protectedData.data
  };
};

export default requiresLogin()(connect(mapStateToProps)(OrderPage));
