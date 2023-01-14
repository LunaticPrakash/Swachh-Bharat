import * as pickupLocationConstants from "../constants/pickupLocationConstants";

const pickupLocationInitialState = {
    loading: false,
    error: null,
    pickupLocations: [],
    isAdded: false,
    isDeleted: false,
    isUpdated: false,
};

export const pickupLocationReducer = (
    state = pickupLocationInitialState,
    action
) => {
    switch (action.type) {
        case pickupLocationConstants.FETCH_PICKUPLOCATION_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case pickupLocationConstants.FETCH_PICKUPLOCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                pickupLocations: action.payload,
            };

        case pickupLocationConstants.FETCH_PICKUPLOCATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case pickupLocationConstants.ADD_PICKUPLOCATION_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case pickupLocationConstants.ADD_PICKUPLOCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                isAdded: true,
                pickupLocations: [...state.pickupLocations, action.payload],
            };
        case pickupLocationConstants.ADD_PICKUPLOCATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case pickupLocationConstants.UPDATE_PICKUPLOCATION_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case pickupLocationConstants.UPDATE_PICKUPLOCATION_SUCCESS:
            const temp2 = state.pickupLocations;
            temp2.forEach((loc, index) => {
                if (loc.pickLocId == action.payload.pickLocId) {
                    temp2.splice(index, 1, action.payload);
                }
            });
            return {
                ...state,
                loading: false,
                isUpdated: true,
                pickupLocations: temp2,
            };

        case pickupLocationConstants.UPDATE_PICKUPLOCATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case pickupLocationConstants.DELETE_PICKUPLOCATION_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case pickupLocationConstants.DELETE_PICKUPLOCATION_SUCCESS:
            const temp = state.pickupLocations;
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].pickLocId == action.payload) {
                    temp.splice(i, 1);
                }
            }
            return {
                ...state,
                loading: false,
                isDeleted: true,
                pickupLocations: temp,
            };

        case pickupLocationConstants.DELETE_PICKUPLOCATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}