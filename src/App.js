import React, { Component } from 'react';
import './App.css';
import axios from "axios"; //https://www.npmjs.com/package/axios install this for using axios
import ListView from "./ListView";
import Navbar from "./Navbar";
import Map from "./component/Map";
import Error from "./error";
//Fetching ID for Chennai Places, Query: "food". Got this from console.log(venue.id);
const JSONdata = { "id": ["4d04b08c9d33a14347afbc78", "5469d263498e07ba3181f5dc", "5725425c498e49d09d08d12f", "50113f65e4b088cc6b025de7","4d53bd89cf8b2c0f89c89b70", "4fd225e6e4b08315f26a2bf6", "5588240e498e449c50730bec", "4fffdf94e4b00b89fb3fec86", "57e40498498e79dd123ea126", "4f81b937e4b01cf823b5633b"]};
/*Also Referred Ryan Waite walkthrough: https://www.youtube.com/watch?v=LvQe7xrUh7I*/
class App extends Component {
  constructor() {
    super();
    this.state = {
      listViewOpen: false,
      query:"",
      places: "",
      idClicked: "",
      errorDisplay: ""
    };
  }
  componentDidMount() {
    let keys = {
      client_id: "I04PEDCIDC1MT1YDH4VSUJBSGCJBMMDRIBJY10GMJ0KNUIBT",
      client_secret: "UTHX0NQSIHEBKUQOCTXNZAEGJBMHEJ1VBVWXGOKOZMOPCF35",
      v:"20181114"
    };

    let promise = []; //referred from https://javascript.info/async-await ES6
    async function asyncForEach(array, callback) {
      for(let num of array) {
        await promise.push(callback(num));
      }
    }
    const initial = async () => {
      let datas = [];
      await asyncForEach(JSONdata.id,async id => {
        await axios.get(`https://api.foursquare.com/v2/venues/${id}`,{
          params: keys
        })
        .then(resp => resp.data.response).catch(err => {
          new Error(console.log(err));
          if(err.toString().includes(429)) {
            const error = "Foursquare API quota over. Contact the developer";
            console.log(error);
            this.setState({
              errorDisplay: error
            });
          }
        })
        .then(data => {
          datas.push({
            id: data.venue.id,
            name: data.venue.name,
            coords: [data.venue.location.lat, data.venue.location.lng],
            address: data.venue.address
          }); //GET from fourSquare get API
        })
        .catch(err => {
          this.setState(prevState => ({
            errorDisplay: prevState.errorDisplay.length === 0 ? err.toString() : prevState.errorDisplay
          }));
          new Error(console.log(err));
        });
      });
      await Promise.all(promise).then(res => {
        this.setState({
          places: datas
        });
      });
    };
    initial();
  }

  listViewOpenHandler = () => {
    this.setState(prevState => ({
      listViewOpen: !prevState.listViewOpen
    }));
  };

  listFilterHandler = query => {
    this.setState({
      query: query
    });
  };
  listItemClick = id => {
    this.setState({
      idClicked: id
    });
  };
  authFailure = (error) => {
    this.setState({
      errorDisplay: error
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar listViewOpenHandler={this.listViewOpenHandler}
        />
        {console.log(this.state.errorDisplay)}
        {this.state.errorDisplay && (
          <Error errorDisplay={this.state.errorDisplay} />  //checks for error if any to show up in the console
        )}
        <ListView mainState={this.state} listFilterHandler={this.listFilterHandler} listItemClick = {this.listItemClick}
        />
        <Map role="main" places={this.state.places} query={this.state.query} idClicked={this.state.idClicked} authFailure = {this.authFailure}
        />
      </div>
    );
  }
}

export default App;
