import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import shortlinkReducer from "./slices/shortlinkSlice";
import domainReducer from "./slices/domainSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shortlink: shortlinkReducer,
    domains: domainReducer,
  },
});
