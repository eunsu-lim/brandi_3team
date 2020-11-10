const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SAVE_ACCOUNT":
      return { ...state, account_type: action.payload };
    case "SAVE_FILTER":
      return { ...state, filter_list: action.payload };
    case "SAVE_NAV":
      return { ...state, nav_list: action.payload };
    default:
      return state;
  }
};

export default dataReducer;

const INITIAL_STATE = {
  account_type: "",
  nav_list: {},
  filter_list: {},
};
