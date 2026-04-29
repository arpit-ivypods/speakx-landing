import React from "react";
import DirectionBFull from "./DirectionBFull.jsx";

const TWEAKS = {
  palette: "iris",
  typePair: "mono",
  mode: "dark",
  heroCopy: "outcomes",
};

export default function App() {
  return <DirectionBFull tweaks={TWEAKS} />;
}
