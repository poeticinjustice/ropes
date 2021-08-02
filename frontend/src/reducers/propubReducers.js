import {
  PROPUB_DETAILS_REQUEST,
  PROPUB_DETAILS_SUCCESS,
  PROPUB_DETAILS_FAIL,
} from '../constants/propubConstants'

export const propubMemberDetailsReducer = (state = { member: {} }, action) => {
  switch (action.type) {
    case PROPUB_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PROPUB_DETAILS_SUCCESS:
      return { loading: false, member: action.payload }
    case PROPUB_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
