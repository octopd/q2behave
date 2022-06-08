import { composeWithDevTools } from '@redux-devtools/extension'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { dataReducer, dataSourcesReducer, dataTypesReducer, dateRangeReducer, devicesReducer, hotButtonReducer, zoomReducer } from './reducers/dataReducer'

const reducer = combineReducers({
    data: dataReducer,
    dataSources: dataSourcesReducer,
    dataTypes: dataTypesReducer,
    devices: devicesReducer,
    dateRange: dateRangeReducer,
    hotButton: hotButtonReducer,
    zoom: zoomReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
