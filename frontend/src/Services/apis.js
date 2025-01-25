const BASE_URL = "https://management-qkn3.onrender.com/"

export const authEndpoints = {
    SIGNUP_API : BASE_URL + "/signup",
    LOGIN_API : BASE_URL + "/login"
}

export const hotelEndpoints = {
    ADD_HOTEL_API : BASE_URL + "/add-hotel",
    GET_ALL_HOTELS_API : BASE_URL + "/get-all-hotels",
    UPDATE_HOTEL_API : BASE_URL + "/update-hotel",
    DELETE_HOTEL_API : BASE_URL + "/delete-hotel"
}

export const vehicleEndpoints = {
    ADD_VEHICLE_API : BASE_URL + "/add-vehicle",
    GET_ALL_VEHICLES_API : BASE_URL + "/get-all-vehicles",
    UPDATE_VEHICLE_API : BASE_URL + "/update-vehicle",
    DELETE_VEHICLE_API : BASE_URL + "/delete-vehicle"
}

export const regionEndpoints = {
    ADD_REGION_API : BASE_URL + "/add-region",
    GET_ALL_REGION_API : BASE_URL + "/get-all-regions",
    UPDATE_REGION_API : BASE_URL + "/update-region",
    DELETE_REGION_API : BASE_URL + "/delete-region"
}
