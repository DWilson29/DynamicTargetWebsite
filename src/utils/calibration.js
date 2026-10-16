// Handles monitor calibration: storing/retrieving the user-measured physical
// screen dimensions and deriving pixels-per-inch (PPI) from them.
//
// By default (no calibration performed) we fall back to the standard CSS
// reference assumption of 96 CSS pixels per inch. This is frequently
// inaccurate on real hardware (especially high-DPI/"Retina" displays), so
// users can calibrate by entering their monitor's true visible width and
// height (in inches). We combine that with the browser-reported screen
// resolution (in CSS pixels) to compute an accurate PPI.

const STORAGE_KEY = "dtw_calibration_v1";
export const DEFAULT_PPI = 96;

/**
 * @returns {{calibrated: boolean, widthIn: number, heightIn: number, ppiX: number, ppiY: number}}
 */
export function getCalibration() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultCalibration();
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.calibrated) return defaultCalibration();
    return parsed;
  } catch (e) {
    return defaultCalibration();
  }
}

function defaultCalibration() {
  return {
    calibrated: false,
    widthIn: null,
    heightIn: null,
    ppiX: DEFAULT_PPI,
    ppiY: DEFAULT_PPI,
  };
}

/**
 * Save a new calibration based on the user-entered physical screen size.
 * Uses window.screen.width/height (CSS pixels) as the screen resolution.
 * @param {number} widthIn - true physical screen width, in inches
 * @param {number} heightIn - true physical screen height, in inches
 */
export function saveCalibration(widthIn, heightIn) {
  const screenWidthPx = window.screen.width;
  const screenHeightPx = window.screen.height;

  const ppiX = widthIn > 0 ? screenWidthPx / widthIn : DEFAULT_PPI;
  const ppiY = heightIn > 0 ? screenHeightPx / heightIn : DEFAULT_PPI;

  const calibration = {
    calibrated: true,
    widthIn,
    heightIn,
    ppiX,
    ppiY,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(calibration));
  return calibration;
}

export function clearCalibration() {
  window.localStorage.removeItem(STORAGE_KEY);
  return defaultCalibration();
}
