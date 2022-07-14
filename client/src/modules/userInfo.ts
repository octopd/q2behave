import axios, { AxiosError } from 'axios'
import { Action, Dispatch } from 'redux'

interface ActionWithPayload<T> extends Action {
    payload: T
}

const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL'
const USER_LOGOUT = 'USER_LOGOUT'
const USER_LOGOUT_RESET = 'USER_LOGOUT_RESET'

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            '/api/user/signin',
            { email, password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (err) {
        const error = err as AxiosError

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data
        })
    }
}

export const logout = () => (dispatch: Dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}

export const initialState: {} = {}

export const userLoginReducer = (
    state = {},
    action: ActionWithPayload<boolean | string>
) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return { userLoggedOut: true }
        case USER_LOGOUT_RESET:
            return { userLoggedOut: false }
        default:
            return state
    }
}