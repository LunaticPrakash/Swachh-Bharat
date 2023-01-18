import axios from "axios";

const addPickupLocation = async (pickupLocation, token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const { data } = await axios.post("/api/pickup-location/",
            pickupLocation,
            config);
        console.log("pickupLocationService:addpickupLocation() Success: ", data);
        return { data: data, isAdded: true, error: null };
    }
    catch (error) {
        console.error(
            "pickupLocationService:addpickupLocation() Error: ",
            error.response.data
        );
        return { data: null, isAdded: false, error: error.response.data };
    }
}

const fetchPickupLocation = async (userId, token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const { data } = await axios.get(`/api/pickup-location/${userId}`, config);
        console.log(
            "pickupLocationService:fetchPickupLocation() Success: ",
            data
        );
        return data;
    } catch (error) {
        console.error(
            "pickupLocationService:fetchPickupLocation() Error: ",
            error.response.data
        );
        return error.response.data;
    }
};

const fetchPickupLocationByCities = async (cities, token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const { data } = await axios.get(`/api/pickup-location/cities?cities=${cities.toString()}`, config);
        console.log(
            "pickupLocationService:fetchPickupLocation() Success: ",
            data
        );
        return data;
    } catch (error) {
        console.error(
            "pickupLocationService:fetchPickupLocation() Error: ",
            error.response.data
        );
        return error.response.data;
    }
};

const updatePickupLocation = async (pickupLocation, token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const { data } = await axios.put(
            `/api/pickup-location/${pickupLocation.pickLocId}`,
            pickupLocation,
            config
        );
        console.log(
            "pickupLocationService:updatePickupLocation()  Success: ",
            data
        );
        return {
            data: data,
            isUpdated: true,
            error: null,
        };
    } catch (error) {
        console.error(
            "pickupLocationService:updatePickupLocation()  Error: ",
            error.response.data
        );
        return {
            data: null,
            isUpdated: false,
            error: error.response.data,
        };
    }
};

const deletePickupLocation = async (pickLocId, token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const { data } = await axios.delete(
            `/api/pickup-location/${pickLocId}`,
            config
        );
        console.log(
            "pickupLocationService:deletePickupLocation()  Success: ",
            data
        );
        return {
            isDeleted: true,
            error: null,
        };
    } catch (error) {
        console.error(
            "pickupLocationService:deletePickupLocation()  Error: ",
            error
        );
        return {
            isDeleted: false,
            error: error.response.data,
        };
    }
};

const pickupLocationServices = {
    addPickupLocation,
    fetchPickupLocation,
    fetchPickupLocationByCities,
    updatePickupLocation,
    deletePickupLocation,
};

export default pickupLocationServices;
