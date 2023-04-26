import * as c from './../actions/ActionTypes';

const reducer = (state = {}, action) => {
  const { names, location, issue, id, fromattedWaitTime, timeOpen } = action;
  switch (action.type) {
    case 'ADD_TICKET':
      return Object.assign({}, state, {
        [id]: {
          names: names,
          location: location,
          issue: issue,
          timeOpen: timeOpen,
          fromattedWaitTime: fromattedWaitTime,
          id: id
        }      
      });
    case 'DELETE_TICKET':
      let newState = { ...state };
      delete newState[id];
      return newState;

      case c.UPDATE_TIME:
        const newTicket = Object.assign({}, state[id], {fromattedWaitTime});
        const updatedState = Object.assign({}, state, {
          [id]: newTicket
        });
        return updatedState;
        default:
          return state;
  }
};

export default reducer;
