import {
  PERSON_LIST_REQUEST,
  PERSON_LIST_SUCCESS,
  PERSON_LIST_FAIL,
  PERSON_DETAILS_REQUEST,
  PERSON_DETAILS_SUCCESS,
  PERSON_DETAILS_FAIL,
  PERSON_DELETE_SUCCESS,
  PERSON_DELETE_REQUEST,
  PERSON_DELETE_FAIL,
  PERSON_CREATE_RESET,
  PERSON_CREATE_FAIL,
  PERSON_CREATE_SUCCESS,
  PERSON_CREATE_REQUEST,
  PERSON_UPDATE_REQUEST,
  PERSON_UPDATE_SUCCESS,
  PERSON_UPDATE_FAIL,
  PERSON_UPDATE_RESET,
  PERSON_CREATE_RESEARCH_POST_REQUEST,
  PERSON_CREATE_RESEARCH_POST_SUCCESS,
  PERSON_CREATE_RESEARCH_POST_FAIL,
  PERSON_CREATE_RESEARCH_POST_RESET,
} from '../constants/personConstants'

export const personListReducer = (state = { persons: [] }, action) => {
  switch (action.type) {
    case PERSON_LIST_REQUEST:
      return { loading: true, persons: [] }
    case PERSON_LIST_SUCCESS:
      return {
        loading: false,
        persons: action.payload.persons,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case PERSON_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const personDetailsReducer = (
  state = { person: { researchPosts: [] } },
  action
) => {
  switch (action.type) {
    case PERSON_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PERSON_DETAILS_SUCCESS:
      return { loading: false, person: action.payload }
    case PERSON_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const personDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PERSON_DELETE_REQUEST:
      return { loading: true }
    case PERSON_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PERSON_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const personCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PERSON_CREATE_REQUEST:
      return { loading: true }
    case PERSON_CREATE_SUCCESS:
      return { loading: false, success: true, person: action.payload }
    case PERSON_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PERSON_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const personUpdateReducer = (state = { person: {} }, action) => {
  switch (action.type) {
    case PERSON_UPDATE_REQUEST:
      return { loading: true }
    case PERSON_UPDATE_SUCCESS:
      return { loading: false, success: true, person: action.payload }
    case PERSON_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PERSON_UPDATE_RESET:
      return { person: {} }
    default:
      return state
  }
}

export const personResearchPostCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PERSON_CREATE_RESEARCH_POST_REQUEST:
      return { loading: true }
    case PERSON_CREATE_RESEARCH_POST_SUCCESS:
      return { loading: false, success: action.payload }
    case PERSON_CREATE_RESEARCH_POST_FAIL:
      return { loading: false, error: action.payload }
    case PERSON_CREATE_RESEARCH_POST_RESET:
      return {}
    default:
      return state
  }
}
