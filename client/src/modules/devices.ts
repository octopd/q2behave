import axios, { AxiosError } from "axios"
import { Action, Dispatch } from "redux"

const DEVICES_REQUEST = 'DEVICES_REQUEST'
const DEVICES_SUCCESS = 'DEVICES_SUCCESS'
const DEVICES_FAIL = 'DEVICES_FAIL'
const DATA_SOURCES_FILTERED = 'DATA_SOURCES_FILTERED'

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

export const getDevices = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: DEVICES_REQUEST })

        const {
            data
        } = await axios.get(`/api/data/devices`)

        dispatch({
            type: DEVICES_SUCCESS,
            payload: data,
        })

        dispatch({
            type: DATA_SOURCES_FILTERED,
            payload: data,
        })

    } catch (error) {
        const err = error as AxiosError

        dispatch({
            type: DEVICES_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const initialState: {} = {}

export const devicesReducer = (
    state = { devices: [], loading: false },
    action: ActionWithPayload<any> //TODO: Define type here...
) => {
    switch (action.type) {
        case DEVICES_REQUEST:
            return { loading: true, success: false }
        case DEVICES_SUCCESS:
            return { ...state, loading: false, success: true, devices: action.payload }
        case DEVICES_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
