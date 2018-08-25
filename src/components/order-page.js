import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { fetchMenu } from '../actions/menuActions';
import { fetchTableCheck, fetchNewCheck, fetchAddCheckItem, fetchRemoveCheckItem, fetchCloseCheck } from '../actions/checkActions'
import requiresLogin from './requires-login';

import './order-page.css';

export class OrderPage extends React.Component {
  componentDidMount = () => {
    this.props.loadMenuConnect()
    this.props.loadTableCheckConnect(this.props.selectedTable)
  }

  onOpenCheckChange = (selectedTable) => {
    this.props.loadNewCheckConnect(selectedTable)
  }

  onAddCheckItemChange = (check, item) => {
    this.props.loadAddCheckItemConnect(check, item)
  }

  onRemoveCheckItemChange = (check, orderedItem) => {
    this.props.loadRemoveCheckItemConnect(check, orderedItem)
  }

  onCloseCheckChange = (selectedCheck) => {
    this.props.loadCloseCheckConnect(selectedCheck)
  }


  renderCheckButtons = () => {
    if(!this.props.selectedCheck) {
      return (
        <button onClick={() => this.onOpenCheckChange(this.props.selectedTable)}>Open Check</button>
      )
    } else {
      if(!this.props.selectedCheck.closed) {
        return (
          <button onClick={() => this.onCloseCheckChange(this.props.selectedCheck)}>Close Check</button>
        )
      } else {
        return (
          <span>Check closed</span>
        )
      }
    }
  }

  renderCheckItems = () => {
    if(!this.props.selectedCheck || this.props.selectedCheck.orderedItems < 1) {
      return (
        <li>Order is empty</li>        
      );
    }

    const order = this.props.selectedCheck.orderedItems.map((item, index) =>
      <li key={index}>
        { this.props.selectedCheck && !this.props.selectedCheck.closed ? <button onClick={() => this.onRemoveCheckItemChange(this.props.selectedCheck, item)}>Remove Item</button> : '' }
        <span className="item-price">${item.itemId.price}.00</span> <span className="item-name">{item.itemId.name}</span>
      </li>
    )
    return order;
  }

  renderCheckTotal = () => {
    if(!this.props.selectedCheck || this.props.selectedCheck.orderedItems < 1) {
      return (
        <span>Total: $0.00</span>
      )
    }
    else {
      let total = 0;
      for(let i = 0; i < this.props.selectedCheck.orderedItems.length; i++) {
        total += this.props.selectedCheck.orderedItems[i].itemId.price
      }
      return (
        <span>Total: ${total}.00</span>
      )
    }
  }

  renderCheck = () => {
    return (
      <div className="check-container">
        <div className="check-buttons">
          {this.renderCheckButtons()}
        </div>
        <h3>ORDER: Table {this.props.selectedTable.number}</h3>
        {this.renderCheckTotal()}
        <hr />
        <div className="check-items-wrapper">
          <ul className="check-list">
            {this.renderCheckItems()}
          </ul>
        </div>
      </div>
    );
  }

  renderMenuItems = () => {
    const menu = this.props.menu.map((item, index) =>
      <li key={index}>
        <div className="menu-item">
          <div className="menu-button">
            {!this.props.selectedCheck || this.props.selectedCheck.closed ? '' : <button onClick={() => this.onAddCheckItemChange(this.props.selectedCheck, item)}>Add Item</button>}
          </div>
          <h2>${item.price} - {item.name}</h2>
        </div>
      </li>
    )
    return menu;
  }

  renderMenu = () => {
    if(!this.props.selectedCheck) {
      return "";
    }

    return (
      <div className="menu-container">
        <h3>MENU</h3>
        <ul className="menu-list">
          {this.renderMenuItems()}
        </ul>
      </div>
    );
  }

  render = () => {
    if(!this.props.selectedTable) {
      return (
        <Redirect to='/dashboard' />
      )
    }

    return (
      <div className="order">
        <h1>Order</h1>
        <p>Open a check to add items. The check will be loaded if not previously closed.</p>
        <hr />
        <div className="flex-container order-container">
            {this.renderCheck()}
            {this.renderMenu()}
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
    menu: state.menu.menu,
    selectedTable: state.tables.selectedTable,
    selectedCheck: state.checks.selectedCheck
  };
};

const mapDispatchToProps = dispatch => ({
  loadMenuConnect: () => dispatch(fetchMenu()),
  loadTableCheckConnect: (table) => dispatch(fetchTableCheck(table)),
  loadNewCheckConnect: (table) => dispatch(fetchNewCheck(table)),
  loadAddCheckItemConnect: (check, item) => dispatch(fetchAddCheckItem(check, item)),
  loadRemoveCheckItemConnect: (check, orderedItem) => dispatch(fetchRemoveCheckItem(check, orderedItem)),
  loadCloseCheckConnect: (check) => dispatch(fetchCloseCheck(check))
})

export default requiresLogin()(connect(mapStateToProps, mapDispatchToProps)(OrderPage));
