import { ADD_TASK, EDIT_TASK, TOGGLE_TASK_COMPLETION } from "./actionTypes";

//action objects (JS objects)
export const addTask = (task) => ({
    type: ADD_TASK, //which action to be performed
    payload: task, //additional information/data needed to perform action
});


export const editTask = (id, updatedTask) => ({
    type: EDIT_TASK,
    payload: { id, updatedTask },
});


export const toggleTaskCompletion = (id) => ({
    type: TOGGLE_TASK_COMPLETION,
    payload: id,
});