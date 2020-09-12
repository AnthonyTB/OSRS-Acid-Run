import React, { FunctionComponent, useContext } from "react";
import { Context } from "../../../Context";

const Heading: FunctionComponent = () => {
  const { isPregame } = useContext(Context);

  return (
    <header>
      <h3>
        {isPregame
          ? "Choose a starting position then click start"
          : "Dodge the acid"}
      </h3>
    </header>
  );
};

export default Heading;
