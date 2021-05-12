export const setAllRobots_constant = 'SET_ALL_ROBOTS';
export const setVisibleRobots_constant = 'SET_VISIBLE_ROBOTS';
export const setSelectedRobots_constant = 'SET_SELECTED_ROBOTS'

export const setAllRobots_redux = (allRobots) => {
    return {
        type: setAllRobots_constant,
        allRobots: allRobots
    };
};

export const setVisibleRobots_redux = (visibleRobots) => {
    return {
        type: setVisibleRobots_constant,
        visibleRobots: visibleRobots
    };
};

export const setSelectedRobots_redux = (selectedRobots) => {
    return {
        type: setSelectedRobots_constant,
        selectedRobots: selectedRobots
    };
};




