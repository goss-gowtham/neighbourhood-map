import React, { Component } from 'react';
import './App.css';
import Map from "./component/Map"
import fourSquare from "./API/"
class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12
    }
  }
  closeAllMarkers = () => {
    const markers =this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    })
    this.setState({
      markers: Object.assign(this.state.markers,markers)
    })
  }
  /*Referred from coursework InfoWindow https://github.com/udacity/ud864/blob/master/Project_Code_3_WindowShoppingPart1.html*/
  handleMarker = (marker) => {
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)}) //Object.assign helps Copying Marker into the state. Referred: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
  }


  componentDidMount() {
    fourSquare.search({
      near: "Salem, IN",  //fetching my HomeTown!
      limit: 10
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry; {/* Destructuring the constructor with this syntax */}
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true
        };
      });
      this.setState({ venues, center, markers });
    });
  }
  render() {
    return (
      <div className="App">
        <Map {...this.state} handleMarker={this.handleMarker}/>
      </div>
    );
  }
}

export default App;
