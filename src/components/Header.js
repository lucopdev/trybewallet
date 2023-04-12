import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        Header
        <section className="user-currency">
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">0</p>
          <span data-testid="header-currency-field">BRL</span>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.user.email,
  password: state.user.user.password,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
