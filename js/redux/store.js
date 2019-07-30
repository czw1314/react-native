import { createStore, combineReducers, applyMiddleware } from 'redux'
import {company,companyList} from './reducer'
const rootReducer = combineReducers({
    company,
    companyList
})
const store=new createStore(rootReducer)
export default store