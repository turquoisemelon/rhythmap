import React, { useEffect, useState } from 'react';
import {PureComponent} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

// PureComponent ensures that the markers are only rerendered when data changes
export const Markers = ({ events }) => {
  console.log('events', events)
  return events.map(
    event => <Marker key={event.id} longitude={event.location.lng} latitude={event.location.lat} ><img src="pin.png" /></Marker>
  )
}