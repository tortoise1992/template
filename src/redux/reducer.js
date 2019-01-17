import { combineReducers } from "redux"

import loadingReducer from './reducers/loadingReducer'
import loginReducer from './reducers/loginReducer'
import breadcrumbReducer from './reducers/breadcrumbReducer'
export default combineReducers({
  loadingReducer,
  loginReducer,
  breadcrumbReducer,
})