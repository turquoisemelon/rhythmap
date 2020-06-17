import React, { useState, useRef } from 'react';
import ReactMapGL, { GeolocateControl } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from "deck.gl";

import Geocoder from 'react-map-gl-geocoder';

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
  });

  const _onViewportChange = (viewport: any) => setViewPort({...viewport, transitionDuration: 3000 })

  const [searchResultLayer, setSearchResultLayer] = useState(null);

  const mapRef = useRef(null);

  const mapboxApiAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  
  const styleDecimal = "mapbox://styles/turquoisemel/ck579y5pz04rs1cqxj2ao7zgx";
  const styleMoonlight = "mapbox://styles/turquoisemel/ck2wc23g21huw1cmm7fr8ckt1";
  const styleDark = "mapbox://styles/mapbox/dark-v9";
  const styleStreet = "mapbox://styles/mapbox/streets-v11";

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
      ref={mapRef}
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
      <Geocoder
        mapRef={mapRef}
        onViewportChange={(viewport: any) => setViewPort(viewport)}
        mapboxApiAccessToken={mapboxApiAccessToken}
        onResult={(e: any) => setSearchResultLayer(new GeoJsonLayer({
          id: "search-result",
          data: e.result.geometry,
          getFillColor: [255, 0, 0, 128],
          getRadius: 1000,
          pointRadiusMinPixels: 10,
          pointRadiusMaxPixels: 10
        }))}
      />
    <DeckGL {...viewport} layers={[searchResultLayer]} />
    </ReactMapGL>
  );
}