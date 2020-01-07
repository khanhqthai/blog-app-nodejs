
export default (state={articles: []}, action) => {
  switch(action.type) {
    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        articles: action.data.articles,
      };
    default:
      return state;
  }
};

export default (state={articles: []}, action) => {
  switch(action.type) {
    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        articles: action.data.articles,
      };
    case 'SUBMIT_ARTICLE':
      return {
        ...state,
        articles: ([action.data.article]).concat(state.articles),
      }
    default:
      return state;
  }
};