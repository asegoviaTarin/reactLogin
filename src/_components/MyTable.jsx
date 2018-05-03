import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';

class MyTable extends Component {
  constructor(props){
    super(props);
    this.state = {size: 3}
    this.columns = [{
      dataField: 'name',
      text: 'Nombre'
    }, {
      dataField: 'y',
      text: 'Rate'
    }, {
      dataField: 'likes',
      text: 'Likes'
    }];

    this.products = []
    
  }
  render(){
    let rows = [];
    for (var i = 0; i < this.state.size; i++){
      let rowID = `row${i}`
      let cell = []
      for (var idx = 0; idx < this.state.size; idx++){
        let cellID = `cell${i}-${idx}`
        cell.push(<td key={cellID} id={cellID}></td>)
      }
      rows.push(<tr key={i} id={rowID}>{cell}</tr>)
    }
    return(
      <BootstrapTable keyField='name' data={ this.props.products } columns={ this.columns } />
    )
  }
}

export default MyTable;