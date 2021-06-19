import React from 'react';
import {initialState} from './state';
import {reducer} from './reducer';

const Context = React.createContext();
const Dispatch = React.createContext();
const AuthContext = React.createContext();

function ElrondProvider({children}) {
  const [state, dispatch] = React.useReducer(reducer, initialState());

  return (
    <Context.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </Context.Provider>
  );
}

function useElrondContext() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error('useState must be used within a Context.Provider');
  }
  return context;
}

function useElrondDispatch() {
  const context = React.useContext(Dispatch);
  if (context === undefined) {
    throw new Error('useDispatch must be used within a Dispatch.Provider');
  }
  return context;
}

export {ElrondProvider, useElrondContext, useElrondDispatch, AuthContext};
