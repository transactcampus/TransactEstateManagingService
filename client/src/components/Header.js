import React, { Component } from 'react';
import { connect } from 'react-redux';



class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return <li><a href="/api/auth">Login with Azure</a></li>;
      case false:
        return <li><a href="/api/auth">Login with Azure</a></li>;
      default:
        return <div><li><a href="/#">User: {this.props.auth.given_name}</a></li><li><a href="/api/auth/logout">Logout</a></li></div>
    }
  }

  render() {
    console.log(this.props)
    return (
      <nav>
        <div className="nav-wrapper red accent-4">
          <a className="left brand-logo" href="/#">TransactIoT</a>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(Header);