// Target type definitions used by the simulator.
// Each target's physical (real-world) size is defined in inches.
// To add a new target, simply append another object to this array —
// the Sidebar's target selector and the display logic pick these up automatically.

const targets = [
  {
    id: "square-1ft",
    name: '1 ft x 1 ft Square',
    widthIn: 12,
    heightIn: 12,
  },
  // Example of how to add more targets in the future:
  // {
  //   id: "ipsc-silhouette",
  //   name: "IPSC Silhouette",
  //   widthIn: 18,
  //   heightIn: 30,
  // },
];

export default targets;
