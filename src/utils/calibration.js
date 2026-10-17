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

// Zoom level (devicePixelRatio) when the page loaded; the 96 PPI default
// is assumed to hold at that zoom.
const INITIAL_DPR = (typeof window !== "undefined" && window.devicePixelRatio) || 1;

function defaultCalibration() {
  return {
    calibrated: false,
    widthIn: null,
    heightIn: null,
    ppiX: DEFAULT_PPI,
    ppiY: DEFAULT_PPI,
    devicePpiX: DEFAULT_PPI * INITIAL_DPR,
    devicePpiY: DEFAULT_PPI * INITIAL_DPR,
  };
}

/**
 * Return the CSS-pixel PPI for the current browser zoom, so a physical
 * size stays constant when the user zooms in/out.
 */
export function getEffectivePpi(calibration, dpr) {
  const z = dpr || 1;
  const dx = calibration.devicePpiX;
  const dy = calibration.devicePpiY;
  if (!dx || !dy) return { ppiX: calibration.ppiX, ppiY: calibration.ppiY };
  return { ppiX: dx / z, ppiY: dy / z };
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

  // Zoom-independent density: physical device pixels per inch.
  const dpr = window.devicePixelRatio || 1;

  const calibration = {
    calibrated: true,
    widthIn,
    heightIn,
    ppiX,
    ppiY,
    devicePpiX: ppiX * dpr,
    devicePpiY: ppiY * dpr,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(calibration));
  return calibration;
}

export function clearCalibration() {
  window.localStorage.removeItem(STORAGE_KEY);
  return defaultCalibration();
}
