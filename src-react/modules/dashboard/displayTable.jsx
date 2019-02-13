import React from 'react'
import { connect } from 'react-redux'
import { ipcSendAction } from '../../redux/actions/index'
import { Table } from '../../components/dashboard/Table'

class TableContainer extends React.Component {
  render () {
    return (
        <Table {...this.props} />
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
    action: (obj) => { dispatch(ipcSendAction('action', obj)) },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContainer)
