import {
  RESEARCH_LIST_REQUEST,
  RESEARCH_LIST_SUCCESS,
  RESEARCH_LIST_FAIL,
  RESEARCH_DETAILS_REQUEST,
  RESEARCH_DETAILS_SUCCESS,
  RESEARCH_DETAILS_FAIL,
  RESEARCH_CREATE_REQUEST,
  RESEARCH_CREATE_SUCCESS,
  RESEARCH_CREATE_FAIL,
  RESEARCH_CREATE_RESET,
  RESEARCH_UPDATE_REQUEST,
  RESEARCH_UPDATE_SUCCESS,
  RESEARCH_UPDATE_RESET,
  RESEARCH_UPDATE_FAIL,
  RESEARCH_DELETE_REQUEST,
  RESEARCH_DELETE_SUCCESS,
  RESEARCH_DELETE_FAIL,
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

export const researchUpdateReducer = (state = { research: {} }, action) => {
  switch (action.type) {
    case RESEARCH_UPDATE_REQUEST:
      return { loading: true }
    case RESEARCH_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case RESEARCH_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case RESEARCH_UPDATE_RESET:
      return { research: {} }
    default:
      return state
  }
}

export const researchDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case RESEARCH_DELETE_REQUEST:
      return { loading: true }
    case RESEARCH_DELETE_SUCCESS:
      return { loading: false, success: true }
    case RESEARCH_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
