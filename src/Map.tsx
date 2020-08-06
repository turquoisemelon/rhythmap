import React, { useEffect, useState } from 'react';
import ReactMapGL, { GeolocateControl } from 'react-map-gl';
import { gql, useQuery } from '@apollo/client';

interface MapProps {}

const SONGKICK_API_KEY = process.env.REACT_APP_SONGKICK_ACCESS_TOKEN;
const mapboxApiAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export const Map = () => {
  const [viewport, setViewPort] = useState({
    width:"100vw",
    height:"100vh",
    // The 6ix
    latitude: 38.78,
    longitude: -122.45,
    zoom: 9
  })

  const GET_EVENTS_BY_METRO_AREA = gql`
  query getMetroAreaID($lat: Float!, $lng: Float!, $apiKey: String!) {
    eventsPerArea(lat: $lat, lng: $lng, apiKey: "${SONGKICK_API_KEY}") @rest(type: "EventsPerArea", path: "search/locations.json?location=geo%3A{args.lat}%2C{args.lng}&apikey={args.apiKey}") {
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

  const _onViewportChange = (viewport: any) => setViewPort({...viewport, transitionDuration: 3000 })

  const styleDecimal = "mapbox://styles/turquoisemel/ck579y5pz04rs1cqxj2ao7zgx";
  const styleMoonlight = "mapbox://styles/turquoisemel/ck2wc23g21huw1cmm7fr8ckt1";
  const styleDark = "mapbox://styles/mapbox/dark-v9";
  const styleStreet = "mapbox://styles/mapbox/streets-v11";

  const { loading, error, data } = useQuery(GET_EVENTS_BY_METRO_AREA, {
    variables: { lat: viewport.latitude, lng: viewport.longitude }
  });

  console.log('data graphql', data)
  console.log('viewport', viewport)

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
    </ReactMapGL>
  );
}