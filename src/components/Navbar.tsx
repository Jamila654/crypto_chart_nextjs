import React from 'react';
import { pairs } from './PairsList';

interface NavbarProps {
  selectedPair: string;
  setSelectedPair: (pair: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ selectedPair, setSelectedPair }) => {
  return (
    <nav style={{ padding: '1rem',backgroundColor: '#222', color: '#fff' }}>
      <h2>Crypto Chart App</h2>
      <select
        title='select'
        value={selectedPair}
        onChange={(e) => setSelectedPair(e.target.value)}
        style={{ padding: '0.5rem', marginLeft: '1rem' }}
      >
        {pairs.map((pair) => (
          <option key={pair} value={pair}>{pair}</option>
        ))}
      </select>
    </nav>
  );
};

export default Navbar;