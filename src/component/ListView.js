import React, { Component } from "react";

export default class ListView extends Component {
  render() {
    return (
      <li className="listView" onClick={() => {this.props.handleListItem(this.props)
      }}>{this.props.name}</li>
    )
  }
}
