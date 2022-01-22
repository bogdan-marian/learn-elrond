import {initialState, StateType} from "./state";
import {setItem, removeItem} from '../storage/session';



export function reducer(state, action) {
  switch (action.type) {
    case 'login': {
      const { address } = action;
      setItem('logged_in', true);
      setItem('address', address);
      return {
        ...state,
        address,
        loggedIn: true,
      };
    }

    case 'loading': {
      const { loading } = action;
      return {
        ...state,
        loading
      }
    }

    case 'setProvider': {
      const { provider } = action;
      return {
        ...state,
        dapp: {
          ...state.dapp,
          provider: provider,
        }
      }
    }

    case 'logout': {
      removeItem('logged_in');
      removeItem('address');
      return initialState()
    }

    default: {
      throw new Error(`Unhandled action type:`);
    }
  }
}
