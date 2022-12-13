import React, { useContext, createContext, useReducer } from "react";
const GlobalContext = createContext();
const GlobalStateProvider = ({ reducer, initialState, children }) => {
  return (
    <GlobalContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export default GlobalStateProvider;

// import { createContext, useContext, useReducer } from "react";
// const GlobalContext = createContext();
// export const GlobalContextProvider = ({ reducer, initialState, children }) => {
//   return (
//     <GlobalContext.Provider value={useReducer(reducer, initialState)}>
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// export const useGlobalState = () => useContext(GlobalContext);
