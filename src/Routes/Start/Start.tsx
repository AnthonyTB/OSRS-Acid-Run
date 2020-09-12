import React, { FunctionComponent, useContext } from "react";
import { Context } from "../../Context";

const Start: FunctionComponent = () => {
  const { isPregame, dataSetter } = useContext(Context);

  return (
    <section className="Start">
      <button type="button" onClick={() => dataSetter("isPregame", false)}>
        Start
      </button>
    </section>
  );
};

export default Start;
