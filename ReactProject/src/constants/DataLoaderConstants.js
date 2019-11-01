const constants = {
    ACTION_PREFIX: "read_",
    
    STARTED_SUFFIX: "_started",
    SUCCESS_SUFFIX: "_success",
    FAILURE_SUFFIX: "_failure"
};
export default constants;

export const State = {
    DEFAULT: 0,
    STARTED: 1,
    SUCCESS: 2,
    FAILURE: 3
};

export const ExternalURL = {
    DYNAMICS_PREFIX: "https://sstack.crm.dynamics.com/api/data/v9.1/madmv_ma_",
    DYNAMICS_SUFFIX: "s?$select="
}