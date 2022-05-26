import axios, { AxiosError } from "axios"
import _ from "lodash"
import { RootStateOrAny } from "react-redux"
import { Dispatch } from "redux"
import { DATA_REQUEST, DATA_SUCCESS, DATA_FAIL, SENSORS_REQUEST, SENSORS_SUCCESS, SENSORS_FAIL, DEVICES_SUCCESS, DEVICES_REQUEST, DEVICES_FAIL, } from "../constants/dataConstants"

export interface SensorChild {
    name: string
    unit: string
}

export interface SensorParent {
    rowKey: number
    sensors: SensorChild[]
}

export const getData = () => async (dispatch: Dispatch, getState: RootStateOrAny) => {

    const begin = new Date().getTime()


    const {
        dateRange: { dateRange },
    } = getState()

    const start = dateRange[0].getTime()
    const end = dateRange[1].getTime()


    try {
        dispatch({ type: DATA_REQUEST })

        const { data } = await axios.get(`/api/data/${start}/${end}`)

        console.log(data)

        // dispatch({
        //     type: DATA_SUCCESS,
        //     payload: data,
        // })


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


export const getSensors = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: SENSORS_REQUEST })

        const {
            data
        } = await axios.get(`/api/sensors`)

        const payload = []

        for (let x of data) {
            let sensor: SensorParent = {
                rowKey: x.SensorTypeID,
                sensors: []
            }

            for (let i = 1; i <= x.NumberOfSensors; i++) {

                const obj = {
                    name: x[`Sensor${i}Name`],
                    unit: x[`Sensor${i}Units`],
                }

                sensor.sensors.push(obj)
            }
            payload.push(sensor)
        }

        dispatch({
            type: SENSORS_SUCCESS,
            payload: payload,
        })
    } catch (error) {
        const err = error as AxiosError

        dispatch({
            type: SENSORS_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}


export const getDevices = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: DEVICES_REQUEST })

        const {
            data
        } = await axios.get(`/api/devices`)

        console.log(data)

        dispatch({
            type: DEVICES_SUCCESS,
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
