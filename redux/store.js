//store - forefront to access all the state, reducer and actions

import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";

export const store = configureStore( {reducer: rootReducer } )