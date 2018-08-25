import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchChecks } from '../actions/checkActions';

import './checks-page.css';

export class ChecksPage extends React.Component {
  componentDidMount = () => {
    this.props.loadChecksConnect();
  };

  renderTotal = check => {
    let total = 0;
    for (let i = 0; i < check.orderedItems.length; i++) {
      total += check.orderedItems[i].itemId.price;
    }
    return total;
  };

  renderOrderedItems = check => {
    const items = check.orderedItems.map((item, index) => (
      <React.Fragment key={index}>
        <p>${item.itemId.price}.00 - {item.itemId.name}</p>
      </React.Fragment>
    ));

    return items;
  };

  renderResults = () => {
    if (this.props.loading) {
      return <p>Loading checks...</p>;
    }

    if (this.props.error) {
      return <strong>{this.props.error.message}</strong>;
    }

    const checks = this.props.checks.map((check, index) => (
      <div className="check-order" key={index}>
        <p>{new Date(check.updatedAt).toUTCString()}</p>
        <p>Table: {check.tableId.number}</p>
        <p>Status: {check.closed ? "Closed" : "Open"}</p>
        <p>Total: ${this.renderTotal(check)}.00</p>
        <details>
          <summary>Ordered Items</summary>
          {this.renderOrderedItems(check)}
        </details>
      </div>
    ));

    return checks;
  };

  render = () => {
    return (
      <div className="checks-container">
        <h1>Checks</h1>
        <p>Order history sorted by last updated.</p>
        <hr />
        <div className="v-flex-container">
          {this.renderResults()}
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
    checks: state.checks.checks,
    loading: state.checks.loading,
    error: state.checks.error
  };
};

const mapDispatchToProps = dispatch => ({
  loadChecksConnect: () => dispatch(fetchChecks())
});

export default requiresLogin()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChecksPage)
);
