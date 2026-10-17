import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import TargetDisplay from "./components/TargetDisplay/TargetDisplay";
import Calibration from "./components/Calibration/Calibration";
import targets, { DEFAULT_GENERIC_SIZE_IN } from "./data/targets";
import {
  distanceToInches,
  INCHES_PER_UNIT,
  computeDisplaySizeInches,
  inchesToPx,
} from "./utils/scaling";
import { getCalibration, getEffectivePpi, saveCalibration, clearCalibration } from "./utils/calibration";

function App() {
  const [targetId, setTargetId] = useState(targets[0].id);

  // Simulated (scaled) distance to the target.
  const [scaledFeet, setScaledFeet] = useState(12);
  const [scaledInches, setScaledInches] = useState(0);
  const [scaledUnit, setScaledUnit] = useState("ftin");
  const [scaledValue, setScaledValue] = useState(4);

  // Observer's actual distance from the monitor.
  const [actualFeet, setActualFeet] = useState(1);
  const [actualInches, setActualInches] = useState(0);
  const [actualUnit, setActualUnit] = useState("ftin");
  const [actualValue, setActualValue] = useState(0.3);

  const [calibration, setCalibration] = useState(getCalibration());
  const [calibrationOpen, setCalibrationOpen] = useState(false);

  // Browser zoom changes devicePixelRatio and fires "resize".
  const [dpr, setDpr] = useState(window.devicePixelRatio || 1);
  useEffect(() => {
    const onResize = () => setDpr(window.devicePixelRatio || 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [genericSizeIn, setGenericSizeIn] = useState(DEFAULT_GENERIC_SIZE_IN);
  const [color, setColor] = useState("white");

  const target = useMemo(() => {
    const base = targets.find((t) => t.id === targetId) || targets[0];
    return base.generic
      ? { ...base, widthIn: genericSizeIn, heightIn: genericSizeIn }
      : base;
  }, [targetId, genericSizeIn]);

  const simulatedDistanceIn = distanceToInches(scaledUnit, scaledFeet, scaledInches, scaledValue);
  const actualDistanceIn = distanceToInches(actualUnit, actualFeet, actualInches, actualValue);

  const displayWidthIn = computeDisplaySizeInches(
    target.widthIn,
    simulatedDistanceIn,
    actualDistanceIn
  );
  const displayHeightIn = computeDisplaySizeInches(
    target.heightIn,
    simulatedDistanceIn,
    actualDistanceIn
  );

  const { ppiX, ppiY } = getEffectivePpi(calibration, dpr);
  const widthPx = inchesToPx(displayWidthIn, ppiX);
  const heightPx = inchesToPx(displayHeightIn, ppiY);

  const roundTo = (n, d) => Math.round(n * 10 ** d) / 10 ** d;

  const convertUnit = (oldUnit, newUnit, feet, inches, value, setFeet, setInches, setValue) => {
    const totalIn = distanceToInches(oldUnit, feet, inches, value);
    if (newUnit === "ftin") {
      let wholeFeet = Math.floor(totalIn / 12);
      let rem = roundTo(totalIn - wholeFeet * 12, 2);
      if (rem >= 12) {
        wholeFeet += 1;
        rem = 0;
      }
      setFeet(wholeFeet);
      setInches(rem);
    } else {
      setValue(roundTo(totalIn / INCHES_PER_UNIT[newUnit], 3));
    }
  };

  const handleScaledUnitChange = (newUnit) => {
    convertUnit(scaledUnit, newUnit, scaledFeet, scaledInches, scaledValue,
      setScaledFeet, setScaledInches, setScaledValue);
    setScaledUnit(newUnit);
  };

  const handleActualUnitChange = (newUnit) => {
    convertUnit(actualUnit, newUnit, actualFeet, actualInches, actualValue,
      setActualFeet, setActualInches, setActualValue);
    setActualUnit(newUnit);
  };

  const handleSaveCalibration = (widthIn, heightIn) => {
    const updated = saveCalibration(widthIn, heightIn);
    setCalibration(updated);
    setCalibrationOpen(false);
  };

  const handleClearCalibration = () => {
    const updated = clearCalibration();
    setCalibration(updated);
  };

  return (
    <div className="app">
      <Sidebar
        targets={targets}
        targetId={targetId}
        onTargetChange={setTargetId}
        scaledFeet={scaledFeet}
        scaledInches={scaledInches}
        onScaledFeetChange={setScaledFeet}
        onScaledInchesChange={setScaledInches}
        scaledUnit={scaledUnit}
        onScaledUnitChange={handleScaledUnitChange}
        scaledValue={scaledValue}
        onScaledValueChange={setScaledValue}
        actualFeet={actualFeet}
        actualInches={actualInches}
        onActualFeetChange={setActualFeet}
        onActualInchesChange={setActualInches}
        actualUnit={actualUnit}
        onActualUnitChange={handleActualUnitChange}
        actualValue={actualValue}
        onActualValueChange={setActualValue}
        isGeneric={target.generic}
        sizeIn={genericSizeIn}
        onSizeChange={setGenericSizeIn}
        color={color}
        onColorChange={setColor}
        onOpenCalibration={() => setCalibrationOpen(true)}
        onResetCalibration={handleClearCalibration}
        calibrated={calibration.calibrated}
      />
      <TargetDisplay
        target={target}
        color={color}
        displayWidthIn={displayWidthIn}
        displayHeightIn={displayHeightIn}
        widthPx={widthPx}
        heightPx={heightPx}
        ppiX={ppiX}
        ppiY={ppiY}
        calibrated={calibration.calibrated}
      />
      {calibrationOpen && (
        <Calibration
          current={calibration}
          onSave={handleSaveCalibration}
          onClear={handleClearCalibration}
          onClose={() => setCalibrationOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
