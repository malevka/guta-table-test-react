import React from "react";
import Table from "../table/table.component";
import getData from "../../lib/getData";

/**
 * TableWrapper component which loads, sorts and filters data
 *
 *
 * @component
 */

class TableWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      limitIncrement: 10,
      data: [],
      filtered: {
        data: [],
        field: this.props.filter,
        value: ""
      },
      sorted: {
        data: [],
        field: null,
        order: "asc"
      }
    };
  }

  componentDidMount() {
    getData(`${this.props.url}${this.state.limit}`)
      .then(json => {
        this.setState({ data: json });
      })
      .then(() => this.sortData());
    /* this.getData(this.state.limit); */
  }

  /* getData(limit) {
    return fetch(`${this.props.url}${limit}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ data: json }, this.sortData);
      });
  } */

  handleButtonClick() {
    const limit = this.state.limit + this.state.limitIncrement;
    getData(`${this.props.url}${limit}`)
      .then(json => {
        this.setState({ data: json });
      })
      .then(() => this.sortData());
    this.setState({ limit: limit });
  }

  filterData(e) {
    const data = this.state.sorted.data.slice();
    const value = e ? e.target.value : this.state.filtered.value;
    let filtered;
    if (!!value) {
      filtered = data.filter(
        element => element[this.state.filtered.field] == value
      );
    } else {
      filtered = data;
    }
    const filter = { ...this.state.filtered, value: value, data: filtered };
    this.setState({ filtered: filter });
  }
  sortData(field) {
    const data = this.state.data.slice();
    const sortField = field ? field : this.state.sorted.field;
    const compare = (a, b) => {
      const order = this.state.sorted.order === "asc" ? 1 : -1;
      if (a[sortField] > b[sortField]) {
        return 1 * order;
      }
      if (a[sortField] < b[sortField]) {
        return -1 * order;
      }
      return 0;
    };
    let newOrder = this.state.sorted.order;
    if (!!field) {
      newOrder = newOrder === "asc" ? "desc" : "asc";
    }
    let sorted;
    if (!!sortField) {
      sorted = { data: data.sort(compare), field: sortField, order: newOrder };
    } else {
      sorted = { ...this.state.sorted, data: data };
    }
    this.setState({ sorted: sorted }, this.filterData);
  }

  render() {
    const sortedTable = (
      <Table
        data={this.state.sorted.data}
        handleColClick={this.sortData.bind(this)}
      />
    );
    const filteredTable = (
      <Table
        data={this.state.filtered.data}
        handleColClick={this.sortData.bind(this)}
      />
    );
    const originalTable = (
      <Table data={this.state.data} handleColClick={this.sortData.bind(this)} />
    );
    return (
      <div className="TableWrapper">
        <div className="panel">
          <label>Search by {this.state.filtered.field}: </label>
          <input
            type="text"
            onChange={this.filterData.bind(this)}
            value={this.state.filtered.value}
          />
          <button onClick={this.handleButtonClick.bind(this)}>More</button>
        </div>
        <div className="tableList">
          {filteredTable}
          {/* 
        {sortedTable}
        
        {originalTable} */}
        </div>
      </div>
    );
  }
}

export default TableWrapper;
