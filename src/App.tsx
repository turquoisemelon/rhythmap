import React from 'react';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Map } from './Map';

const App: React.FC = () => {
  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
