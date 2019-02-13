import React from 'react'
import { connect } from 'react-redux'
import DisplayTable from '../modules/dashboard/displayTable'

export class Dashboard extends React.Component {
  render () {
    return (
        <div className="row">
            <DisplayTable />
        </div>
    )
  }
}

export default connect(
    null, null
)(Dashboard)