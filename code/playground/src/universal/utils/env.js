export const getEnvVar = (varName, _default = null) => {
    return typeof(process.env[varName]) === "undefined" ? _default : process.env[varName];
};
