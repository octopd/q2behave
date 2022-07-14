import axios, { AxiosError } from 'axios'
import { Action, Dispatch } from 'redux'

interface ActionWithPayload<T> extends Action {
    payload: T
}

const USER_RESET_LINK_REQUEST = 'USER_RESET_LINK_REQUEST'
const USER_RESET_LINK_SUCCESS = 'USER_RESET_LINK_SUCCESS'
const USER_RESET_LINK_FAIL = 'USER_RESET_LINK_FAIL'
export const USER_RESET_LINK_RESET = 'USER_RESET_LINK_RESET'
const USER_RESET_PASSWORD_REQUEST = 'USER_RESET_PASSWORD_REQUEST'
const USER_RESET_PASSWORD_SUCCESS = 'USER_RESET_PASSWORD_SUCCESS'
const USER_RESET_PASSWORD_FAIL = 'USER_RESET_PASSWORD_FAIL'
export const USER_RESET_PASSWORD_RESET = 'USER_RESET_PASSWORD_RESET'

export const sendResetPasswordLink = (email: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: USER_RESET_LINK_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            '/api/user/send-reset-link',
            { email },
            config
        )

        dispatch({
            type: USER_RESET_LINK_SUCCESS,
            payload: data,
        })

    } catch (err) {
        const error = err as AxiosError

        dispatch({
            type: USER_RESET_LINK_FAIL,
            payload: error.response && error.response.data
        })
    }
}


export const resetUserPassword = (password: string, code: string | undefined) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: USER_RESET_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            '/api/user/reset-password',
            { password, code },
            config
        )

        dispatch({
            type: USER_RESET_PASSWORD_SUCCESS,
            payload: data,
        })

    } catch (err) {
        const error = err as AxiosError

        console.log(error.response)

        dispatch({
            type: USER_RESET_PASSWORD_FAIL,
            payload: error.response && error.response.data
        })
    }
}

export const initialState: { loading: boolean, success: boolean, error: string } = {
    loading: false, success: false, error: ""
}

export const resetPasswordLinkReducer = (
    state = initialState,
    action: ActionWithPayload<string>
) => {
    switch (action.type) {
        case USER_RESET_LINK_REQUEST:
            return { ...state, loading: true, }
        case USER_RESET_LINK_SUCCESS:
            return { ...state, loading: false, success: true }
        case USER_RESET_LINK_FAIL:
            return { ...state, loading: false, error: action.payload }
        case USER_RESET_LINK_RESET:
            return { ...state, loading: false, success: false }
        default:
            return state
    }
}

export const resetUserPasswordReducer = (
    state = initialState,
    action: ActionWithPayload<string>
) => {
    switch (action.type) {
        case USER_RESET_PASSWORD_REQUEST:
            return { ...state, loading: true, }
        case USER_RESET_PASSWORD_SUCCESS:
            return { ...state, loading: false, success: true }
        case USER_RESET_PASSWORD_FAIL:
            return { ...state, loading: false, error: action.payload }
        case USER_RESET_PASSWORD_RESET:
            return { ...state, loading: false, success: false }
        default:
            return state
    }
}
