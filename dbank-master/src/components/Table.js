import React from "react";
import "./Appx.css";

class Table extends React.Component {
  render() {
    return (
      <table className="table" id="table">
        <thead className="thead">
          <tr className="trx">
            <th>No</th>
            <th>Project</th>
            <th>Vote</th>
          </tr>
        </thead>
        <tbody>
          {this.props.ProjectNo.map((Project) => {
            return (
              <tr key={Project.id.toString()}>
                <th>{Project.id}</th>
                <td>{Project.name}</td>
                <td>{Project.voted}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;
