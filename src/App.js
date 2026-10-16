import React, { useMemo, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import TargetDisplay from "./components/TargetDisplay/TargetDisplay";
import Calibration from "./components/Calibration/Calibration";
import targets from "./data/targets";
import {
  feetInchesToInches,
  computeDisplaySizeInches,
  inchesToPx,
} from "./utils/scaling";
import { getCalibration, saveCalibration, clearCalibration } from "./utils/calibration";

function App() {
  const [targetId, setTargetId] = useState(targets[0].id);

  // Simulated (scaled) distance to the target.
  const [scaledFeet, setScaledFeet] = useState(12);
  const [scaledInches, setScaledInches] = useState(0);

  // Observer's actual distance from the monitor.
  const [actualFeet, setActualFeet] = useState(1);
  const [actualInches, setActualInches] = useState(0);

  const [calibration, setCalibration] = useState(getCalibration());
  const [calibrationOpen, setCalibrationOpen] = useState(false);

  const target = useMemo(
    () => targets.find((t) => t.id === targetId) || targets[0],
    [targetId]
  );

  const simulatedDistanceIn = feetInchesToInches(scaledFeet, scaledInches);
  const actualDistanceIn = feetInchesToInches(actualFeet, actualInches);

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

  const widthPx = inchesToPx(displayWidthIn, calibration.ppiX);
  const heightPx = inchesToPx(displayHeightIn, calibration.ppiY);

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
        actualFeet={actualFeet}
        actualInches={actualInches}
        onActualFeetChange={setActualFeet}
        onActualInchesChange={setActualInches}
        onOpenCalibration={() => setCalibrationOpen(true)}
        calibrated={calibration.calibrated}
      />
      <TargetDisplay
        target={target}
        displayWidthIn={displayWidthIn}
        displayHeightIn={displayHeightIn}
        widthPx={widthPx}
        heightPx={heightPx}
        ppiX={calibration.ppiX}
        ppiY={calibration.ppiY}
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
