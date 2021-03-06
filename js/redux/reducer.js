function company(state={companyName:'',monitorID:''},action) {
    switch (action.type){
        case 'NEW_COMPANY':
            return Object.assign({}, state, {
                companyName: action.company
            })
        case 'NEW_MONITOR':
            return Object.assign({}, state, {
                monitorID: action.monitorID
            })
        default:
            return state
    }
}
function companyList(state=[],action) {
    switch (action.type){
        case 'COMPANY_LIST':
            return [...state,action.companyList]
        default:
            return state
    }
}
export {company,companyList}