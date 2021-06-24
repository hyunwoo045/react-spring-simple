import "./App.css";
import React, { useState } from "react";
import { useTransition, animated } from "react-spring";

const data = [{ title: "Group 1" }, { title: "Group 2" }, { title: "Group 3" }];

function App() {
  const [curIdx, setIdx] = useState(0);
  const [curDir, setDir] = useState("left");
  const transitions = useTransition(curIdx, {
    from: { opacity: 0, transform: "translate3d(100%, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(-50%, 0, 0)" },
  });
  const transRight = useTransition(curIdx, {
    from: { opacity: 0, transform: "translate3d(-100%, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(50%, 0, 0)" },
  });
  return (
    <div className="app">
      <div
        className="btn left"
        onClick={() => {
          if (curIdx === 0) setIdx(2);
          else setIdx(curIdx - 1);
          setDir("right");
        }}
      >
        {"<"}
      </div>
      {curDir === "left"
        ? transitions((style, i) => {
            return (
              <animated.div className="box" style={style}>
                {data[i].title}
              </animated.div>
            );
          })
        : transRight((style, i) => {
            return (
              <animated.div className="box" style={style}>
                {data[i].title}
              </animated.div>
            );
          })}
      <div
        className="btn right"
        onClick={() => {
          setIdx((curIdx + 1) % 3);
          setDir("left");
        }}
      >
        {">"}
      </div>
    </div>
  );
}

export default App;
