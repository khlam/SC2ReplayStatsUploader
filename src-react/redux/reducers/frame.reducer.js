import { combineReducers } from 'redux'

const configData = { "hash":"", "replayPath":"" }
const config = (state = configData, action) => {
  switch (action.type) {
    case 'modConfig':
      return action.data
    default:
      return state
  }
}

export const frame = combineReducers({
  config
})
