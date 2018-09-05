import LoginScreen from "./react-components/presentational/LoginScreen";
import TasksScreenContainer from "./react-components/container/TasksScreenContainer";

export default [
    {
        path: "/",
        component: LoginScreen,
        exact: true
    },
    {
        path: "/tasks",
        component: TasksScreenContainer,
        exact: true
    }
];
