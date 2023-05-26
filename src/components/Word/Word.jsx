import React, { memo, useEffect, useRef } from "react";
import "./Word.css";

const Word = memo(({ text, active, correct, shown }) => {
  if (!shown) {
    return <span className="d-none">{text} </span>;
  }

  if (correct === true) {
    return <span className="correct">{text} </span>;
  }

  if (correct == false) {
    return <span className="incorrect">{text} </span>;
  }

  if (active) {
    return <span className="active">{text} </span>;
  }

  return (
    <span style={{ fontWeight: active ? "bold" : "normal" }}>{text} </span>
  );
});

export default Word;
