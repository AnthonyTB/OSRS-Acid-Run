import React, {
  createContext,
  useReducer,
  FunctionComponent,
  useEffect,
} from "react";

interface IStartingPosition {
  row: number;
  col: number;
}

interface IReducer {
  type: string;
  payload: any;
}

interface IState {
  start: IStartingPosition;
  visited: any[];
  grid: any;
  isPregame: boolean;
}

export const Context = createContext<any>([]);

export const ContextProvider: FunctionComponent = (props: any) => {
  // Creates the Reducer for state management
  const Reducer = (prevState: any, { type, payload }: IReducer) => {
    switch (type) {
      case "start":
        return {
          ...prevState,
          start: payload.start,
        };
      case "visited":
        return {
          ...prevState,
          visited: payload.visited,
        };
      case "grid":
        return {
          ...prevState,
          grid: payload.grid,
        };
      case "isPregame":
        return {
          ...prevState,
          isPregame: payload.isPregame,
        };
      case "isLoading":
        return {
          ...prevState,
          isLoading: payload.isLoading,
        };
      default:
        return;
    }
  };

  // Sets initial vals for state
  const [state, dispatch] = useReducer(Reducer, {
    start: { row: 2, col: 10 },
    visited: [],
    grid: null,
    isPregame: true,
    isLoading: true,
  });

  // Used to update vals in state
  const dataSetter = (section: string, data: any) => {
    dispatch({
      type: `${section}`,
      payload: {
        [section]: data,
      },
    });
  };

  const value = {
    start: state.start,
    visited: state.visited,
    grid: state.grid,
    isPregame: state.isPregame,
    isLoading: state.isLoading,
    dataSetter,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
