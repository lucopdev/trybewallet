import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchApiCurrencyThunk, submitExpenses } from '../redux/actions';
import '../css/walletform.css';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApiCurrencyThunk());
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  generateId = () => {
    // event.preventDefault();
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
    }));
  };

  handlePreventDefault = (event) => {
    event.preventDefault();
  };

  handleClickSubmit = (expenseData) => {
    const { dispatch } = this.props;
    dispatch(submitExpenses(expenseData));
    dispatch(fetchApiCurrencyThunk());
    this.generateId();
  };

  handleClickEdit = (expenseEdited) => {
    const { dispatch } = this.props;
    dispatch(submitExpenses(expenseEdited));
  };

  render() {
    const { idToEdit, allData, currencies, editor } = this.props;

    const {
      id,
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;

    const expenseData = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: allData,
    };

    const expenseEdited = {
      id: idToEdit,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: allData,
    };

    return (
      <div className="walletform-body">
        <form onSubmit={ this.handlePreventDefault } className="walletform-form">
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

          {editor ? (
            <button
              onClick={ () => this.handleClickEdit(expenseEdited) }
            >

              Editar despesa
            </button>
          ) : (
            <button
              onClick={ () => this.handleClickSubmit(expenseData) }
            >

              Adicionar Despesa
            </button>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  allData: state.wallet.allData,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  allData: PropTypes.shape({}).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
