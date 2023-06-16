const init = {
  fullname: "",
  username: "",
  email: "",
  bio: "",
  avatar_url: "",
  verify: "",
};
function userReducer(state = init, action) {
  try {
    if (action.type == "login") {
      return {
        ...state,
        ...action.payload,
      };
    } else if (action.type == "logout") {
      return init;
    }
    return state;
  } catch (err) {
    console.log(err);
  }
}

export default userReducer;
