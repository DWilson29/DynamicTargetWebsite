import React, { useState } from "react";
import "./Calibration.css";

/**
 * Modal/panel allowing the user to calibrate their monitor's true pixel
 * density by entering the physical (measured) width and height of their
 * visible screen area, in inches.
 */
function Calibration({ current, onSave, onClear, onClose }) {
  const [widthIn, setWidthIn] = useState(current.widthIn || "");
  const [heightIn, setHeightIn] = useState(current.heightIn || "");

  const handleSave = (e) => {
    e.preventDefault();
    const w = parseFloat(widthIn);
    const h = parseFloat(heightIn);
    if (w > 0 && h > 0) {
      onSave(w, h);
    }
  };

  return (
    <div className="calibration-overlay" role="dialog" aria-modal="true">
      <div className="calibration-panel">
        <h2>Calibrate Monitor Size</h2>
        <p>
          Measure the visible width and height of your screen (not the bezel)
          with a ruler or tape measure, in inches, and enter the values below.
          This lets the app calculate your monitor's true pixel density
          instead of assuming the default 96 pixels-per-inch.
        </p>
        <form onSubmit={handleSave} className="calibration-form">
          <label>
            Screen Width (in)
            <input
              type="number"
              min="1"
              step="0.01"
              value={widthIn}
              onChange={(e) => setWidthIn(e.target.value)}
              required
            />
          </label>
          <label>
            Screen Height (in)
            <input
              type="number"
              min="1"
              step="0.01"
              value={heightIn}
              onChange={(e) => setHeightIn(e.target.value)}
              required
            />
          </label>
          <div className="calibration-actions">
            <button type="submit" className="btn btn-primary">
              Save Calibration
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClear}
            >
              Reset to Default
            </button>
            <button type="button" className="btn btn-link" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
        {current.calibrated && (
          <p className="calibration-status">
            Currently calibrated: {current.widthIn}in x {current.heightIn}in
            (~{Math.round((current.ppiX + current.ppiY) / 2)} PPI)
          </p>
        )}
        {!current.calibrated && (
          <p className="calibration-status">
            Not calibrated — using default 96 PPI assumption.
          </p>
        )}
      </div>
    </div>
  );
}

export default Calibration;
