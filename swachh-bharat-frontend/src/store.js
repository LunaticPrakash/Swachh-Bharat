import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { loginReducer, registerReducer } from "./reducers/authReducers";
import { pickupLocationReducer } from "./reducers/pickupLocationReducers";
import { userProfileReducers } from "./reducers/userProfileReducers";

const reducer = combineReducers({
    registerReducer: registerReducer,
    loginReducer: loginReducer,
    pickupLocationReducer: pickupLocationReducer,
    userProfileReducers: userProfileReducers,
});

const middleware = [thunk]
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
