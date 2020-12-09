import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class ResultsTable extends Component {

  cellButton(cell, row, enumObject, rowIndex) {
    return (
       <button className="btn btn-primary" onClick={() => this.props.chooseCampsite(row.id)}>See Details</button>
    )
  }

  imageFormatter(cell, row){
    return (
      <img src={cell} onClick={() => this.props.chooseCampsite(row.id)}/>
    )
  }

  render() {
    const options = {
      noDataText: 'No campsites are available based on your current choices.  Try adjusting your filters for more options.'
    };
    return (
      <div className='results-preview'>
        <BootstrapTable data={this.props.filtered} options={options}>
          <TableHeaderColumn isKey={true} dataField='id' hidden={true} > ID </TableHeaderColumn>
          <TableHeaderColumn dataField="image_url" dataFormat={this.imageFormatter.bind(this)} width='21%'>Preview</TableHeaderColumn>
          <TableHeaderColumn dataField='name' width='13%'> Name </TableHeaderColumn>
          <TableHeaderColumn dataField='description' > Description </TableHeaderColumn>
          <TableHeaderColumn dataField='button' dataFormat={this.cellButton.bind(this)} width='15%'>Reserve</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

export default ResultsTable