import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PLAYER = 'GET_PLAYER'
const REMOVE_PLAYER = 'REMOVE_PLAYER'

/**
 * INITIAL STATE
 */
const defaultPlayer = {}

/**
 * ACTION CREATORS
 */
const getPlayer = player => ({type: GET_PLAYER, player})
const removePlayer = () => ({type: REMOVE_PLAYER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getPlayer(res.data || defaultPlayer))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (username, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {username, password})
  } catch (authError) {
    return dispatch(getPlayer({error: authError}))
  }

  try {
    dispatch(getPlayer(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removePlayer())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultPlayer, action) {
  switch (action.type) {
    case GET_PLAYER:
      return action.player
    case REMOVE_PLAYER:
      return defaultPlayer
    default:
      return state
  }
}
