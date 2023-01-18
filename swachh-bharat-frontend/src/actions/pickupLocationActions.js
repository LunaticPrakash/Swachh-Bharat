import * as pickupLocationConstants from "../constants/pickupLocationConstants";
import pickupLocationServices from "../services/pickupLocationServices";

export const addPickupLocation = async (dispatch, pickupLocation, token) => {
    dispatch({ type: pickupLocationConstants.ADD_PICKUPLOCATION_REQUEST });
    const { data, isAdded, error } =
        await pickupLocationServices.addPickupLocation(
            pickupLocation,
            token
        );
    if (isAdded) {
        return dispatch({
            type: pickupLocationConstants.ADD_PICKUPLOCATION_SUCCESS,
            payload: data,
        });
    } else {
        return dispatch({
            type: pickupLocationConstants.ADD_PICKUPLOCATION_FAILURE,
            payload: error,
        });
    }
}

export const fetchPickupLocation = async (dispatch, userId, token) => {
    dispatch({ type: pickupLocationConstants.FETCH_PICKUPLOCATION_REQUEST });
    const data = await pickupLocationServices.fetchPickupLocation(userId, token);
    if (data && Array.isArray(data)) {
        return dispatch({
            type: pickupLocationConstants.FETCH_PICKUPLOCATION_SUCCESS,
            payload: data,
        });
    } else {
        return dispatch({
            type: pickupLocationConstants.FETCH_PICKUPLOCATION_FAILURE,
            payload: null,
        });
    }
};

export const fetchPickupLocationByCities = async (dispatch, cities, token) => {
    dispatch({ type: pickupLocationConstants.FETCH_PICKUPLOCATION_REQUEST });
    const data = await pickupLocationServices.fetchPickupLocationByCities(cities, token);
    if (data && Array.isArray(data)) {
        return dispatch({
            type: pickupLocationConstants.FETCH_PICKUPLOCATION_SUCCESS,
            payload: data,
        });
    } else {
        return dispatch({
            type: pickupLocationConstants.FETCH_PICKUPLOCATION_FAILURE,
            payload: null,
        });
    }
};

export const updatePickupLocation = async (dispatch, pickupLocation, token) => {
    dispatch({ type: pickupLocationConstants.UPDATE_PICKUPLOCATION_REQUEST });
    const { data, isUpdated, error } =
        await pickupLocationServices.updatePickupLocation(pickupLocation, token);
    if (isUpdated) {
        return dispatch({
            type: pickupLocationConstants.UPDATE_PICKUPLOCATION_SUCCESS,
            payload: data,
        });
    } else {
        return dispatch({
            type: pickupLocationConstants.UPDATE_PICKUPLOCATION_FAILURE,
            payload: error,
        });
    }
};

export const deletePickupLocation = async (dispatch, pickLocId, token) => {
    dispatch({ type: pickupLocationConstants.DELETE_PICKUPLOCATION_REQUEST });
    const { isDeleted, error } = await pickupLocationServices.deletePickupLocation(
      pickLocId,
      token
    );
    if (isDeleted) {
      return dispatch({
        type: pickupLocationConstants.DELETE_PICKUPLOCATION_SUCCESS,
        payload: pickLocId,
      });
    } else {
      return dispatch({
        type: pickupLocationConstants.DELETE_PICKUPLOCATION_FAILURE,
        payload: error,
      });
    }
  };