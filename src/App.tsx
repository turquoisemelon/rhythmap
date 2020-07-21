import React, { useEffect, useState } from 'react';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Map } from './Map';

const metroAreas = {
  Toronto: {
    latitude: 43.651070,
    longitude: -79.347015,
  }
}

const TORONTO = "Toronto";
const CANADA = "Canada";

const SONGKICK_API_KEY = process.env.REACT_APP_SONGKICK_ACCESS_TOKEN;

const App: React.FC = () => {
  const [metroAreaCoordinates, setMetroAreaCoordinates] = useState({
    latitude: metroAreas.Toronto.latitude,
    longitude: metroAreas.Toronto.longitude,
  });

  const [metroAreaId, setMetroAreaId] = useState(null);

  const locationSearchApiRequestUrl = `https://api.songkick.com/api/3.0/search/locations.json?query=${TORONTO}&apikey=${SONGKICK_API_KEY}`;
  const eventsByMetroAreaApiRequestUrl = `https://api.songkick.com/api/3.0/metro_areas/${metroAreaId}/calendar.json?apikey=${SONGKICK_API_KEY}`;

  useEffect(() => {
    fetch(locationSearchApiRequestUrl)
    .then(response => response.json())
    .then(data => {
      const metroAreaObject = data.resultsPage.results.location.filter((location: any) => location.metroArea.displayName === TORONTO && location.metroArea.country.displayName === CANADA)[0].metroArea;
      setMetroAreaId(metroAreaObject.id);
      setMetroAreaCoordinates({
        latitude: metroAreaObject.latitude,
        longitude: metroAreaObject.longitude
      })
    })
  }, [locationSearchApiRequestUrl]);

  useEffect(() => {
    fetch(eventsByMetroAreaApiRequestUrl)
    .then(response => response.json())
    .then(data => console.log(data.resultsPage))
  }, [eventsByMetroAreaApiRequestUrl])

  return (
    <div className="App">
      <Map metroAreaCoordinates={metroAreaCoordinates} />
    </div>
  );
}

export default App;
