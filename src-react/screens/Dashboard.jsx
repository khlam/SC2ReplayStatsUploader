import React from 'react'
import { connect } from 'react-redux'
import SettingsContainer from '../modules/dashboard/displaySettings'

export class Dashboard extends React.Component {
  render () {
    return (
        <div className="row">
            <SettingsContainer />
        </div>
    )
  }
}

export default connect(
    null, null
)(Dashboard)