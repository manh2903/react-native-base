# base-react-native

<!-- Project badge row -->
[![Expo SDK](https://img.shields.io/badge/Expo-%7E54-3AB0FF.svg)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB.svg)](https://reactnative.dev)
[![License](https://img.shields.io/badge/license-private-lightgrey.svg)](#)

<!-- Project icon / screenshot -->
<p align="left">
	<img alt="app-icon" src="assets/icon.png" width="96" height="96" />
	<strong style="font-size: 1.25em; margin-left: 8px">base-react-native</strong>
</p>

A minimal Expo-based React Native starter app used as a base template.

## Summary

This repository contains a small React Native application scaffolded to use Expo. It includes a simple navigation structure, several reusable components (global alerts, loading, toast, webview, bottom sheet), and example screens (Home, Detail, Notification, Profile, Settings).

Key points:
- Expo-managed project (see `package.json` scripts that call `expo start`).
- React Native version: 0.81.x (via Expo SDK ~54).
- Small set of navigation and UI helpers under `src/`.

## Prerequisites

- Node.js (LTS recommended).
- npm or yarn.
- Expo CLI (optional globally): `npm install -g expo-cli` (not required if you use `npx expo`).
- For running on Android/iOS devices/emulators, set up the required native tooling. See Expo docs: https://docs.expo.dev/

## Install

Open PowerShell in the project root and run:

```powershell
# Install dependencies
npm install
# or
# yarn install
```

## Run (development)

This project uses Expo. Use the available npm scripts from `package.json`.

From PowerShell run:

```powershell
# Start Metro + Expo dev tools
npm run start

# Start and open on Android (if emulator/device available)
npm run android

# Start and open on iOS (requires macOS with Xcode / simulator)
npm run ios

# Open in web browser
npm run web
```

You can also run via npx without installing Expo globally:

```powershell
npx expo start
```

## Project structure

Top-level files:

- `App.js`, `index.js` — app entry points.
- `package.json` — scripts and dependencies.
- `babel.config.js`, `app.json` — Expo / Babel config.

Source tree (relevant folders):

- `src/components/` — reusable UI components (CustomButton, GlobalAlert, GlobalLoading, GlobalToast, GlobalBottomSheet, GlobalWebView).
- `src/navigation/` — `AppNavigator.js`, `TabNavigator.js`.
- `src/screens/` — example screens (Home, Detail, Notification, Profile, Settings).
- `src/services/GlobalService.js` — global helper/service utilities.
- `src/utils/` — utility helpers.

## Notes & Troubleshooting

- If you see issues related to native builds or incompatible versions, verify your Expo SDK version in `package.json` (`expo` dependency) and consult the Expo upgrade guide.
- For Metro bundler cache issues, try:

```powershell
npx expo start -c
```

- If you get errors about missing native modules after adding packages, run `npx expo prebuild` (if using EAS/custom dev clients) or follow the package installation steps required by Expo-managed workflow.

## Tests

No automated tests are included by default. Consider adding Jest or React Native Testing Library for unit/component tests.

## Contributing

This is a small starter template. To contribute, open a PR against the `main` branch with clear scope and tests where appropriate.

## License

Project is private (see `package.json` "private": true). Add a license file if you plan to open-source it.

---

If you'd like, I can also:
- add a short CONTRIBUTING.md
- add example environment/env setup notes for Android emulator on Windows
- add a short script to make a dev setup easier (e.g., a PowerShell helper)

Tell me which of those you'd like next.
