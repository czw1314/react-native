function company(state=0,action) {
    switch (action.type){
        case 'NEW_COMPANY':
            return action.company
        default:
            return state
    }
}
export {company}