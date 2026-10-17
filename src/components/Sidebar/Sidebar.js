import React from "react";
import { GENERIC_COLORS } from "../../data/targets";
import "./Sidebar.css";

/**
 * Sidebar containing all user-configurable options:
 * - Scaled (simulated) distance to the target, in feet + inches
 * - Actual distance from the observer to the monitor, in feet + inches
 * - Target type selection
 * - Calibration entry point
 */
function Sidebar({
  targets,
  targetId,
  onTargetChange,
  scaledFeet,
  scaledInches,
  onScaledFeetChange,
  onScaledInchesChange,
  actualFeet,
  actualInches,
  onActualFeetChange,
  onActualInchesChange,
  isGeneric,
  sizeIn,
  onSizeChange,
  color,
  onColorChange,
  onOpenCalibration,
  onResetCalibration,
  calibrated,
}) {
  return (
    <aside className="sidebar">
      <h1 className="sidebar-title">Dynamic Target</h1>

      <section className="sidebar-section">
        <h2>Target Type</h2>
        <label className="field">
          <span>Target</span>
          <select
            value={targetId}
            onChange={(e) => onTargetChange(e.target.value)}
          >
            {targets.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
        {isGeneric && (
          <>
            <label className="field">
              <span>Size: {sizeIn} in</span>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={sizeIn}
                onChange={(e) => onSizeChange(Math.round(Number(e.target.value)))}
              />
            </label>
            <label className="field">
              <span>Color</span>
              <select value={color} onChange={(e) => onColorChange(e.target.value)}>
                {GENERIC_COLORS.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}
      </section>

      <section className="sidebar-section">
        <h2>Simulated Distance</h2>
        <p className="section-hint">
          How far away the target would be in real life.
        </p>
        <div className="field-row">
          <label className="field">
            <span>Feet</span>
            <input
              type="number"
              min="0"
              step="1"
              value={scaledFeet}
              onChange={(e) => onScaledFeetChange(e.target.value)}
            />
          </label>
          <label className="field">
            <span>Inches</span>
            <input
              type="number"
              min="0"
              max="11"
              step="0.1"
              value={scaledInches}
              onChange={(e) => onScaledInchesChange(e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="sidebar-section">
        <h2>Actual Distance</h2>
        <p className="section-hint">
          How far you are sitting from the monitor.
        </p>
        <div className="field-row">
          <label className="field">
            <span>Feet</span>
            <input
              type="number"
              min="0"
              step="1"
              value={actualFeet}
              onChange={(e) => onActualFeetChange(e.target.value)}
            />
          </label>
          <label className="field">
            <span>Inches</span>
            <input
              type="number"
              min="0"
              max="11"
              step="0.1"
              value={actualInches}
              onChange={(e) => onActualInchesChange(e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="sidebar-section">
        <h2>Monitor Calibration</h2>
        <p className="section-hint">
          {calibrated
            ? "Your monitor is calibrated."
            : "Using default 96 PPI assumption."}
        </p>
        <button className="btn btn-primary full-width" onClick={onOpenCalibration}>
          {calibrated ? "Recalibrate" : "Calibrate Monitor"}
        </button>
        {calibrated && (
          <button
            className="btn btn-secondary full-width"
            onClick={onResetCalibration}
          >
            Reset to Default (96 PPI)
          </button>
        )}
      </section>
    </aside>
  );
}

export default Sidebar;
