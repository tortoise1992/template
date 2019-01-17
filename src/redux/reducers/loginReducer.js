
import {
	LOGIN_STATUS
} from '../actionTypes';

import { getLocal } from '../../util/tool';

let loginStatus = getLocal("loginStatus");

if (loginStatus) {
    loginStatus = JSON.parse(loginStatus)
} else {
    loginStatus = false
}

const defaultState = {
	loginStatus,
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case LOGIN_STATUS:
            return {
                loginStatus: action.bool
            }
        default:
            return state
    }
}