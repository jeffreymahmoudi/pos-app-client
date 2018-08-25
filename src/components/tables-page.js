import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';

import './tables-page.css';

export class TablesPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

    render() {
        return (
            <div className="tables">
                <h1>Tables</h1>
                <p>Select a table to begin an order. Loads table check if previously not closed.</p>
                <hr />
                <div className="flex-container">
                    <div className="table flex-container">
                      <p className="table-number">Table 1</p>
                    </div>
                    <div className="table flex-container">
                      <p className="table-number">Table 2</p></div>
                    <div className="table flex-container">
                      <span className="table-number">Table 3</span>
                    </div>
                </div>
                {/* <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>
                <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
                </div> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstname} ${currentUser.lastname}`,
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(TablesPage));
