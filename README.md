# DynamicTargetWebsite

A website to dynamically display a dry-fire target at scaled ranges.

Given a real-world ("simulated") distance to a target and the observer's
actual distance from the monitor, this app computes and renders the target
at the physical screen size needed so it subtends the same visual angle it
would at the simulated distance — effectively a dry-fire training aid.

## How it works

For a target of true size `H`, simulated at distance `D_sim`, viewed by an
observer `D_actual` away from the screen, the displayed size `h` is:

```
h = H * (D_actual / D_sim)
```

That physical size (in inches) is then converted to on-screen pixels using
the monitor's pixels-per-inch (PPI). By default the app assumes the common
CSS reference of 96 PPI, but you can calibrate it from the sidebar by
measuring your screen's true visible width/height with a ruler — the app
combines that with the browser-reported screen resolution to compute an
accurate PPI, stored in `localStorage`.

## Project structure

```
src/
  components/
    Sidebar/         # Scaled distance, actual distance, target type controls
    TargetDisplay/    # Renders the target at its computed pixel size
    Calibration/      # Monitor calibration dialog
  data/
    targets.js        # Target type definitions (add new targets here)
  utils/
    scaling.js         # Distance/size conversion math
    calibration.js      # PPI calibration storage helpers
  App.js               # Top-level state & layout
```

## Adding a new target type

Add an entry to `src/data/targets.js`:

```js
{
  id: "my-target",
  name: "My Target",
  widthIn: 18,
  heightIn: 24,
}
```

It will automatically appear in the Sidebar's target selector.

## Getting started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

```
npm install
npm run dev    # run the Vite dev server at http://localhost:3000
npm run build  # production build
```
