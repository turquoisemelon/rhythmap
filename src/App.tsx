import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
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

const SONGKICK_API_KEY = process.env.REACT_APP_SONGKICK_ACCESS_TOKEN;

const App: React.FC<AppProps> = ({ query = TORONTO }) => {
  const [metroAreaCoordinates, setMetroAreaCoordinates] = useState({
    latitude: metroAreas.Toronto.latitude,
    longitude: metroAreas.Toronto.longitude,
  });

  const [metroAreaId, setMetroAreaId] = useState(null);

  const GET_EVENTS_BY_METRO_AREA = gql`
    query getMetroAreaID($query: String!, $apiKey: String!) {
      eventsPerArea(query: $query, apiKey: "${SONGKICK_API_KEY}") @rest(type: "EventsPerArea", path: "search/locations.json?query={args.query}&apikey={args.apiKey}") {
        location {
          metroArea {
            id @export(as: "id")
            displayName
            country
            lng
            lat
            events (apiKey: "${SONGKICK_API_KEY}") @rest(type: "Events", path: "metro_areas/{exportVariables.id}/calendar.json?apikey={args.apiKey}") {
              event
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_EVENTS_BY_METRO_AREA, {
    variables: { query }
  });

  console.log('data graphql', data)

  return (
    <div className="App">
      <Map metroAreaCoordinates={metroAreaCoordinates} />
    </div>
  );
}

export default App;
