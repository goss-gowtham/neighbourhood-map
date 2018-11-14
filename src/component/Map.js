import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps";
  /*Referred from React Library as suggested in classrooms: https://tomchentw.github.io/react-google-maps/#usage--configuration
*/
import MarkerComponent from "./Marker"
const MyMapComponent = withScriptjs(
  withGoogleMap((props) => {
  return (
    <GoogleMap
      defaultZoom={11}
      zoom={props.zoom}
      defaultCenter={{ lat: 13.0827, lng: 80.2707}}
      center={props.center}
    >
      <MarkerComponent places={props.state && props.state.places}
      query={props.query}
      idClicked={props.idClicked}
      />
    </GoogleMap>
    );
  })
);

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: ""
    };
  }

  //updating map with new clicks on listview or closeAllMarkers
  componentWillReceiveProps(nextProps) {
    if (nextProps.places) {
      let newState = nextProps.places.slice();
      newState = newState.map(extra => {
        extra["animation"] = window.google.maps.Animation.DROP;
        extra["isOpen"] = false;
        return extra;
      });
      this.setState({
        place: newState
      });
    }
  }

  componentDidMount() {
    window.gm_authFailure = this.gm_authFailure;
  }
  gm_authFailure = () => {
    this.props.authFailure("Authentication Failed :( Check your console for more info")
  }
  //Referred for Component Update: https://reactjs.org/docs/react-component.html#shouldcomponentupdate
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(nextProps) === JSON.stringify(this.props) ? false : true;
  }
  render() {
    return (
      <div style={{height : "90%"}} role="application">
        <MyMapComponent
          {...this.props}
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCxHWWIFMTgAmLgWPi1cH0ewffy5zrTNEw"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          state={this.state}
          query={this.props.query}
          idClicked={this.props.idClicked}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;
