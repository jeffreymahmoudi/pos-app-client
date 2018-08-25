import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import { fetchProtectedData } from '../actions/protected-data';

import './tables-page.css';

export class TablesPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  render() {
    return (
      <div className="tables">
        <h1>Tables</h1>
        <p>Select a table to begin an order. Loads table check if not previously closed.</p>
        <hr />
        <div className="c-flex-container table-list">
          <Link to="order">
            <div className="table c-flex-container">
                <span className="table-number">Table 1</span>
            </div>
          </Link>
          <Link to="order">
            <div className="table c-flex-container">
                <span className="table-number">Table 2</span>
            </div>
          </Link>
          <Link to="order">
            <div className="table c-flex-container">
                <span className="table-number">Table 3</span>
            </div>
          </Link>
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

export default requiresLogin()(connect(mapStateToProps)(TablesPage));
