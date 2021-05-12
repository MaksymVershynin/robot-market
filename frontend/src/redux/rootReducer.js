import { combineReducers } from 'redux';

import {
    setAllRobots_constant,
    setVisibleRobots_constant,
    setSelectedRobots_constant
} from "./actions";


const robotsState = {
    allRobots: [],
    visibleRobots: [],
    selectedRobots: []
}

const robotsReducer = (state = robotsState, action) => {
    switch(action.type) {
        case setAllRobots_constant:
            return {
                ...state,
                allRobots: action.allRobots
            };
        case setVisibleRobots_constant:
            return {
                ...state,
                visibleRobots: action.visibleRobots
            }
        case setSelectedRobots_constant:
            return {
                ...state,
                selectedRobots: action.selectedRobots
            }
        default: return state;
    }
}

const rootReducer = combineReducers({
    robots: robotsReducer,
});

export default rootReducer;