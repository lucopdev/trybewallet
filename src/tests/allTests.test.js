import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

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

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '123456');
    expect(submitButton).not.toBeDisabled();
    userEvent.click(submitButton);
    act(() => {
      history.push('/carteira');
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
    expect(screen.getByText(/minha carteira:/i)).toBeInTheDocument();
  });

  it('Testa o componente Header', async () => {
    const initialState = {
      wallet: {
        currencies: [...Object.keys(mockData)],
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
    renderWithRouterAndRedux(<Wallet />, { initialState });
    expect(screen.getByTestId('email-field')).toBeInTheDocument();

    const totalField = screen.getByTestId('total-field');
    const valueInput = screen.getByRole('spinbutton');
    const addExpense = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInput, '25.40');
    userEvent.click(addExpense);

    expect(totalField.innerHTML).toBe('120.73');
  });

  it('Testa o form na pagina wallet', () => {
    renderWithRouterAndRedux(<Wallet />);
    const view = screen.getByText(/moeda:/i);

    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(within(view).getByRole('combobox')).toBeInTheDocument();
  });
});
