import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userSubmit } from '../redux/actions';

class Login extends React.Component {
  state = {
    isValid: false,
    email: '',
    password: '',
  };

  validEmail = (email) => /[\w_.-]+@\w+(\.\w{2,3}){1,2}/g.test(email);

  handleErrors = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const passwordLength = password.length >= minLength;
    const errorsList = [
      !passwordLength,
      !email.length,
      !this.validEmail(email),
    ];
    const noErrors = errorsList.every((error) => error === false);
    this.setState({ isValid: noErrors });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.handleErrors);
  };

  render() {
    const { isValid, email, password } = this.state;
    const { dispatch } = this.props;

    return (
      <div>
        <input
          value={ email }
          name="email"
          data-testid="email-input"
          type="email"
          onChange={ (event) => this.handleChange(event) }
        />
        <input
          value={ password }
          name="password"
          data-testid="password-input"
          type="password"
          onChange={ (event) => this.handleChange(event) }
        />
        <Link to="/carteira">
          <button
            disabled={ !isValid }
            onClick={ () => dispatch(userSubmit(email, password)) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
