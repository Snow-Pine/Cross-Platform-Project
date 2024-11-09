import { ADD_TASK, EDIT_TASK, TOGGLE_TASK_COMPLETION } from '../actionTypes';
//reducer - responsible for updating the state
//empty array as tasks for initial values
const initialState = {
    listOfTasks: [{
        id: Date.now(),
        name: "Water the plants",
        completed: false,
    }],
}

//reducer needs 2 parameters - state and action
//1. state representing the data
//2. action to be performed
const taskReducer = (state = initialState, action) => {
    console.log(`action received: ${action.type}`);
    console.log(`action.payload: ${JSON.stringify(action.payload)}`);
    //perform operation according to the action type
    //reducer must return a state
    switch (action.type) {
        case ADD_TASK: { //using spread operator (...) to return the existing state
            //return the exsisitng state by replacing the listOfTasks after appending a new task
            return { ...state, //exisiting state with other possible values
                listOfTasks: [...state.listOfTasks, action.payload]
                //a new listOfTasks with existing data plus a new object received from the action
            }
        }
        case EDIT_TASK: {
            console.log(`Editing task with id : ${action.payload.id}`);
            console.log(`Existing object: ${JSON.stringify(state.listOfTasks.find((task) => task.id === action.payload.id))}`);
            console.log(`Updated object: ${JSON.stringify(action.payload.updatedTask)}`);
            return {
                ...state,
                listOfTasks: state.listOfTasks.map((task) =>
                    //if the id matches, replace with updated task
                    task.id === action.payload.id ? action.payload.updatedTask : task
                ),
            };
        }
        case TOGGLE_TASK_COMPLETION:
            console.log(`Toggeling completion status for: ${JSON.stringify(action.payload)}`);

            return {
                ...state,
                listOfTasks: state.listOfTasks.map((task) =>
                    //compare the task id of current object and id received in payload
                    task.id === action.payload ? {
                        //if the id matches, update the completed status
                        ...task,
                        completed: !task.completed
                    } : task
                ),
            };
        default:
            return state;
    }
};

export default taskReducer;
