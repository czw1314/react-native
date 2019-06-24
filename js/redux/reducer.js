function company(state,action) {
    switch (action.type){
        case 'NEW_COMPANY':
            return action.company
    }
}
export {company}