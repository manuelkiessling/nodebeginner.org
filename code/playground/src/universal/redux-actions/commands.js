export const COMMAND_INITIALIZE = "COMMAND_INITIALIZE";
export const COMMAND_TASK_ADD = "COMMAND_TASK_ADD";

export const addTaskCommand = (taskTitle) => ({ type: COMMAND_TASK_ADD, taskTitle: taskTitle });
export const initializeCommand = () => ({ type: COMMAND_INITIALIZE });
