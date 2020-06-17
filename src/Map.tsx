import React, { useState } from 'react';
import ReactMapGL, { GeolocateControl } from 'react-map-gl';

interface MapProps {}

const mapboxApiAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

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

  const styleDecimal = "mapbox://styles/turquoisemel/ck579y5pz04rs1cqxj2ao7zgx";
  const styleMoonlight = "mapbox://styles/turquoisemel/ck2wc23g21huw1cmm7fr8ckt1";
  const styleDark = "mapbox://styles/mapbox/dark-v9";
  const styleStreet = "mapbox://styles/mapbox/streets-v11";

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
      />
    </ReactMapGL>
  );
}