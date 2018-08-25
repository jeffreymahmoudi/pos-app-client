import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTables, selectTable } from '../actions/tableActions'
import requiresLogin from './requires-login';

import './tables-page.css';

export class TablesPage extends React.Component {
  componentDidMount = () => {    
    this.props.loadTablesConnect()
  }

  onSelectedTableChange = (selectedTable) => {
    this.props.selectTableConnect(selectedTable)
  }

  renderResults = () => {
    if (this.props.loading) {
      return <p>Loading tables...</p>;
    }

    if (this.props.error) {
      return <strong>{this.props.error.message}</strong>;
    }

    const tables = this.props.tables.map((table, index) =>
      <Link
        to="/order"
        onClick={() => this.onSelectedTableChange(table)}
        key={index}>
        <div className="table c-flex-container">
          <span className="table-number">Table {table.number}</span>
        </div>
      </Link>
    );

    return tables;
  }

  render() {
    return (
      <div className="tables">
        <h1>Tables</h1>
        <p>Select a table to begin an order. Loads table check if not previously closed.</p>
        <hr />
        <div className="c-flex-container table-list">
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
    tables: state.tables.tables,
    loading: state.tables.loading,
    error: state.tables.error,
  };
};

const mapDispatchToProps = dispatch => ({
  loadTablesConnect: () => dispatch(fetchTables()),
  selectTableConnect: (table) => dispatch(selectTable(table))
});

export default requiresLogin()(connect(mapStateToProps, mapDispatchToProps)(TablesPage));
