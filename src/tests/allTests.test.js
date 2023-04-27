import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const initialState = {
  wallet: {
    currencies: [...Object.keys(mockData).filter((currency) => currency !== 'USDT')],
    expenses: [{
      id: 0,
      value: '',
      description: 'Hot Dog',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: mockData,
    }],
    editor: false,
    idToEdit: 0,
    allData: mockData,
    expenseToEdit: {},
  },
};

describe('Testa a aplicação', () => {
  it('testa se existem elementos no componente de login', () => {
    renderWithRouterAndRedux(<App />);

    const logoLogin = screen.getByRole('img', { name: /logo-wallet/i });
    const emailInput = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    expect(logoLogin).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('Testa se ao clicar no botão de entrar é renderizado o componente wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const submitButton = screen.getByRole('button', { name: /entrar/i });
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId('password-input');
    expect(submitButton).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    act(() => {
      userEvent.type(emailInput, 'teste@teste.com');
      userEvent.type(passwordInput, '123456');
    });
    expect(submitButton).not.toBeDisabled();

    act(() => {
      userEvent.click(submitButton);
      history.push('/carteira');
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
    expect(screen.getByText(/minha carteira:/i)).toBeInTheDocument();
  });

  it('Testa o componente Header', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    expect(screen.getByTestId('email-field')).toBeInTheDocument();

    const totalField = screen.getByTestId('total-field');
    const valueInput = screen.getByRole('spinbutton');
    const addExpense = screen.getByRole('button', { name: /adicionar despesa/i });

    act(() => {
      userEvent.type(valueInput, '25.40');
      userEvent.click(addExpense);
    });
    expect(totalField.innerHTML).toBe('120.73');
  });

  it('Testa o funcionamento do form na pagina wallet', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });

    const valueInput = screen.getByRole('spinbutton');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const description = screen.getByRole('textbox');
    const addExpense = screen.getByRole('button', { name: /adicionar despesa/i });

    act(() => {
      userEvent.type(valueInput, '25');
    });

    expect(currency.value).toBe('USD');
    expect(method.value).toBe('Dinheiro');
    expect(tag.value).toBe('Alimentação');

    act(() => {
      userEvent.type(description, 'McDonalds');
      userEvent.click(addExpense);
    });

    const valueCell = screen.getByRole('cell', { name: /25\.00/i });

    expect(screen.getByRole('cell', { name: /mcdonalds/i })).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: /alimentação/i })[1]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: /dinheiro/i })[0]).toBeInTheDocument();
    expect(valueCell).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: /dólar americano\/real brasileiro/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: /4\.75/i })[0]).toBeInTheDocument();

    const editBtn = screen.getAllByRole('button', {
      name: /editar/i,
    });
    const deleteBtn = screen.getAllByRole('button', {
      name: /excluir/i,
    });
    const table = document.getElementsByClassName('table-tr2');

    act(() => {
      userEvent.click(editBtn[0]);
      userEvent.type(valueInput, '34');
    });

    const editExpenseBtn = screen.getByRole('button', { name: /editar despesa/i });

    act(() => {
      userEvent.click(editExpenseBtn);
    });
    expect(screen.getByRole('cell', { name: /34\.00/i })).toBeInTheDocument();

    expect(table).toHaveLength(1);

    act(() => {
      userEvent.click(deleteBtn[0]);
    });
    expect(table).toHaveLength(0);
  });

  it('Testa se ao chamar a API o resultado é filtrado corretamente', () => {
    const mockFetch = () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
      });
    };

    mockFetch();
    const { store } = renderWithRouterAndRedux(<Wallet />);
    const state = store.getState();
    expect(state.wallet.currencies).not.toContain('USDT');
  });
});
