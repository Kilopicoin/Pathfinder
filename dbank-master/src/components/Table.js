import React from "react";
import "./Appx.css";

class Table extends React.Component {
  render() {
    return (
      <table className="table" id="table-1">
        <tr className="trx">
          <th className="th">No</th>
          <th className="th">Project Request</th>
          <th className="th">Total Vote</th>
        </tr>
        <tbody>
          {this.props.ProjectNo.map((Project) => {
            return (
              <div className="cikti">
                <tr className="aaa" key={Project.id.toString()}>
                  <th className="id">{Project.id}</th>
                  <td className="ortaİcerik">{Project.name}</td>
                  <td className="vauleTablo">{Project.voted} Lop</td>
                </tr>
              </div>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;
