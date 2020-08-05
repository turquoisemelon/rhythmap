import React, { useEffect, useState } from 'react';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Map } from './Map';

type AppProps = {
  query?: String;
}

const metroAreas = {
  Toronto: {
    latitude: 43.651070,
    longitude: -79.347015,
  }
}

const TORONTO = "Toronto";
const CANADA = "Canada";



const App: React.FC<AppProps> = ({ query = TORONTO }) => {
  const [metroAreaCoordinates, setMetroAreaCoordinates] = useState({
    latitude: metroAreas.Toronto.latitude,
    longitude: metroAreas.Toronto.longitude,
  });

  const [metroAreaId, setMetroAreaId] = useState(null);


  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
