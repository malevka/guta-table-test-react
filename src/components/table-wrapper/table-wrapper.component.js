import React from "react";
import Table from "../table/table.component";
class TableWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 1,
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
    this.getData(this.state.limit);
  }

  getData(limit) {
    return fetch(`${this.props.url}?_limit=${limit}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ data: json }, this.sortData);
      });
  }

  handleButtonClick() {
    const limit = this.state.limit + 1;
    this.getData(limit);
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
    const sortedTable = !!this.state.sorted.data.length && (
      <Table
        name={"ss"}
        data={this.state.sorted.data}
        handleColClick={this.sortData.bind(this)}
      />
    );
    const filteredTable = !!this.state.filtered.data.length && (
      <Table
        name={"ff"}
        data={this.state.filtered.data}
        handleColClick={this.sortData.bind(this)}
      />
    );
    const commonTable = !!this.state.data.length && (
      <Table
        name={"cc"}
        data={this.state.data}
        handleColClick={this.sortData.bind(this)}
      />
    );
    return (
      <div className="TableWrapper">
        <label>Filter by {this.state.filtered.field}: </label>
        <input
          type="text"
          onChange={this.filterData.bind(this)}
          value={this.state.filtered.value}
        />
        <button onClick={this.handleButtonClick.bind(this)}>More</button>

        {filteredTable}
        {sortedTable}
        {commonTable}
      </div>
    );
  }
}

export default TableWrapper;
