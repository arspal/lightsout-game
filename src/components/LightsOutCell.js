import React from "react";

export default function LightsOutCell({
  row,
  column,
  isLit,
  isChanging,
  changeStartPoint,
  animDuration
}) {
  return (
    <div
      data-row={row}
      data-col={column}
      className={"LightsOut-cell" + (isLit ? " LightsOut-cell--lit" : "")}
    >
      <span
        className={
          "LightsOut-colorActive" + (isChanging ? " LightsOut-colorChange" : "")
        }
        style={
          isLit && isChanging
            ? {
                animationName: `scale-${changeStartPoint}`,
                animationDuration: `${animDuration}ms`
              }
            : {}
        }
      ></span>
      <span
        className={
          "LightsOut-colorInactive" +
          (isChanging ? " LightsOut-colorChange" : "")
        }
        style={
          isChanging && !isLit
            ? {
                animationName: `scale-${changeStartPoint}`,
                animationDuration: `${animDuration}ms`
              }
            : {}
        }
      ></span>
    </div>
  );
}
