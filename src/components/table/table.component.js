import React from "react";

/**
 * Component renders receiving data as a table
 *
 * @param {array} data Receiving data
 * @param {function} handleClick Callback for sort data
 */

function Table(props) {
  const handleClick = e => {
    props.handleColClick(e.target.innerHTML);
  };
  if (!!props.data.length) {
    const filteredData = props.data.map(element =>
      Object.entries(element).filter(el => !(typeof el[1] === "object"))
    );

    return (
      <table>
        <thead>
          <tr>
            {filteredData[0].map((element, index) => (
              <td key={index} onClick={handleClick}>
                {element[0]}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((rows, index) => (
            <tr key={index}>
              {rows.map((cell, index) => (
                <td key={index}>{cell[1]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return <div className="noData">NO DATA</div>;
}

export default Table;
