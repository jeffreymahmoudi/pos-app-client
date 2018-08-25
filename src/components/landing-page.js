import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

// import LoginForm from './login-form';

import Background from './landing-page.png';
import './landing-page.css';

const landingStyle = {
    backgroundImage: `url(${Background})`,
  };

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <main className="landing">
          <div className="hero-image" style={landingStyle}>
            <div className="hero-text">
              <h1>Moody POS</h1>
              <p>A minimal Point of Sale system </p>
              <Link to="/register">Sign Up</Link>
              <Link to="/Login">Sign In</Link>
            </div>
          </div>
          <div className="description">
            <h2>What is this?</h2>
            <p>This application is a minimal PoS that handles a menu with tables and checks for a restaurant. <br />It was built to learn the skills of async operations using a Redux store.</p>
          </div>
        </main>
      )

    // return (
    //     <div className="home">
    //         <h2>Welcome to Foo App</h2>
    //         <LoginForm />
    //         <Link to="/register">Register</Link>
    //     </div>
    // );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
