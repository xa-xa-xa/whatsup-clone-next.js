const Reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, showSidebar: !state.showSidebar };
    case "CLOSE_SIDEBAR":
      return { ...state, showSidebar: false };

    default:
      return state;
  }
};

export default Reducer;
