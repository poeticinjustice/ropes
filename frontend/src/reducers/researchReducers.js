import {
  RESEARCH_LIST_REQUEST,
  RESEARCH_LIST_SUCCESS,
  RESEARCH_LIST_FAIL,
  RESEARCH_CREATE_REQUEST,
  RESEARCH_CREATE_SUCCESS,
  RESEARCH_CREATE_FAIL,
  RESEARCH_CREATE_RESET,
  RESEARCH_DETAILS_REQUEST,
  RESEARCH_DETAILS_SUCCESS,
  RESEARCH_DETAILS_FAIL,
} from '../constants/researchConstants'

export const researchListReducer = (state = { research: [] }, action) => {
  switch (action.type) {
    case RESEARCH_LIST_REQUEST:
      return { loading: true }
    case RESEARCH_LIST_SUCCESS:
      return {
        loading: false,
        research: action.payload,
      }
    case RESEARCH_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const researchDetailsReducer = (state = { research: {} }, action) => {
  switch (action.type) {
    case RESEARCH_DETAILS_REQUEST:
      return { ...state, loading: true }
    case RESEARCH_DETAILS_SUCCESS:
      return { loading: false, research: action.payload }
    case RESEARCH_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const researchCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RESEARCH_CREATE_REQUEST:
      return {}
    case RESEARCH_CREATE_SUCCESS:
      return { loading: false, success: true }
    case RESEARCH_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case RESEARCH_CREATE_RESET:
      return {}
    default:
      return state
  }
}
