import React, { Component } from "react";
//exports the list rendered from given places from FourSquare
export default class ListView extends Component {
  render() {
    return (
      <li tabIndex={0} className="listView" onClick={() => {this.props.handleListItem(this.props)
      }}>{this.props.name}</li>
    )
  }
}
