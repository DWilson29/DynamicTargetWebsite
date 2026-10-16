import React from "react";
import "./TargetDisplay.css";

/**
 * Renders the target at its computed on-screen pixel size, along with
 * a summary of the computed values for transparency/debugging.
 */
function TargetDisplay({
  target,
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
          <div
            className="target-box"
            style={{
              width: `${widthPx}px`,
              height: `${heightPx}px`,
            }}
            title={target.name}
          />
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
