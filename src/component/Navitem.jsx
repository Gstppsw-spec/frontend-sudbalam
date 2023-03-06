import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navitem extends Component {
  render() {
    return (
      <li id={this.props.item} className="linee">
        <Link
          to={this.props.tolink}
          style={{textDecoration: "none"}}
          onClick={this.props.activec.bind(this, this.props.item)}
        >
          {this.props.item}
        </Link>
      </li>
    );
  }
}

export default Navitem;
