import NotesScreenContainer from "./react-components/container/NotesScreenContainer";
import LoginScreenContainer from "./react-components/container/LoginScreenContainer";

export default [
    {
        path: "/",
        component: LoginScreenContainer,
        exact: true
    },
    {
        path: "/notes",
        component: NotesScreenContainer,
        exact: true
    }
];
