// Target type definitions used by the simulator.
// Each target's physical (real-world) size is defined in inches.
// To add a new target, simply append another object to this array —
// the Sidebar's target selector and the display logic pick these up automatically.

export const GENERIC_COLORS = ["black", "red", "green", "blue", "white"];
export const DEFAULT_GENERIC_SIZE_IN = 12;

// generic: true targets have user-adjustable size and color.
// shape: "square" | "circle" | "image" (image targets use `image` from /public).
const targets = [
  {
    id: "square",
    name: "Square",
    shape: "square",
    generic: true,
    widthIn: DEFAULT_GENERIC_SIZE_IN,
    heightIn: DEFAULT_GENERIC_SIZE_IN,
  },
  {
    id: "circle",
    name: "Circle",
    shape: "circle",
    generic: true,
    widthIn: DEFAULT_GENERIC_SIZE_IN,
    heightIn: DEFAULT_GENERIC_SIZE_IN,
  },
  {
    id: "uspsa",
    name: "USPSA",
    shape: "image",
    image: "uspsa.jpg",
    generic: false,
    widthIn: 18,
    heightIn: 30,
  },
];

export default targets;
