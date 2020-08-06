import React, { useEffect, useState } from 'react';
import ReactMapGL, { GeolocateControl } from 'react-map-gl';
import { gql, useQuery } from '@apollo/client';
import { Markers } from './Markers';

interface MapProps {}

const SONGKICK_API_KEY = process.env.REACT_APP_SONGKICK_ACCESS_TOKEN;
const mapboxApiAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export const Map = () => {
  const [viewport, setViewPort] = useState({
    width:"100vw",
    height:"100vh",
    // San Franscisco
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 12
  })

  const GET_EVENTS_BY_METRO_AREA = gql`
  query getMetroAreaID($lat: Float!, $lng: Float!, $apiKey: String!) {
    eventsPerArea(lat: $lat, lng: $lng, apiKey: "${SONGKICK_API_KEY}") @rest(type: "EventsPerArea", path: "search/locations.json?location=geo%3A{args.lat}%2C{args.lng}&apikey={args.apiKey}") {
      location {
        city
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

  const _onViewportChange = (viewport: any) => setViewPort({...viewport, transitionDuration: 3000 })

  const styleDecimal = "mapbox://styles/turquoisemel/ck579y5pz04rs1cqxj2ao7zgx";
  const styleMoonlight = "mapbox://styles/turquoisemel/ck2wc23g21huw1cmm7fr8ckt1";
  const styleDark = "mapbox://styles/mapbox/dark-v9";
  const styleStreet = "mapbox://styles/mapbox/streets-v11";

  const { loading, error, data } = useQuery(GET_EVENTS_BY_METRO_AREA, {
    variables: { lat: viewport.latitude, lng: viewport.longitude }
  });

  console.log('data graphql', data && data.eventsPerArea.location && data.eventsPerArea.location )
  console.log('data', data)
  
  if (loading) {
    return <h4>Loading...</h4>;
  }
  if (error) {
    return <h4>{error.message}</h4>;
  }

  const eventsData = data && data.eventsPerArea.location && data.eventsPerArea.location[0] && data.eventsPerArea.location[0].metroArea && data.eventsPerArea.location[0].metroArea.events && data.eventsPerArea.location[0].metroArea.events.event;

  return (
    <ReactMapGL
      {...viewport}
      mapStyle={styleDark}
      onViewportChange={_onViewportChange}
      mapboxApiAccessToken={mapboxApiAccessToken}
    >
      <GeolocateControl
        style={{
          float: 'left',
          margin: '50px',
          padding: '10px',
        }}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
        showUserLocation={true}
      />
      {eventsData && <Markers events={eventsData || []} />}
    </ReactMapGL>
  );
}