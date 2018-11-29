import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/red";

export default createMuiTheme({
    palette: {
        primary: blue,
        accent: green,
        type: "light",
    },
    typography: {
        useNextVariants: true,
    }
});
