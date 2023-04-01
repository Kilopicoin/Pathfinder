import React from "react";
import "./Appx.css";
class Table2 extends React.Component {
  render() {
    return (
      <table className="table" id="table-2">
        <tr className="trx">
          <th className="th">No</th>
          <th className="th">Video</th>
          <th className="th">Burnt</th>
        </tr>
        <tbody>
          {this.props.ProjectNo2.map((Project2) => {
            return (
              <div className="cikti">
                <tr key={Project2.id.toString()}>
                  <th className="id">{Project2.id}</th>
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
                    <a
                      href={Project2.linktx}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {Project2.burnt}
                    </a>
                  </td>
                </tr>
              </div>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table2;
