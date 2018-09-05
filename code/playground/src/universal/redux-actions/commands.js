export const COMMAND_INITIALIZE = "COMMAND_INITIALIZE";
export const COMMAND_TASK_ADD = "COMMAND_TASK_ADD";

export const addTaskCommand = (task) => ({ type: COMMAND_TASK_ADD, task: task });
export const initializeCommand = () => ({ type: COMMAND_INITIALIZE });
