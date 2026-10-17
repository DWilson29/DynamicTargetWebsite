import React from "react";
import "./TargetDisplay.css";

/**
 * Renders the target at its computed on-screen pixel size, along with
 * a summary of the computed values for transparency/debugging.
 */
function TargetDisplay({
  target,
  color,
  displayWidthIn,
  displayHeightIn,
  widthPx,
  heightPx,
  ppiX,
  ppiY,
  calibrated,
}) {
  const tooSmall = widthPx < 1 || heightPx < 1;

  return (
    <main className="target-display">
      <div className="target-stage">
        {!tooSmall ? (
          target.shape === "image" ? (
            <img
              className="target-box"
              src={`${import.meta.env.BASE_URL}${target.image}`}
              alt={target.name}
              draggable={false}
              style={{ width: `${widthPx}px`, height: `${heightPx}px` }}
            />
          ) : (
            <div
              className="target-box"
              style={{
                width: `${widthPx}px`,
                height: `${heightPx}px`,
                background: color,
                borderRadius: target.shape === "circle" ? "50%" : 0,
                boxShadow: "none",
                boxSizing: "border-box",
                border: "2px solid #000",
              }}
              title={target.name}
            />
          )
        ) : (
          <p className="target-warning">
            Computed target size is too small to render.
          </p>
        )}
      </div>

      <div className="target-info">
        <h2>{target.name}</h2>
        <ul>
          <li>
            Real target size: {target.widthIn}in x {target.heightIn}in
          </li>
          <li>
            Displayed size: {displayWidthIn.toFixed(3)}in x{" "}
            {displayHeightIn.toFixed(3)}in ({widthPx.toFixed(1)}px x{" "}
            {heightPx.toFixed(1)}px)
          </li>
          <li>
            Pixel density in use: {ppiX.toFixed(1)} x {ppiY.toFixed(1)} PPI (
            {calibrated ? "calibrated" : "default assumption"})
          </li>
        </ul>
      </div>
    </main>
  );
}

export default TargetDisplay;
