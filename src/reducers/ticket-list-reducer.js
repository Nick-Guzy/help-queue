import * as c from './../actions/ActionTypes';

const reducer = (state = {}, action) => {
  const { names, location, issue, id, formattedWaitTime, timeOpen } = action;
  switch (action.type) {
    case c.ADD_TICKET:
      return Object.assign({}, state, {
        [id]: {
          names: names,
          location: location,
          issue: issue,
          timeOpen: timeOpen,
          formattedWaitTime: formattedWaitTime,
          id: id
        }      
      });
    case c.DELETE_TICKET:
      const newState = { ...state };
      delete newState[id];
      return newState;
  
      case c.UPDATE_TIME:
        const newTicket = Object.assign({}, state[id], {formattedWaitTime});
        const updatedState = Object.assign({}, state, {
          [id]: newTicket
        });
        return updatedState;
        default:
          return state;
  }
};

export default reducer;
