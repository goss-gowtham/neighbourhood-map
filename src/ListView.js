import React, { Component } from "react";
import "./ListView.css";

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }
  inputChangeHandler = event => {
    this.setState({
      query: event.target.value.toLowerCase()
    });
    this.props.listFilterHandler(event.target.value);
  };
  onClickHandler = id => {
    this.props.listItemClick(id);
  };
  render() {
    const list = this.props.mainState.places && this.props.mainState.places.filter(items => items.name.toLowerCase().includes(this.state.query))
    .map(val => (
      <div
        tabIndex={0}
        onClick={event => this.onClickHandler(val.id)}
        className="list"
        role="button"
        key={val.id}
      >
        {val.name}
      </div>
    ));
    return (
      <section
        className={`list-view ${
          this.props.mainState.listViewOpen ? `open` :``
        }`}
      >
        <div className="location-search">
          <input id="search" role="search" tabIndex={0} type="text" value={this.state.query} onChange={this.inputChangeHandler}
          />
          <label htmlFor="search">Search Places </label>
        </div>
        <div className="list-render">{list}</div>
        <div className="foursquare">
          <img width="200px" src="https://ss0.4sqi.net/img/poweredByFoursquare/poweredby-one-color-cdf070cc7ae72b3f482cf2d075a74c8c.png" alt="Powered by Foursquare"
          />
        </div>
      </section>
    );
  }
}

export default ListView;
