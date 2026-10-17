import React, { useState } from "react";
import { GENERIC_COLORS } from "../../data/targets";
import "./Sidebar.css";

/**
 * Sidebar containing all user-configurable options:
 * - Scaled (simulated) distance to the target, in feet + inches, yards, or meters
 * - Actual distance from the observer to the monitor, in feet + inches, yards, or meters
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
  scaledUnit,
  onScaledUnitChange,
  scaledValue,
  onScaledValueChange,
  actualFeet,
  actualInches,
  onActualFeetChange,
  onActualInchesChange,
  actualUnit,
  onActualUnitChange,
  actualValue,
  onActualValueChange,
  isGeneric,
  sizeIn,
  onSizeChange,
  color,
  onColorChange,
  onOpenCalibration,
  onResetCalibration,
  calibrated,
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
      <button
        className="sidebar-toggle"
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? "▶" : "◀"}
      </button>
      {!collapsed && (
        <div className="sidebar-content">
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
        <label className="field">
          <span>Units</span>
          <select
            value={scaledUnit}
            onChange={(e) => onScaledUnitChange(e.target.value)}
          >
            <option value="ftin">Feet + Inches</option>
            <option value="yd">Yards</option>
            <option value="m">Meters</option>
          </select>
        </label>
        {scaledUnit === "ftin" ? (
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
        ) : (
          <label className="field">
            <span>{scaledUnit === "yd" ? "Yards" : "Meters"}</span>
            <input
              type="number"
              min="0"
              step="0.1"
              value={scaledValue}
              onChange={(e) => onScaledValueChange(e.target.value)}
            />
          </label>
        )}
      </section>

      <section className="sidebar-section">
        <h2>Actual Distance</h2>
        <p className="section-hint">
          How far you are sitting from the monitor.
        </p>
        <label className="field">
          <span>Units</span>
          <select
            value={actualUnit}
            onChange={(e) => onActualUnitChange(e.target.value)}
          >
            <option value="ftin">Feet + Inches</option>
            <option value="yd">Yards</option>
            <option value="m">Meters</option>
          </select>
        </label>
        {actualUnit === "ftin" ? (
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
        ) : (
          <label className="field">
            <span>{actualUnit === "yd" ? "Yards" : "Meters"}</span>
            <input
              type="number"
              min="0"
              step="0.1"
              value={actualValue}
              onChange={(e) => onActualValueChange(e.target.value)}
            />
          </label>
        )}
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
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
