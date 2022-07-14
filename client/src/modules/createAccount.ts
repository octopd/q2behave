import axios, { AxiosError } from 'axios'
import { RootStateOrAny } from 'react-redux'
import { Action, Dispatch } from 'redux'
import { NewUserValues } from '../components/CreateAccount/CreateAccount'

interface ActionWithPayload<T> extends Action {
    payload: T
}

const USER_CREATE_REQUEST = 'USER_CREATE_REQUEST'
const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS'
const USER_CREATE_FAIL = 'USER_CREATE_FAIL'
export const USER_CREATE_RESET = 'USER_CREATE_RESET'

export const createAccount = (values: NewUserValues) => async (dispatch: Dispatch, getState: RootStateOrAny) => {
    try {
        dispatch({ type: USER_CREATE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(
            '/api/user/signup',
            values,
            config
        )

        dispatch({
            type: USER_CREATE_SUCCESS,
            payload: data,
        })

    } catch (err) {
        const error = err as AxiosError

        dispatch({
            type: USER_CREATE_FAIL,
            payload: error.response && error.response.data
        })
    }
}

export const initialState: { loading: boolean, success: boolean, error: string } = {
    loading: false, success: false, error: ""
}

export const userCreateReducer = (
    state = initialState,
    action: ActionWithPayload<string>
) => {
    switch (action.type) {
        case USER_CREATE_REQUEST:
            return { ...state, loading: true, }
        case USER_CREATE_SUCCESS:
            return { ...state, loading: false, success: true }
        case USER_CREATE_FAIL:
            return { ...state, loading: false, error: action.payload }
        case USER_CREATE_RESET:
            return { ...state, loading: false, success: false }
        default:
            return state
    }
}
