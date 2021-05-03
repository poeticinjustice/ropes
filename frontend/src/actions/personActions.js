import axios from 'axios'
import {
  PERSON_LIST_REQUEST,
  PERSON_LIST_SUCCESS,
  PERSON_LIST_FAIL,
  PERSON_DETAILS_REQUEST,
  PERSON_DETAILS_SUCCESS,
  PERSON_DETAILS_FAIL,
} from '../constants/personConstants'

export const listPersons = () => async (dispatch) => {
  try {
    dispatch({ type: PERSON_LIST_REQUEST })

    const { data } = await axios.get('/api/persons')

    dispatch({
      type: PERSON_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PERSON_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listPersonDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PERSON_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/persons/${id}`)

    dispatch({
      type: PERSON_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PERSON_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
