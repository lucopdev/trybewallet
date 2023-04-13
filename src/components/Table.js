import React, { Component } from 'react';
import '../css/table.css';

class Table extends Component {
  render() {
    return (
      <div>
        <header className="table-header">
          <td className="table-td">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </td>
        </header>
      </div>
    );
  }
}

export default Table;
