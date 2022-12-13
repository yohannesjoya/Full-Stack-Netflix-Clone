export const initialState = {
  // myList: [],
  user: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        user: action.user,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default reducer;
