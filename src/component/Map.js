/* global google */
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
/*
  Referred from React Library as suggested in classroomshttps://tomchentw.github.io/react-google-maps/#usage--configuration
*/
//Marker and InfoWindow is rendered here
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={11}
    zoom={props.zoom}
    defaultCenter={{ lat: 13.0827, lng: 80.2707}}
    center={props.center}
  >
    {props.markers &&
      props.markers.filter(marker => marker.isVisible).map((marker, id, markerCount) => {
        const venueInfo = props.venues.find(venue => venue.id === marker.id);
        return <Marker key={id}
         position={{ lat: marker.lat, lng: marker.lng }} onClick={() => props.handleMarker(marker)}
         animation={markerCount.length === 1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}>
          {marker.isOpen && (
            <InfoWindow>
              <div>
                <h1> {venueInfo.name} </h1>
                <p>{venueInfo.location.address}</p>
              </div>
            </InfoWindow>)}
        </Marker> /*Referred Course work for InfoWindows: https://github.com/udacity/ud864/blob/master/Project_Code_3_WindowShoppingPart1.html
        And for Marker Animations: https://developers.google.com/maps/documentation/javascript/examples/marker-animations*/
    }) }
  </GoogleMap>
))

//Checks for Auth failure and then renders map with Marker and InfoWindow
export default class Map extends Component {
  componentDidMount() {
    window.gm_authFailure = this.gm_authFailure;
  }
  gm_authFailure = () => {
    this.props.authFailure("Authentication Failed :( Check your console for more info")
  }
  render() {
    return (
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCxHWWIFMTgAmLgWPi1cH0ewffy5zrTNEw"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`,width: `80%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
