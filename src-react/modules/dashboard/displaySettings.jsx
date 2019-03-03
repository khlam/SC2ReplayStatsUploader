import React from 'react'
import { connect } from 'react-redux'
import { ipcSendAction } from '../../redux/actions/index'
import { Settings } from '../../components/dashboard/Settings'

class SettingsContainer extends React.Component {
  render () {
    return (
        <Settings {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    config: state.frame.config
  }
}

// mix of dispatch and non dispatch functions
const mapDispatchToProps = (dispatch) => {
  return {
    onModConfig: (configObj) => { dispatch(ipcSendAction('onModConfig', configObj)) },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsContainer)
