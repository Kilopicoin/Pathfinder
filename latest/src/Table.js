import React from "react";
import "./App.css";

class Table extends React.Component {
  render() {
    return (
      <table className="table" id="table-1">
        <thead>
        <tr className="trx">
          <th className="th" id="numera">
            No
          </th>
          <th className="th">Project Request</th>
          <th className="th">Vote</th>
        </tr>
        </thead>
        <tbody>
          {this.props.ProjectNo.map((Project) => {
            return (

                <tr className="cikti" key={Project.id}>
                  <td className="id">{Project.id}</td>
                  <td className="ortaİcerik">{Project.name}</td>
                  <td className="vauleTablo">{Project.votedShow}</td>
                </tr>

            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;

