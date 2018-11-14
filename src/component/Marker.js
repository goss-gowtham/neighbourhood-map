import React, { Component } from 'react';
import { Marker, InfoWindow } from "react-google-maps";
/*
  Referred from React Library as suggested in classrooms: https://tomchentw.github.io/react-google-maps/#markerwithlabel
*/

class MarkerComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        places: ""
      };
    }
    onClickHandler(id) {
      this.animateMarkerBounce(id);
      const marker = this.state.places.map(place => {
        if (place.id === id) {
          place.isOpen = !place.isOpen;
        }
        return place;
      });
      this.setState(() => {
        return { places: marker };
      });
    }
    //referred from https://stackoverflow.com/questions/44729776/how-can-animation-be-added-to-markers-in-react-google-maps
    animateMarkerBounce = id => {
      const marker = this.state.places.map(
        place => place.id === id ? (place.animation = 1) && place : !(place.animation = 0) && place
      );
      this.setState(() => {
        return {places: marker };
      });
      setTimeout(() => {
        this.state.places.map(
          place => (place.id === id ? (place.animation = 0) && place : place)
        );
        this.setState(() => {
          return { places: marker };
        });
      }, 400);
    };

    //when new marker is Clicked then react will receive props is used : https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops

    componentWillReceiveProps(nextProps) {
      if (nextProps.places) {
        this.setState({
        places: nextProps.places
        });
      }
      if(nextProps.idClicked) {
        this.onClickHandler(nextProps.idClicked);   
      }
    }

    componentDidMount() {
      this.setState({
        places: this.props.places
      });
    }
    render() {
      const place = this.state.places && this.state.places
          .filter(place => place.name.toLowerCase().includes(this.props.query))
          .map(place => (
            <Marker key={place.id} position={{lat: place.coords[0],lng:place.coords[1] }} animation={place.animation}
            onClick={e => this.onClickHandler(place.id)}
            >
             {place.isOpen && (
               <InfoWindow onCloseClick={e =>this.onClickHandler(place.id)}>
               <div>
                 <h3> {place.name} </h3>
                 <p>{place.address}</p> {/*ignored photos as Foursquare quota over always*/}
                 </div>
               </InfoWindow>
             )}
           </Marker> /*Referred Course work for InfoWindows: https://github.com/udacity/ud864/blob/master/Project_Code_3_WindowShoppingPart1.html*/
         ));
         return <div>{place}</div>;
       }
    }
export default MarkerComponent;
