import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import '../css/wallet.css';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet-body">
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default connect()(Wallet);
