import React, { Component } from "react";
import VenueList from "./VenueList"

export default class SideBar extends Component {
    constructor() {
      super();
      this.state = {
        query: "",
        venues: []
      };
    }
    handleFilterVenues = () => {
      if(this.state.query.trim() !==""){
        const venues = this.props.venues.filter(venue => venue.name.toLowerCase().includes(this.state.query.toLowerCase()));
        return venues;
      }
      return this.props.venues;
    };
    handleChange = event => {
      this.setState({query: event.target.value});

      const markers = this.props.venues.map(venue => {
        const isMatched = venue.name.toLowerCase().includes(event.target.value.toLowerCase());
        const marker = this.props.markers.find(marker => marker.id === venue.id);
        if(isMatched) {
          marker.isVisible = true;
        }
        else{
          marker.isVisible = false;
        }
        return marker;
      });
      this.props.updateSuperState({markers});
    };
    render() {
      return (
        <div className="sideBar">
          <input type={"search"} id="search" placeholder="Search Places" onChange={this.handleChange}/>
          <VenueList {...this.props} venues={this.handleFilterVenues()} handleListItem={this.props.handleListItem} />
          <div style={{background:"white", bottom: "10%"}}>
            <img width="200px" src="https://ss0.4sqi.net/img/poweredByFoursquare/poweredby-one-color-cdf070cc7ae72b3f482cf2d075a74c8c.png" alt="Powered by Foursquare"
            />
          </div>
        </div>
      )
    }
}
