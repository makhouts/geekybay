import React, {useState} from 'react';
import { Navigation } from './components/navigation/Navigation';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  return (
    <div className="App">
      <Navigation />
      <p>test</p>
    </div>
  );
}

export default App;
