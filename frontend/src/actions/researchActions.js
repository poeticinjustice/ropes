import axios from 'axios'
import {
  RESEARCH_LIST_REQUEST,
  RESEARCH_LIST_SUCCESS,
  RESEARCH_LIST_FAIL,
  RESEARCH_CREATE_REQUEST,
  RESEARCH_CREATE_SUCCESS,
  RESEARCH_CREATE_FAIL,
  RESEARCH_DETAILS_REQUEST,
  RESEARCH_DETAILS_SUCCESS,
  RESEARCH_DETAILS_FAIL,
} from '../constants/researchConstants'
import { logout } from './userActions'

export const listResearch = () => async (dispatch) => {
  try {
    dispatch({ type: RESEARCH_LIST_REQUEST })

    const { data } = await axios.get('/api/research')

    dispatch({
      type: RESEARCH_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RESEARCH_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listResearchDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: RESEARCH_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/research/${id}`)

    dispatch({
      type: RESEARCH_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RESEARCH_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createResearch =
  (personId, research) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RESEARCH_CREATE_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.post(`/api/persons/${personId}/research`, research, config)

      dispatch({
        type: RESEARCH_CREATE_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: RESEARCH_CREATE_FAIL,
        payload: message,
      })
    }
  }
