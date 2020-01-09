import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

interface MapProps {}

export const Map = (props: MapProps) => {

  const [viewport, setViewPort ] = useState({
    width: '100%',
    height: 900,
    // The 6ix
    latitude: 43.651070,
    longitude: -79.347015,
    zoom: 9
  })

  const _onViewportChange = (viewport: any) => setViewPort({...viewport, transitionDuration: 3000 })

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/dark-v8"
      onViewportChange={_onViewportChange}
      mapboxApiAccessToken={accessToken}
    />
  );
}