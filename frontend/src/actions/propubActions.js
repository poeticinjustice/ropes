import axios from 'axios'
import {
  PROPUB_DETAILS_REQUEST,
  PROPUB_DETAILS_SUCCESS,
  PROPUB_DETAILS_FAIL,
} from '../constants/propubConstants'

export const getPropubMemberDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROPUB_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/propub/${id}`)

    dispatch({
      type: PROPUB_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PROPUB_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
