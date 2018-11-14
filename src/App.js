import React, { Component } from 'react';
import './App.css';
import axios from "axios"; //https://www.npmjs.com/package/axios install this for using axios
import ListView from "./ListView";
import Navbar from "./Navbar";
import Map from "./component/Map";
import Error from "./error";
import fourSquare from "./API/";
//Fetching ID for Chennai Places, Query: "food". Got this from console.log(venue.id);
const JSONdata = { "id": ["4d04b08c9d33a14347afbc78", "5469d263498e07ba3181f5dc", "5725425c498e49d09d08d12f", "50113f65e4b088cc6b025de7","4d53bd89cf8b2c0f89c89b70", "4fd225e6e4b08315f26a2bf6", "5588240e498e449c50730bec", "4fffdf94e4b00b89fb3fec86", "57e40498498e79dd123ea126", "4f81b937e4b01cf823b5633b"]};
class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      listViewOpen: false,
      query:"",
      places: "",
      idClicked: "",
      errorDisplay: ""
    };
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
  handleMarker = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)}); //Object.assign helps Copying Marker into the state. Referred: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    fourSquare.getVenue(marker.id)
      .then(res => {
       const newVenue =  Object.assign(venue, res.response.venue);
       this.setState({venues: Object.assign(this.state.venues, newVenue)});
  });
  }


  componentDidMount() {
    fourSquare.search({
      near: "Chennai, IN",  //fetching my HomeTown!
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
      console.log(venues);
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
