import React, { useState } from 'react';
import ReactMapGL, { GeolocateControl } from 'react-map-gl';

interface MapProps {}

export const Map = (props: MapProps) => {

  const [viewport, setViewPort] = useState({
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
      mapStyle={styleDark}
      onViewportChange={(viewport: any) => setViewPort({...viewport, transitionDuration: 3000 })}
      mapboxApiAccessToken={accessToken}
    >
      <GeolocateControl
        style={{
          float: 'left',
          margin: '50px',
          padding: '10px',
        }}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
      />
  );
}