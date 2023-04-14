import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logoWallet from '../img/logowallet.jpg';
import '../css/header.css';

class Header extends Component {
  render() {
    const { expenses, email } = this.props;
    const sum = expenses.reduce((acc, curr) => {
      const currentAsk = curr.exchangeRates[curr.currency].ask;
      return (acc + (Number(curr.value) * currentAsk));
    }, 0);

    return (
      <div className="header-header">
        <div className="logo-div-header">
          <img className="logo-wallet-header" src={ logoWallet } alt="logo-wallet" />
          <h1>Digital Wallet</h1>
        </div>
        <section className="user-currency">
          <p>Minha carteira:</p>
          <p data-testid="email-field">{email}</p>
          <p
            data-testid="total-field"
          >
            {sum.toFixed(2)}
          </p>
          <span data-testid="header-currency-field">BRL</span>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Header);
