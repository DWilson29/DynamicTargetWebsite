// Core math for converting a real-world target size + simulated distance
// into the physical size it must be rendered at on the monitor so that it
// subtends the same visual angle as it would at the simulated distance,
// when viewed by an observer at the actual (real) distance from the screen.

/**
 * Convert a feet + inches pair into a single inches value.
 * @param {number} feet
 * @param {number} inches
 * @returns {number} total inches
 */
export function feetInchesToInches(feet, inches) {
  const f = Number(feet) || 0;
  const i = Number(inches) || 0;
  return f * 12 + i;
}

export const INCHES_PER_UNIT = { yd: 36, m: 39.37007874015748 };

/**
 * Convert a distance entered in the chosen unit into inches.
 * @param {"ftin"|"yd"|"m"} unit
 */
export function distanceToInches(unit, feet, inches, value) {
  if (unit === "ftin") return feetInchesToInches(feet, inches);
  return (Number(value) || 0) * INCHES_PER_UNIT[unit];
}

/**
 * Compute the size (in inches) that a target must be displayed at on the
 * monitor so it presents the same apparent (angular) size as the real
 * target would at the simulated distance, given the observer's actual
 * distance from the screen.
 *
 * Derivation (similar triangles / small-angle approximation):
 *   displaySize / actualDistance = realSize / simulatedDistance
 *   => displaySize = realSize * (actualDistance / simulatedDistance)
 *
 * @param {number} realSizeIn - true physical size of the target, in inches
 * @param {number} simulatedDistanceIn - simulated distance to the target, in inches
 * @param {number} actualDistanceIn - observer's real distance from the monitor, in inches
 * @returns {number} display size, in inches
 */
export function computeDisplaySizeInches(realSizeIn, simulatedDistanceIn, actualDistanceIn) {
  if (!simulatedDistanceIn || simulatedDistanceIn <= 0) return 0;
  return realSizeIn * (actualDistanceIn / simulatedDistanceIn);
}

/**
 * Convert a size in inches to a size in CSS pixels using a given
 * pixels-per-inch (PPI) value.
 * @param {number} sizeIn
 * @param {number} ppi
 * @returns {number} size in pixels
 */
export function inchesToPx(sizeIn, ppi) {
  return sizeIn * ppi;
}
