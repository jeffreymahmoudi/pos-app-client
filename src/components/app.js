import React from 'react';
import {connect} from 'react-redux';
import { fetchMenu } from '../actions/menuActions';
import { fetchTables } from '../actions/tableActions';
import {Route, withRouter} from 'react-router-dom';

import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import TablesPage from './tables-page';
import ChecksPage from './checks-page';
import OrderPage from './order-page';
import RegistrationPage from './registration-page';
import LoginPage from './login-page';
import {refreshAuthToken} from '../actions/auth';

export class App extends React.Component {
    componentDidMount = () => {
        this.props.loadMenuConnect()
        this.props.loadTablesConnect()
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000 // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render() {
        return (
            <div className="app">
                <HeaderBar />
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/dashboard" component={TablesPage} />
                <Route exact path="/tables" component={TablesPage} />
                <Route exact path="/checks" component={ChecksPage} />
                <Route exact path="/order" component={OrderPage} />
                <Route exact path="/register" component={RegistrationPage} />
                <Route exact path="/login" component={LoginPage} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

const mapDispatchToProps = dispatch => ({
    loadMenuConnect: () => dispatch(fetchMenu()),
    loadTablesConnect: () => dispatch(fetchTables())
  })

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
