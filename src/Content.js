import React from "react";
import Table from "./Table";

class Content extends React.Component {
  render() {
    return (
      <div>
        <Table ProjectNo={this.props.ProjectNo} />
        <hr />
      </div>
    );
  }
}

export default Content;
