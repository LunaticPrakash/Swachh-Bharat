import * as userProfileConstants from "../constants/userProfileConstants";


const userProfileInitialState = {
    loading: false,
    error: null,
    isUpdated: false,
    user: JSON.parse(localStorage.getItem("user"))
};

export const userProfileReducers = (
    state = userProfileInitialState,
    action
) => {
    switch (action.type) {
        case userProfileConstants.UPDATE_USERPROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case userProfileConstants.UPDATE_USERPROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true,
                user: action.payload,
            };

        case userProfileConstants.UPDATE_USERPROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }

}