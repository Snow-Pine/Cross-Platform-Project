//root reducer - combines all reducers
//bridge between readucers and store

import { combineReducers } from "redux";
import tasksReducer from "./taskReducer";

export const rootReducer = combineReducers( {tasks: tasksReducer} )

/*export const rootReducer = combineReducers( {
tasks: tasksReducer,
students: studentsReducer,
courses: coursesReducer,
} )
*/