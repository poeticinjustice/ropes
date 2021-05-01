import {
  PERSON_LIST_REQUEST,
  PERSON_LIST_SUCCESS,
  PERSON_LIST_FAIL,
} from '../constants/personConstants'

export const personListReducer = (state = { persons: [] }, action) => {
  switch (action.type) {
    case PERSON_LIST_REQUEST:
      return { loading: true, persons: [] }
    case PERSON_LIST_SUCCESS:
      return { loading: false, persons: action.payload }
    case PERSON_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
