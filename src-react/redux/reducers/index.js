import { combineReducers } from 'redux'
import { frame } from './frame.reducer'
import { ipc } from './ipc.reducer'

export default combineReducers({
  frame,
  ipc
})
