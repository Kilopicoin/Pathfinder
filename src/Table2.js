import React from "react";
import "./App.css";
class Table2 extends React.Component {
  render() {
    return (
      <table className="table" id="table-2">
        <thead>
        <tr className="trx" id="altbaslik">
          <th className="th">Video</th>
          <th className="th">Burnt</th>
        </tr>
        </thead>
        <tbody>
          {this.props.ProjectNo2.map((Project2) => {
            return (
 
                <tr className="cikti" key={Project2.id}>
                  <td className="ortaİcerik" id="videolink">
                    <a
                      href={Project2.link}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {Project2.name}
                    </a>
                  </td>
                  <td className="vauleTablo">
                      {Project2.burntShow}
                  </td>
                </tr>

            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table2;
