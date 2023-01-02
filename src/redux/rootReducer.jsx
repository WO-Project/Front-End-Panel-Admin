import { combineReducers } from "redux";

import customiseReducer from "./customise/customiseReducer";

const rootReducer = combineReducers({
  customise: customiseReducer,
  adminUsername: "",
  adminName: "",
  adminEmail: "",
});

export default rootReducer;
