import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
{/*
  Referred from React Library as suggested in classroomshttps://tomchentw.github.io/react-google-maps/#usage--configuration
*/}
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    zoom={props.zoom}
    defaultCenter={{ lat: 13.0827, lng: 80.2707}}
    center={props.center}
  >
    {props.markers &&
      props.markers.filter(marker => marker.isVisible).map((marker, id) => (
        <Marker key={id} position={{ lat: marker.lat, lng: marker.lng }} onClick={() => props.handleMarker(marker)}>
          {marker.isOpen && (
            <InfoWindow>
              <p> Hello </p>
            </InfoWindow>)}
        </Marker> /*Referred Course work for InfoWindows: https://github.com/udacity/ud864/blob/master/Project_Code_3_WindowShoppingPart1.html*/
    )) }
  </GoogleMap>
))


export default class Map extends Component {
  render() {
    return (
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCxHWWIFMTgAmLgWPi1cH0ewffy5zrTNEw"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
