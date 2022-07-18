import axios, { AxiosError } from "axios"
import _ from "lodash"
import { RootStateOrAny } from "react-redux"
import { Action, Dispatch } from "redux"
import { DataType, dataTypesList } from "../components/DataControls/DataTypeSelector"
import { axisYIndex } from "../helpers/axisYIndex"
import { assignColor } from "../helpers/colorHelper"
import { convertGMTToEST } from "../helpers/convertGMTToEST"
import { assignMarker } from "../helpers/markerTypeHelper"

export const DATA_REQUEST = 'DATA_REQUEST'
export const DATA_SUCCESS = 'DATA_SUCCESS'
export const DATA_FAIL = 'DATA_FAIL'
export const DATA_SETS = 'DATA_SETS'
export const DATA_SOURCES = 'DATA_SOURCES'
export const DATA_SOURCES_FILTERED = 'DATA_SOURCES_FILTERED'
export const DATA_TYPES = 'DATA_TYPES'
export const DATA_TYPES_FILTERED = 'DATA_TYPES_FILTERED'
export const DATA_RESET = 'DATA_RESET'

export interface DataPoint {
    x: number
    y: number
}

export interface DataSet {
    name: string
    deviceID: string
    dataType: string
    dataPoints: DataPoint[],
    showInLegend: boolean,
    color: string,
    markerType: string
    axisYIndex: number
}

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

export const getData = () => async (dispatch: Dispatch, getState: RootStateOrAny) => {

    const begin = new Date().getTime()

    const {
        userLogin: { userInfo },
        dateRange: { dateRange },
    } = getState()

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
        },
    }

    const start = convertGMTToEST(dateRange[0]).getTime()
    const end = convertGMTToEST(dateRange[1]).getTime()

    try {
        dispatch({ type: DATA_REQUEST })

        const { data } = await axios.get(`/api/data/${start}/${end}`, config)

        const formattedData = data.map((x: DataSet, index: number) => ({
            ...x,
            color: assignColor(),
            markerType: assignMarker(x.deviceID),
            type: 'spline',
            axisYIndex: axisYIndex(x.name)
        }))

        dispatch({
            type: DATA_SUCCESS,
            payload: formattedData,
        })

        if (data) {
            console.log(_.round(((new Date().getTime() - begin) / 1000), 2) + " seconds to finish...")
        }

    } catch (error) {
        const err = error as AxiosError

        dispatch({
            type: DATA_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const initialState: {} = {}

export const dataReducer = (
    state = { data: [], dataSets: [], dataSources: [], loading: false },
    action: ActionWithPayload<DataSet[]>
) => {
    switch (action.type) {
        case DATA_REQUEST:
            return { ...state, loading: true, success: false }
        case DATA_SUCCESS:
            return { ...state, loading: false, success: true, data: action.payload, dataSets: Object.keys(action.payload) }
        case DATA_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const dataSourcesReducer = (
    state = { dataSources: [], filteredDataSources: [], },
    action: ActionWithPayload<string[]>
) => {
    switch (action.type) {
        case DATA_SOURCES:
            return { ...state, dataSources: action.payload, filteredDataSources: action.payload }
        case DATA_SOURCES_FILTERED:
            return { ...state, filteredDataSources: action.payload.sort() }
        default:
            return state
    }
}

export const dataTypesReducer = (
    state = { dataTypes: dataTypesList, filteredDataTypes: dataTypesList, },
    action: ActionWithPayload<DataType[]>
) => {
    switch (action.type) {
        case DATA_TYPES:
            return { ...state, dataTypes: action.payload, filteredDataTypes: action.payload }
        case DATA_TYPES_FILTERED:
            return { ...state, filteredDataTypes: action.payload }
        default:
            return state
    }
}
