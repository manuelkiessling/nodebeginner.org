import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

export default createMuiTheme({
    palette: {
        primary: blue,
        accent: red,
        type: "dark",
    },
    typography: {
        useNextVariants: true,
    }
});
