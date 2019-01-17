import { CHANGE_BREADCRUMB } from './../actionTypes'

export default (state = '', action) => {
    switch(action.type) {
        case CHANGE_BREADCRUMB:
            return {
                totalBreadcrumb: action.str
            }
        default:
            return state
    }
}