import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchApiCurrencyThunk, submitExpenses } from '../redux/actions';
import '../css/walletform.css';
import store from '../redux/store';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    exchangeRates: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApiCurrencyThunk());
    this.fetchAllData();
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  generateId = (event) => {
    event.preventDefault();
    this.setState({
      id: store.getState().wallet.expenses.length,
      value: '',
      description: '',
    });
  };

  fetchAllData = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    this.setState({
      exchangeRates: data,
    });
  };

  handleClick = (expenseData) => {
    const { dispatch } = this.props;
    dispatch(submitExpenses(expenseData));
    // dispatch(fetchApiCurrencyThunk());
    // this.fetchAllData();
  };

  render() {
    const { currencies } = this.props;
    const {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    } = this.state;

    const expenseData = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    };

    return (
      <div className="walletform-body">
        <form onSubmit={ this.generateId }>
          <span>
            Valor:
            <input
              name="value"
              value={ value }
              data-testid="value-input"
              type="number"
              onChange={ (event) => this.handleChange(event) }
            />
          </span>

          <span>
            Moeda:
            <select
              name="currency"
              value={ currency }
              data-testid="currency-input"
              onChange={ (event) => this.handleChange(event) }
            >
              { currencies?.map((currencyCoin, index) => (
                <option key={ index }>{currencyCoin}</option>
              ))}
            </select>
          </span>

          <span>
            Método de pagamento:
            <select
              name="method"
              value={ method }
              data-testid="method-input"
              onChange={ (event) => this.handleChange(event) }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>

          </span>

          <span>
            Categoria:
            <select
              name="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ (event) => this.handleChange(event) }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </span>

          <span>
            Descrição:
            <input
              name="description"
              value={ description }
              data-testid="description-input"
              type="text"
              onChange={ (event) => this.handleChange(event) }
            />
          </span>

          <button
            onClick={ () => this.handleClick(expenseData) }
          >
            Adicionar Despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
