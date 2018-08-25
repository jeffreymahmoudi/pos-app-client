import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';

import './checks-page.css';

export class ChecksPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

    render() {
        return (
            <div className="checks">
                <h1>Checks</h1>
                <p>Order history sorted by last updated.</p>
                <hr />
                <div className="v-flex-container">
                    <div className="check">
                      <p className="updated">Updated At</p>
                      <p className="table-number">Table: 1</p>
                      <p className="total">Total: $1.00</p>
                      <details>
                        <summary>Ordered Items</summary>
                            <div>
                                <p>name: namee</p>
                                <p>price: $100.00</p>
                            </div>
                            <div>
                                <p>name: namee</p>
                                <p>price: $100.00</p>
                            </div>
                            <div>
                                <p>name: namee</p>
                                <p>price: $100.00</p>
                            </div>
                        </details>
                    </div>
                    <div className="check">
                      <p className="updated">Updated At</p>
                      <p className="table-number">Table: 1</p>
                      <p className="total">Total: $1.00</p>
                      <details>
                        <summary>Ordered Items</summary>
                            <div>
                                <p>name: namee</p>
                                <p>price: $100.00</p>
                            </div>
                            <div>
                                <p>name: namee</p>
                                <p>price: $100.00</p>
                            </div>
                            <div>
                                <p>name: namee</p>
                                <p>price: $100.00</p>
                            </div>
                        </details>
                    </div>
                    <div className="check">
                      <p className="updated">Updated At</p>
                      <p className="table-number">Table: 1</p>
                      <p className="total">Total: $1.00</p>
                      <details>
                        <summary>Ordered Items</summary>
                            <div>
                                <p>name: namee</p>
                                <p>price: $100.00</p>
                            </div>
                            <div>
                                <p>name: namee</p>
                                <p>price: $100.00</p>
                            </div>
                            <div>
                                <p>name: namee</p>
                                <p>price: $100.00</p>
                            </div>
                        </details>
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

export default requiresLogin()(connect(mapStateToProps)(ChecksPage));
