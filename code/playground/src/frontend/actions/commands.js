export const COMMAND_TASK_ADD = "COMMAND_TASK_ADD";

export const addTaskCommand = (task) => ({ type: COMMAND_TASK_ADD, task: task });
