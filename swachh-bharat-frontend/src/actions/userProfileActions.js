import * as userProfileConstants from "../constants/userProfileConstants";
import userProfileServices from "../services/userProfileServices";

export const updateUserProfile = async (dispatch, user, token) => {
    dispatch({ type: userProfileConstants.UPDATE_USERPROFILE_REQUEST });
    const { data, isUpdated, error } = await userProfileServices.updateUserProfile(user, token);

    if (isUpdated) {
        return dispatch({
            type: userProfileConstants.UPDATE_USERPROFILE_SUCCESS,
            payload: data,
        });
    }
    else {
        return dispatch({
            type: userProfileConstants.UPDATE_USERPROFILE_FAILURE,
            payload: error,
        });
    }
};