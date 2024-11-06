'use client'
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CryptoChart from '../components/CryptoChart';

const Home: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState('BTCUSDT');

  return (
    <div style={{ backgroundColor: '#131722', minHeight: '100vh', color: '#fff' }}>
      <Navbar selectedPair={selectedPair} setSelectedPair={setSelectedPair} />
      <CryptoChart selectedPair={selectedPair} />
    </div>
  );
};

export default Home;