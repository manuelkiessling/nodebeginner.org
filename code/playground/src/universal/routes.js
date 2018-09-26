import LoginScreen from "./react-components/presentational/LoginScreen";
import NotesScreenContainer from "./react-components/container/NotesScreenContainer";

export default [
    {
        path: "/",
        component: LoginScreen,
        exact: true
    },
    {
        path: "/notes",
        component: NotesScreenContainer,
        exact: true
    }
];
