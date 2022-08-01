import axios, { AxiosError } from 'axios'
import { RootStateOrAny } from 'react-redux'
import { Action, Dispatch } from 'redux'

interface ActionWithPayload<T> extends Action {
    payload: T
}

export interface File {
    name: string
    properties: {
        contentLength: number
    }
}

export interface Directory {
    name: string
    size: number
    files: File[]
}

const FILE_DIR_LIST_REQUEST = 'FILE_DIR_LIST_REQUEST'
const FILE_DIR_LIST_SUCCESS = 'FILE_DIR_LIST_SUCCESS'
const FILE_DIR_LIST_FAIL = 'FILE_DIR_LIST_FAIL'
export const FILE_DIR_LIST_RESET = 'FILE_DIR_LIST_RESET'
export const FILE_SELECTED_LIST_REQUEST = 'FILE_SELECTED_LIST_REQUEST'
export const FILE_SELECTED_LIST_RESET = 'FILE_SELECTED_LIST_RESET'

export const getFileDirectories = () => async (dispatch: Dispatch, getState: RootStateOrAny) => {
    try {
        dispatch({ type: FILE_DIR_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get(
            '/api/storage/directories',
            config
        )

        dispatch({
            type: FILE_DIR_LIST_SUCCESS,
            payload: data,
        })

    } catch (err) {
        const error = err as AxiosError

        dispatch({
            type: FILE_DIR_LIST_FAIL,
            payload: error.response && error.response.data
        })
    }
}

export const initialState: { loading: boolean, success: boolean, error: string, selected: string[] } = {
    loading: false, success: false, error: "", selected: []
}

export const storageReducer = (
    state = initialState,
    action: ActionWithPayload<any>
) => {
    switch (action.type) {
        case FILE_DIR_LIST_REQUEST:
            return { ...state, loading: true, }
        case FILE_DIR_LIST_SUCCESS:
            return { ...state, loading: false, success: true, directories: action.payload }
        case FILE_DIR_LIST_FAIL:
            return { ...state, loading: false, error: action.payload }
        case FILE_DIR_LIST_RESET:
            return {}
        default:
            return state
    }
}

export const filesSelectedReducer = (
    state = initialState,
    action: ActionWithPayload<string[]>
) => {
    switch (action.type) {
        case FILE_SELECTED_LIST_REQUEST:
            return { selected: action.payload, }
        case FILE_SELECTED_LIST_RESET:
            return { selected: [] }
        default:
            return state
    }
}
