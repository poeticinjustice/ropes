import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  personListReducer,
  personDetailsReducer,
  personDeleteReducer,
  personCreateReducer,
  personUpdateReducer,
} from './reducers/personReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  researchListReducer,
  researchCreateReducer,
} from './reducers/researchReducers'

const reducer = combineReducers({
  personList: personListReducer,
  personDetails: personDetailsReducer,
  personDelete: personDeleteReducer,
  personCreate: personCreateReducer,
  personUpdate: personUpdateReducer,
  researchCreate: researchCreateReducer,
  researchList: researchListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
