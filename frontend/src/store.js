import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  personListReducer,
  personDetailsReducer,
  personDeleteReducer,
  personCreateReducer,
  personUpdateReducer,
  personUpdateFromPropubReducer,
  personResearchListReducer,
} from './reducers/personReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userResearchListReducer,
} from './reducers/userReducers'
import {
  researchListReducer,
  researchDetailsReducer,
  researchCreateReducer,
  researchUpdateReducer,
  researchDeleteReducer,
} from './reducers/researchReducers'
import { propubMemberDetailsReducer } from './reducers/propubReducers'

const reducer = combineReducers({
  propubMemberDetails: propubMemberDetailsReducer,
  personList: personListReducer,
  personDetails: personDetailsReducer,
  personDelete: personDeleteReducer,
  personCreate: personCreateReducer,
  personUpdate: personUpdateReducer,
  personUpdateFromPropub: personUpdateFromPropubReducer,
  personResearchList: personResearchListReducer,
  researchCreate: researchCreateReducer,
  researchList: researchListReducer,
  researchDetails: researchDetailsReducer,
  researchUpdate: researchUpdateReducer,
  researchDelete: researchDeleteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userResearchList: userResearchListReducer,
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
