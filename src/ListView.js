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
    .map(venue => (
      <div
        tabIndex={0}
        onClick={event => this.onClickHandler(venue.id)}
        className="list"
        role="button"
        key={venue.id}
      >
        {venue.name}
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
      </section>
    );
  }
}

export default ListView;
