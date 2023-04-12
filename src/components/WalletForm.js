import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/walletform.css';
import PropTypes from 'prop-types';
import { fetchApiThunk } from '../redux/actions';

class WalletForm extends Component {
  state = {

  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApiThunk());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div className="walletform-body">
        WalletForm
        <span>
          <input
            data-testid="value-input"
            type="number"
          />
        </span>
        
        <input
          data-testid="description-input"
          type="text"
        />

        <select
          data-testid="currency-input"
        >
          { currencies?.map((currency, index) => (
            <option key={ index }>{currency}</option>
          ))}
        </select>

        <select
          data-testid="method-input"
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>

        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
