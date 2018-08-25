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
                      <p className="updated"><span className="field">Updated: </span>1/1/1111 24:00:00G</p>
                      <p className="status"><span className="field">Status: </span>Closed</p>
                      <p className="table-number"><span className="field">Table: </span>1</p>
                      <p className="total"><span className="field">Total: </span>$1.00</p>
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
                      <p className="updated"><span className="field">Updated: </span>1/1/1111 24:00:00G</p>
                      <p className="status"><span className="field">Status: </span>Closed</p>
                      <p className="table-number"><span className="field">Table: </span>1</p>
                      <p className="total"><span className="field">Total: </span>$1.00</p>
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
                      <p className="updated"><span className="field">Updated: </span>1/1/1111 24:00:00G</p>
                      <p className="status"><span className="field">Status: </span>Closed</p>
                      <p className="table-number"><span className="field">Table: </span>1</p>
                      <p className="total"><span className="field">Total: </span>$1.00</p>
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
