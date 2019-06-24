import { createStore, combineReducers, applyMiddleware } from 'redux'
import {company} from './reducer'
const rootReducer = combineReducers({
    'company':company()
})
const store=new createStore(rootReducer)
export default store