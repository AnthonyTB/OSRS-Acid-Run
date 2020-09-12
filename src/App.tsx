import React, { FunctionComponent, useContext } from "react";
import { Context } from "./Context";
import "./App.css";
import { Game, Start } from "./Routes";

const App: FunctionComponent = () => {
  const { isPregame, isLoading } = useContext(Context);

  return (
    <>
      <h1>Acid Path Trainer</h1>
      {isLoading ? (
        <>
          <Game />
          {isPregame ? <Start /> : null}
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default App;
