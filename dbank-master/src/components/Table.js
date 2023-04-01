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
              <div className="cikti">
                <tr className="aaa" key={Project.id.toString()}>
                  <th className="id">{Project.id}</th>
                  <td className="ortaİcerik">{Project.name}</td>
                  <td className="vauleTablo">{Project.voted}</td>
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
