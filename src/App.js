import React, { Component } from 'react';
import './App.css';
import Map from "./component/Map"
import fourSquare from "./API/"
import SideBar from "./component/SideBar"
class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      updateSuperState: obj => {
        this.setState(obj);
      }
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
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)}); //Object.assign helps Copying Marker into the state. Referred: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    fourSquare.getVenue(marker.id)
      .then(res => {
       const newVenue =  Object.assign(venue, res.response.venue);
       this.setState({venues: Object.assign(this.state.venues, newVenue)});
        console.log(newVenue);
  });
  }

  handleListItem = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarker(marker);
  }
  componentDidMount() {
    fourSquare.search({
      near: "Salem, IN",  //fetching my HomeTown!
      query: "food",
      limit: 10
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry; /* Destructuring the constructor with this syntax */
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({ venues, center, markers });
    });
  }
  render() {
    return (
      <div className="App">
        <SideBar {...this.state} handleListItem={this.handleListItem}/>
        <Map {...this.state} handleMarker={this.handleMarker}/>
      </div>
    );
  }
}

export default App;
