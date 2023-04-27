import React, { Component } from 'react';
import '../css/table.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <table className="table-main">
        <thead className="table-header">
          <tr className="table-tr1">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id } className="table-tr2">
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>
                {
                  Number(
                    expense.value * expense.exchangeRates[expense.currency].ask,
                  ).toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>
                <div className="buttons">
                  <button
                    className="button is-info"
                    data-testid="edit-btn"
                    onClick={ () => dispatch(editExpense(expense.id)) }
                  >
                    Editar
                  </button>
                  <button
                    className="button is-danger"
                    data-testid="delete-btn"
                    onClick={ () => dispatch(deleteExpense(expense.id)) }
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
